import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector, data);
    this._form = this._popup.querySelector(data.popupForm);
    this._inputList = this._popup.querySelectorAll(data.popupFormInput);
  }

  setFormSubmitHandler(handler) {
    this._handler = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.close();
      this._handler();
    });
  }
}
