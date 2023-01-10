import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '32648236-214cf230cab87b8c686639ba9';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    return axios
      .get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      )
      .then(response => {
        this.page += 1;
        // console.log(response.data);
        return response.data;
      })
      .catch(error => console.log(error));
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
