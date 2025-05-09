export default class Card {
  constructor({ id, title, link }, cardSelector, handleImageClick, api) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._id = id;
    this._api = api;
  }

  getId() {
    return this._id;
  }

  getApi() {
    return this._api;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ title: this._title, link: this._link });
    });
  }

  // _handleLikeIcon() {
  //   this._likeButton.classList.toggle("card__like-button_active");
  // }

  // _handleDeleteCard() {
  //   this._cardElement.remove();
  // }

  _handleDeleteCard() {
    this._api
      .deleteCard(this._id) // <-- Here you need the ID!
      .then(() => {
        this._cardElement.remove();
      })
      .catch((err) => console.error(err));
  }

  _handleLikeIcon() {
    this._api
      .likeCard(this._id) // <-- Here you need the ID again!
      .then(() => {
        this._likeButton.classList.toggle("card__like-button_active");
      })
      .catch((err) => console.error(err));
  }

  _getTemplate() {
    return this._cardSelector.content
      .querySelector(".card__list-item")
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
