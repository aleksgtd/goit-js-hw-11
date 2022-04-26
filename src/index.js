import './css/styles.css';
import Notiflix from 'notiflix';

import { onSearch } from './js/search';
import { onBtnHide } from './js/on-btn-hide';
import { onMarkupMake } from './js/on-markup-make';

const refs = {
  form: document.querySelector('form#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('button.load-more'),
};

onBtnHide();

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmit(e) {
  e.preventDefault();
  const word = e.currentTarget.elements.searchQuery.value.trim();
  if (!word) {
    Notiflix.Notify.failure('No words in search query field. Please enter something.');
    return;
  }
  onBtnHide();
  refs.gallery.innerHTML = '';

  e.currentTarget.reset();
  sessionStorage.setItem('page', '1');

  onSearch(word, 1)
    .then(el => {
      onMarkupMake(el);
      sessionStorage.setItem('page', `${Number(sessionStorage.getItem('page')) + 1}`);
    })
    .catch(console.log);
}

function onLoadMore(e) {
  onSearch(refs.form.elements.searchQuery.value, Number(sessionStorage.getItem('page')))
    .then(el => {
      onMarkupMake(el);
      sessionStorage.setItem('page', `${Number(sessionStorage.getItem('page')) + 1}`);
    })
    .catch(console.log);
}

export { refs };
