import Modal from "./Modal.js";

class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
  }

  open({ link, name }) {
    this._modalElement.querySelector(".modal__preview-caption").textContent =
      name;
    const image = this._modalElement.querySelector(".modal__preview-image");
    image.src = link;
    image.alt = `${name}`;
    super.open();
  }
}

export default ModalWithImage;
