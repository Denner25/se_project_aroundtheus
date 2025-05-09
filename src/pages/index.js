import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import { initialCards, validationSettings } from "../utils/constants.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

// Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditForm = document.querySelector("#edit-profile-form");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTemplate = document.querySelector("#card-template");
const cardListEl = document.querySelector(".card__list");
const addCardButton = document.querySelector("#add-card-button");
const addCardForm = document.querySelector("#add-card-form");

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

const userInfo = new UserInfo(profileName, profileDescription);

const section = new Section(
  { items: initialCards, renderer: renderCard },
  cardListEl
);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "68ee5cc1-9a6e-42ad-87e2-f7856d8c88ba",
    "Content-Type": "application/json",
  },
});

// Functions

function loadInitialCards() {
  api
    .getInitialCards()
    .then((cards) => {
      section.renderItems(cards);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleImageClick(cardData) {
  imageModal.open({
    link: cardData.link,
    name: cardData.name,
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

// function handleProfileEditSubmit(inputValues) {
//   const { title, description } = inputValues;
//   userInfo.setUserInfo(title, description);
//   profileModal.close();
// }

function handleProfileEditSubmit(inputValues) {
  const { name, description } = inputValues;
  api
    .updateProfile({ name: name, about: description })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      profileModal.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

// function handleAddCardSubmit(inputValues) {
//   const { title, link } = inputValues;
//   section.addItem({ title, link });
//   addCardModal.close();
// }

function handleAddCardSubmit(inputValues) {
  const { name, link } = inputValues;
  api
    .addItem({ name, link })
    .then((res) => {
      section.addItem(res);
      addCardModal.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

// Event listeners

profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const { profileName, profileDescription } = userInfo.getUserInfo();
  profileNameInput.value = profileName;
  profileDescriptionInput.value = profileDescription;
  profileModal.open();
});

addCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardModal.open();
});

// section.renderItems();
loadInitialCards();
