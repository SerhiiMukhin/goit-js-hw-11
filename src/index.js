import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import PixabayApiService from './pixabay-api-service';
import pictureTemplate from './templates/template.hbs';

const refs = {
  form: document.querySelector('#search-form'),
  container: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', loadMore);

const pixabayApiService = new PixabayApiService();

function onSubmit(event) {
  event.preventDefault();

  pixabayApiService.query = event.currentTarget.elements.searchQuery.value;

  pixabayApiService.resetPage();
  pixabayApiService.fetchImages().then(data => {
    if (data.hits.length === 0 || pixabayApiService.query === '') {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      clearContainer();
      appendImagesMarkup(data);
    }
  });
}

function loadMore() {
  pixabayApiService.fetchImages().then(appendImagesMarkup);
}

function clearContainer() {
  refs.container.innerHTML = '';
}

function appendImagesMarkup(data) {
  refs.container.insertAdjacentHTML('beforeend', pictureTemplate(data.hits));
}
