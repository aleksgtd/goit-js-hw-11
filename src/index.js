import './css/styles.css';
import Notiflix from 'notiflix';

import { onSearch } from './search';

const refs = {
  form: document.querySelector('form#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('button.load-more'),
};

onPageLoad();

function onPageLoad() {
  refs.loadMoreBtn.classList.add('hidden');
}

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmit(e) {
  refs.gallery.innerHTML = '';
  e.preventDefault();
  const word = e.currentTarget.elements.searchQuery.value;
  e.currentTarget.reset();
  sessionStorage.setItem('page', '1');

  onSearch(word, 1)
    .then(el => {
      onMarkupMake(el);
      sessionStorage.setItem('page', `${Number(sessionStorage.getItem('page')) + 1}`);
    })
    .catch(console.log);
}

function onMarkupMake(obj) {
  refs.loadMoreBtn.classList.remove('hidden');
  refs.loadMoreBtn.classList.add('for-display');
  if (!obj.hits.length) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  }

  if (!refs.gallery.innerHTML) {
    refs.gallery.innerHTML = '<ul class="list"></ul>';
  }

  const ul = document.querySelector('ul.list');

  obj.hits.forEach(el => {
    ul.insertAdjacentHTML('beforeend', onCardMarkupMade(el));
  });

  const pageLimit = parseInt(obj.totalHits / 40) + 1;
  if (Number(sessionStorage.getItem('page')) === pageLimit) {
    onStopMarkup();
  }
}

function onCardMarkupMade(el) {
  return `<li class="gallery-item">
  <div class="photo-card">
    <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${el.likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${el.views}
      </p>
      <p class="info-item">
        <b>Comments</b> ${el.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> ${el.downloads}
      </p>
    </div>
  </div>
</li>`;
}

function onLoadMore(e) {
  onSearch(refs.form.elements.searchQuery.value, Number(sessionStorage.getItem('page')))
    .then(el => {
      onMarkupMake(el);
      sessionStorage.setItem('page', `${Number(sessionStorage.getItem('page')) + 1}`);
    })
    .catch(console.log);
}

function onStopMarkup() {
  refs.loadMoreBtn.classList.add('hidden');
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}
