// enabling validation by calling enableValidation()
// pass all the settings on call

// function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.add(inputErrorClass);
//   errorMessageEl.textContent = inputEl.validationMessage;
//   errorMessageEl.classList.add(errorClass);
// }

// function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.remove(inputErrorClass);
//   errorMessageEl.textContent = "";
//   errorMessageEl.classList.remove(errorClass);
// }

const toggleInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  const isValid = inputEl.validity.valid;

  inputEl.classList.toggle(inputErrorClass, !isValid);
  errorMessageEl.classList.toggle(errorClass, !isValid);

  errorMessageEl.textContent = !isValid ? inputEl.validationMessage : "";
};

// function checkInputValidity(formEl, inputEl, options) {
//   if (!inputEl.validity.valid) {
//     return showInputError(formEl, inputEl, options);
//   }
//   hideInputError(formEl, inputEl, options);
// }

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

// disableButton

// enableButton

// function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
//   if (hasInvalidInput(inputEls)) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//     return;
//   }
//   submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// }

const toggleButtonState = (inputEls, submitButton, { inactiveButtonClass }) => {
  const isValid = hasInvalidInput(inputEls);
  submitButton.classList.toggle(inactiveButtonClass, isValid);
  submitButton.disabled = isValid;
};

// const toggleButtonState = (
//   inputEls,
//   submitButton,
//   { inactiveButtonClass }
// ) => {};

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

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
