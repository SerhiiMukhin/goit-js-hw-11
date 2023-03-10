import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '32648236-214cf230cab87b8c686639ba9';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    try {
      if (this.searchQuery !== '') {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${
            this.page
          }&per_page=40`
        );
        this.page += 1;
        return response.data;
      }
    } catch (error) {
      return console.log(error);
    }
  }

  resetPageCount() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
