export default class Popup {
  constructor(popupSelector, data) {
    this._popup = document.querySelector(popupSelector);
    this._popupOpen = data.popupOpen;
    this._closeButton = this._popup.querySelector(data.popupCloseButton);
    this._overlay = this._popup.querySelector(data.popupOverlay);
  }

  open() {
    this._popup.classList.add(this._popupOpen);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._popupOpen);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (
      evt.key === 'Escape' &&
      this._popup.classList.contains(this._popupOpen)
    ) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
    this._overlay.addEventListener('click', () => this.close());
  }
}
