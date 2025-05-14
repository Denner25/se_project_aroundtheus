import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import { validationSettings } from "../utils/constants.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithConfirmation from "../components/ModalWithConfirmation.js";
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
const avatarButton = document.querySelector("#avatar-update-button");
const avatarForm = document.querySelector("#avatar-form");
const profileAvatar = document.querySelector(".profile__picture");

// Class Instances

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);
const avatarFormValidator = new FormValidator(validationSettings, avatarForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const profileModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
const addCardModal = new ModalWithForm("#add-card-modal", handleAddCardSubmit);

const imageModal = new ModalWithImage("#preview-image-modal");

const avatarModal = new ModalWithForm("#avatar-modal", handleAvatarSubmit);

const confirmationModal = new ModalWithConfirmation(
  "#confirmation-modal",
  handleCardDelete
);

profileModal.setEventListeners();
addCardModal.setEventListeners();
imageModal.setEventListeners();
confirmationModal.setEventListeners();
avatarModal.setEventListeners();

const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

const section = new Section({ items: [], renderer: renderCard }, cardListEl);
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "68ee5cc1-9a6e-42ad-87e2-f7856d8c88ba",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

// Functions

function handleImageClick(cardData) {
  imageModal.open({
    link: cardData.link,
    name: cardData.name,
    id: cardData.id,
  });
}

function createCard(cardData) {
  const card = new Card(
    {
      ...cardData,
      handleDeleteClick: handleCardDelete,
      handleLikeCard: handleLikeCard,
    },
    cardTemplate,
    handleImageClick,
    api,
    confirmationModal
  );
  return card.getView();
}

function renderCard(cardData, listEl) {
  const cardElement = createCard(cardData);
  listEl.prepend(cardElement);
}

function handleCardDelete(cardElement, cardId) {
  api
    .deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => console.error(err));
}

function handleLikeCard(cardId, isLiked) {
  if (isLiked) {
    return api.unlikeCard(cardId);
  } else {
    return api.likeCard(cardId);
  }
}

// Event handlers

function handleProfileEditSubmit(inputValues) {
  const { name, about } = inputValues;
  api
    .updateProfile({ name, about }) // description?
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      profileModal.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

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

function handleAvatarSubmit(inputValues) {
  const { avatar } = inputValues;
  api
    .updateAvatar({ avatar })
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      avatarModal.close();
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

avatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarModal.open();
});

// section.renderItems();
// loadInitialCards();
