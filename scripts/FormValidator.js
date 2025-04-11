export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formEl;
  }

  showInputError(inputEl, errorMessage) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage; // errorMessage?
    errorMessageEl.classList.add(this._errorClass);
  }

  _hasInvalidInput() {}

  _checkInputValidity() {}

  // toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  //   if (hasInvalidInput(inputEls)) {
  //     submitButton.classList.add(inactiveButtonClass);
  //     submitButton.disabled = true;
  //     return;
  //   }
  //   submitButton.classList.remove(inactiveButtonClass);
  //   submitButton.disabled = false;
  // }

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this._form, inputEl, rest);
        toggleButtonState(inputEls, submitButton, inactiveButtonClass);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  }
}
