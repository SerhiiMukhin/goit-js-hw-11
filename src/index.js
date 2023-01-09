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
    if (data.hits.length === 0 || pixabayApiService.query === '' ) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    } else {
      clearContainer()
      data.hits.forEach(element => renderMarkup(element))}
    })
  }

function loadMore() {
  pixabayApiService.fetchImages().then(data => data.hits.forEach(element => renderMarkup(element)))
}

function renderMarkup(element) {
const markup = `<a href='${element.largeImageURL}' class='wrapper' target='_blank' rel='noopener noreferrer'>
<div class='photo-card'>
  <img src='${element.webformatURL}' alt='${element.tags}' loading='lazy' />
  <div class='info'>
    <p class='info-item'>
      <b>Likes: ${element.likes}</b>
    </p>
    <p class='info-item'>
      <b>Views: ${element.views}</b>
    </p>
    <p class='info-item'>
      <b>Comments: ${element.comments}</b>
    </p>
    <p class='info-item'>
      <b>Downloads: ${element.downloads}</b>
    </p>
  </div>
</div>
</a>
`
  refs.container.insertAdjacentHTML('beforeend', markup)
}

function clearContainer() {
  refs.container.innerHTML = '';
}