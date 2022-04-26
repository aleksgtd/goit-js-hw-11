import { refs } from '../index';

function onBtnHide() {
  refs.loadMoreBtn.classList.add('hidden');
  refs.loadMoreBtn.classList.remove('for-display');
}

export { onBtnHide };
