import Modal from "./Modal.js";

class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
  }

  open({ link, title }) {
    this._modalElement.querySelector(".modal__preview-caption").textContent =
      title;
    const image = this._modalElement.querySelector(".modal__preview-image");
    image.src = link;
    image.alt = `${title}`;
    super.open();
  }
}

export default ModalWithImage;
