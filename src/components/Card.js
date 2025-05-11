export default class Card {
  constructor(
    { name, link, _id, handleDeleteClick, isLiked, handleLikeCard },
    cardSelector,
    handleImageClick,
    api // Accept the api instance
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeCard = handleLikeCard;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._api = api; // Store the api instance
    this._isLiked = isLiked;
  }

  // getId() {
  //   return this._id;
  // }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._cardElement, this._id);
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeIcon() {
    this._handleLikeCard(this._id, this._isLiked)
      .then(() => {
        this._isLiked = !this._isLiked; // Toggle the like state
        this._likeButton.classList.toggle("card__like-button_active");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _getTemplate() {
    return this._cardSelector.content
      .querySelector(".card__list-item")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardNameEl = this._cardElement.querySelector(
      ".card__description-text"
    );
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardNameEl.textContent = this._name;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }
    this._setEventListeners();
    return this._cardElement;
  }
}
