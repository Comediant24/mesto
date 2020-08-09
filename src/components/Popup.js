export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._handleEscClose();
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' && this._popup.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button')
      .addEventListener('click', () => {
        this.close();
      });
    this._popup.querySelector('.popup__overlay')
      .addEventListener('click', () => this.close());
  }
}