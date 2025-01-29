// enabling validation by calling enableValidation()
// pass all the settings on call

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  // object destructuring

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {});
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  // used Array.from method to turn formEls into an
  // array as map method does not work on nodeList.
  // switched to spread operator for efficiency

  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
    // look for all inputs inside of form
    // loop through inputs to see if all are valid
    // if input is not valid
    // get validation message
    // add error class to input
    // display error message
    // disable button
    // if inputs valid
    // enable button
    // hide error
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
// turned object that was inside enableValidation
// function (which does not yet exist) into
// config variable and passed it to function

enableValidation(config);
