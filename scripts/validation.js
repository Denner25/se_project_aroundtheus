// enabling validation by calling enableValidation()
// pass all the settings on call

const toggleInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  const isValid = inputEl.validity.valid;

  inputEl.classList.toggle(inputErrorClass, !isValid);
  errorMessageEl.classList.toggle(errorClass, !isValid);

  errorMessageEl.textContent = !isValid ? inputEl.validationMessage : "";
};

const hasInvalidInput = (inputEls) => {
  return !inputEls.every((inputEl) => inputEl.validity.valid);
};

const toggleButtonState = (inputEls, submitButton, { inactiveButtonClass }) => {
  const isValid = hasInvalidInput(inputEls);
  submitButton.classList.toggle(inactiveButtonClass, isValid);
  submitButton.disabled = isValid;
};

const setEventListeners = (
  formEl,
  {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }
) => {
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  const submitButton = formEl.querySelector(submitButtonSelector);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      toggleInputError(formEl, inputEl, { inputErrorClass, errorClass });
      toggleButtonState(inputEls, submitButton, { inactiveButtonClass });
    });
  });
};

const enableValidation = (options) => {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
