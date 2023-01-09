import debounce from 'lodash.debounce';

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
  pixabayApiService.fetchImages().then(data => console.log(data.hits));
}

function loadMore(event) {
  pixabayApiService.fetchImages().then(data => console.log(data.hits));
}
