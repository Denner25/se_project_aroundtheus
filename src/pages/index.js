import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import { initialCards, validationSettings } from "../utils/constants.js";
import Modal from "../components/Modal.js";
import ModalWithImage from "../components/ModalWithImage.js";

// Elements

const profileEditButton = document.querySelector("#profile-edit-button");
// const profileEditModal = document.querySelector("#profile-edit-modal");
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
// const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.querySelector("#add-card-form");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
// const previewImageModal = document.querySelector("#preview-image-modal");
// const previewImage = previewImageModal.querySelector(".modal__preview-image");
// const previewCaption = previewImageModal.querySelector(
//   ".modal__preview-caption"
// );
// const closeButtons = document.querySelectorAll(".modal__close");
// const editFormElement = profileEditModal.querySelector(".modal__form");
// const addFormElement = addCardModal.querySelector(".modal__form");
// const modalSelector = document.querySelectorAll(".modal");

// Class Instances

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const profileModal = new Modal({
  modalSelector: "#profile-edit-modal",
});
const addCardModal = new Modal({ modalSelector: "#add-card-modal" });

const imageModal = new ModalWithImage("#preview-image-modal");

profileModal.setEventListeners();
addCardModal.setEventListeners();
imageModal.setEventListeners();

// Functions

// function handleImageClick(cardData) {
//   previewImage.src = cardData.link;
//   previewImage.alt = cardData.title;
//   previewCaption.textContent = cardData.title;
//   openModal(previewImageModal);
// }

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

// function closeModalOnEsc(evt) {
//   if (evt.key === "Escape") {
//     const modal = document.querySelector(".modal_opened");
//     closeModal(modal);
//   }
// }

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeModalOnEsc);
//   modal.removeEventListener("click", closeModalOnOverlay);
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", closeModalOnEsc);
//   modal.addEventListener("click", closeModalOnOverlay);
// }

// function closeModalOnOverlay(evt) {
//   if (evt.target.classList.contains("modal")) {
//     closeModal(evt.target);
//   }
// }

// Event handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  // closeModal(profileEditModal);
  profileModal.close();
  e.target.reset();
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const title = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ title, link }, cardListEl);
  // closeModal(addCardModal);
  addCardModal.close();
  e.target.reset();
}

// Event listeners

profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  //openModal(profileEditModal);
  profileModal.open();
});

addCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  // openModal(addCardModal);
  addCardModal.open();
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddCardSubmit);

// closeButtons.forEach((button) => {
//   const modal = button.closest(".modal");
//   // button "any",  modal "any"

//   button.addEventListener("click", () => closeModal(modal));
// });
// replaced repeated close button evenet listeners with single looped one

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
