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
      this._handleSubmit();
      this.close();
    });
  }

  close() {
    super.close();
    this._submitButton.removeEventListener("click", this._handleSubmit);
  }
}

export default ModalWithConfirmation;
