import { API_KEY } from './api-key';

function onSearch(searchWord, page) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  return fetch(url).then(r => r.json());
}

export { onSearch };
