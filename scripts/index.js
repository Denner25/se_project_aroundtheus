let initialCards = [
  {
    title: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    title: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    title: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    title: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector(
  "#profile-edit-close-button"
);
const addCardCloseButton = document.querySelector("#add-card-close-button"); // not yet used
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#edit-profile-form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".card__list");
const addCardButton = document.querySelector("#add-card-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.querySelector("#add-card-form");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
// to get image to preview grab image element itself, not just the preview modal

const previewCaption = previewImageModal.querySelector(
  ".modal__preview-caption"
);
const previewCloseButton = previewImageModal.querySelector(".modal__close");

// Functions

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function getCardEelement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__description-text"); // mind class names
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.title;
    previewCaption.textContent = cardData.title;
    openModal(previewImageModal);
  });

  // listen for click on image element not on card element

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.title;
  cardTitleEl.textContent = cardData.title;
  return cardElement;
}

function renderCard(cardData, listEl) {
  const cardElement = getCardEelement(cardData);
  listEl.prepend(cardElement);
} // new function to be used in the loop

// Event handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const title = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ title, link }, cardListEl);
  closeModal(addCardModal);
}

// Event listeners

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addCardButton.addEventListener("click", () => openModal(addCardModal));

profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));

previewCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
// passed arguments of cardData meaning what and cardListEl meaning where
