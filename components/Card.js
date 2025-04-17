export default class Card {
  constructor({ title, link }, cardSelector, handleImageClick) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //".card__like-button"
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    //".card__delete-button"
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
    // preview image
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ title: this._title, link: this._link });
    });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__list-item")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(
      ".card__description-text"
    );
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._title;
    this._cardTitleEl.textContent = this._title;
    this._setEventListeners();
    return this._cardElement;
  }
}
