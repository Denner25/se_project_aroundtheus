import Modal from "./Modal";

class ModalWithConfirmation extends Modal {
  constructor(modalSelector, handleSubmit) {
    super({ modalSelector });
    this._handleSubmit = handleSubmit;
    this._submitButton = this._modalElement.querySelector(".modal__submit");
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._handleSubmit(this._cardElement, this._cardId);
      this.close();
    });
  }

  open(cardElement, cardId) {
    this._cardElement = cardElement;
    this._cardId = cardId;
    super.open();
  }

  close() {
    super.close();
  }
}

export default ModalWithConfirmation;
