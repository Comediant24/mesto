import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    this._popup.querySelector('.popup__places-image').src = link;
    this._popup.querySelector('.popup__places-image').alt = `${name}. Красивые места России.`;
    this._popup.querySelector('.popup__places-title').textContent = name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}