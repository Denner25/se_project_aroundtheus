export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formEl;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputEls = this._form.querySelectorAll(this._inputSelector);
  }

  _toggleInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    const isValid = inputEl.validity.valid;

    inputEl.classList.toggle(this._inputErrorClass, !isValid);
    errorMessageEl.classList.toggle(this._errorClass, !isValid);

    errorMessageEl.textContent = !isValid ? inputEl.validationMessage : "";
  }

  _hasInvalidInput(inputEls) {
    return !inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState(inputEls, submitButton) {
    const isValid = this._hasInvalidInput(inputEls);
    submitButton.classList.toggle(this._inactiveButtonClass, isValid);
    submitButton.disabled = isValid;
  }

  _setEventListeners() {
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._toggleInputError(inputEl);
        this._toggleButtonState([...this._inputEls], this._submitButton);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputEls.forEach((inputEl) => {
      this._toggleInputError(inputEl, ""); // Clear error messages
    });

    this._toggleButtonState([...this._inputEls], this._submitButton); // Reset button state
  }
}
