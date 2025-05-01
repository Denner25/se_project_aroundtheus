import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import { initialCards, validationSettings } from "../utils/constants.js";
import Modal from "../components/Modal.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";

// Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditForm = document.querySelector("#edit-profile-form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTemplate = document.querySelector(".card__template");
const cardListEl = document.querySelector(".card__list");
const addCardButton = document.querySelector("#add-card-button");
const addCardForm = document.querySelector("#add-card-form");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

// Class Instances

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const profileModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
const addCardModal = new ModalWithForm("#add-card-modal", handleAddCardSubmit);

const imageModal = new ModalWithImage("#preview-image-modal");

profileModal.setEventListeners();
addCardModal.setEventListeners();
imageModal.setEventListeners();

// Functions

function handleImageClick(cardData) {
  imageModal.open({
    link: cardData.link,
    title: cardData.title,
  });
}

function createCard(cardData) {
  const card = new Card(cardData, cardTemplate, handleImageClick);
  return card.getView();
}

function renderCard(cardData, listEl) {
  const cardElement = createCard(cardData);
  listEl.prepend(cardElement);
}

// Event handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileModal.close();
  e.target.reset();
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const title = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ title, link }, cardListEl);
  addCardModal.close();
  e.target.reset();
}

// Event listeners

profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileModal.open();
});

addCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardModal.open();
});

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
