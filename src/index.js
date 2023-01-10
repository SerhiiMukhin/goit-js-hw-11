import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

import PixabayApiService from './pixabay-api-service';
import pictureTemplate from './templates/template.hbs';

const refs = {
  form: document.querySelector('#search-form'),
  container: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', loadMore);

refs.loadMoreBtn.classList.add('is-hidden');

const pixabayApiService = new PixabayApiService();

function onSubmit(event) {
  event.preventDefault();

  pixabayApiService.query = event.currentTarget.elements.searchQuery.value;

  refs.loadMoreBtn.classList.add('is-hidden');

  pixabayApiService.resetPage();
  pixabayApiService.fetchImages().then(data => {
    if (data.hits.length === 0 || pixabayApiService.query === '') {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      refs.loadMoreBtn.classList.remove('is-hidden');

      clearContainer();
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
      appendImagesMarkup(data);
    }
    if (refs.container.children.length >= data.totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');

      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

function loadMore() {
  pixabayApiService.fetchImages().then(data => {
    appendImagesMarkup(data);
    if (refs.container.children.length >= data.totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

function clearContainer() {
  refs.container.innerHTML = '';
}

function appendImagesMarkup(data) {
  refs.container.insertAdjacentHTML('beforeend', pictureTemplate(data.hits));
  const lightbox = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: 250});
  lightbox.refresh()
}

