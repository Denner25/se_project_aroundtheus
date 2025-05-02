export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems(items) {
    this._items.forEach((item) => {
      this._renderer(item, this._container);
    });
  }

  // renderCard(cardData, listEl) {
  //   const cardElement = createCard(cardData);
  //   listEl.prepend(cardElement);
  // }

  addItem(data) {
    // this._container.prepend(element);
    this._renderer(data, this._container);
  }
}
