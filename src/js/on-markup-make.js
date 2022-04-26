import Notiflix from 'notiflix';
import { refs } from '../index';
import { onBtnHide } from './on-btn-hide';

function onMarkupMake(obj) {
  refs.loadMoreBtn.classList.remove('hidden');
  refs.loadMoreBtn.classList.add('for-display');
  if (!obj.hits.length) {
    onBtnHide();
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

function onStopMarkup() {
  onBtnHide();
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}

export { onMarkupMake };
