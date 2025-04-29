class Section {
  constructor({ renderer }, containerSelector) {
    this._renderItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(`.${containerSelector}`);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  // renderCard(cardData, listEl) {
  //   const cardElement = createCard(cardData);
  //   listEl.prepend(cardElement);
  // }

  addItem(element) {}
}
