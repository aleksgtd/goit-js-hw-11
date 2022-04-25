export default class Search {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  onFetchFn() {
    const url = `https://pixabay.com/api/?key=26994975-a2fba7f6b2c37c671f7f959b7&q=${this.word}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    fetch(url)
      .then(r => r.json())
      .then(obj => {
        if (!obj.hits.length) {
          alert('there is nothing');
          return;
        }

        if (!refs.gallery.innerHTML) {
          refs.gallery.innerHTML = '<ul class="list"></ul>';
        }

        const ul = document.querySelector('ul.list');

        obj.hits.forEach(el => {
          ul.insertAdjacentHTML('beforeend', this.onCardMarkupMade(el));
        });

        this.page += 1;
      })
      .catch();
  }

  //   onMarkupMake(obj) {
  //     if (!obj.hits.length) {
  //       alert('there is nothing');
  //       return;
  //     }

  //     if (!refs.gallery.innerHTML) {
  //       refs.gallery.innerHTML = '<ul class="list"></ul>';
  //     }

  //     const ul = document.querySelector('ul.list');

  //     obj.hits.forEach(el => {
  //       ul.insertAdjacentHTML('beforeend', this.onCardMarkupMade(el));
  //     });

  //     this.page += 1;
  //   }

  onCardMarkupMade(el) {
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

  get query() {
    return this.word;
  }

  set word(newWord) {
    this.word = newWord;
  }
}
