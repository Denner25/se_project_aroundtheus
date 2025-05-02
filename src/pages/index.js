import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import { initialCards, validationSettings } from "../utils/constants.js";
// import Modal from "../components/Modal.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

// Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditForm = document.querySelector("#edit-profile-form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTemplate = document.querySelector("#card-template");
const cardListEl = document.querySelector(".card__list");
const addCardButton = document.querySelector("#add-card-button");
const addCardForm = document.querySelector("#add-card-form");
// const cardTitleInput = document.querySelector("#card-title-input");
// const cardUrlInput = document.querySelector("#card-url-input");

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

const userInfo = new UserInfo(profileTitle, profileDescription);

const section = new Section(
  { items: initialCards, renderer: renderCard },
  cardListEl
);

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

function handleProfileEditSubmit(inputValues) {
  const { title, description } = inputValues;
  userInfo.setUserInfo(title, description);
  profileModal.close();
}

function handleAddCardSubmit(inputValues) {
  // const title = cardTitleInput.value;
  // const link = cardUrlInput.value;
  // able to replace title and link values with
  // destructured object because In ModalWithForm.js the _getInputValues() method
  // collects ALL input values from any form into an object, where:
  // The key is the input's name attribute
  // The value is the input's current value
  const { title, link } = inputValues;
  // renderCard({ title, link }, cardListEl);
  section.addItem({ title, link });
  addCardModal.close();
}

// Event listeners

profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const { profileTitle, profileDescription } = userInfo.getUserInfo();
  profileTitleInput.value = profileTitle;
  profileDescriptionInput.value = profileDescription;
  profileModal.open();
});

addCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardModal.open();
});

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
section.renderItems();
