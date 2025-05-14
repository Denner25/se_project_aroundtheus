import Modal from "./Modal.js";

class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._submitButton = this._modalElement.querySelector(".modal__submit");
    this._formModal = this._modalElement.querySelector(".modal__form");
    this._inputs = this._formModal.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._handleSavingModifier = () => {
      this._submitButton.classList.add("modal__submit_saving");
    };
  }

  _getInputValues() {
    const inputs = {};
    this._inputs.forEach((input) => {
      //the brackets are just used to create a new
      //key value pair inside the empty object
      //nothing connected to arrays like i initially thought
      inputs[input.name] = input.value;
    });
    return inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formModal.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = this._getInputValues();
      this._handleFormSubmit(inputs);
      this._handleSavingModifier();
      this.close();
    });
  }

  close() {
    super.close();
    this._formModal.reset();
  }
}

export default ModalWithForm;
