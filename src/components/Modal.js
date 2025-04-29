export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._modalElement.addEventListener("click", this._handleOverlayClose);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._modalElement.removeEventListener("click", this._handleOverlayClose);
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains("modal")) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButtons = this._modalElement.querySelectorAll(".modal__close");
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => this.close());
    });
  }
}
