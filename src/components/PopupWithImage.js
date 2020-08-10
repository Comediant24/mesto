import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    this._popup.querySelector('.popup__places-image').src = data.link;
    this._popup.querySelector('.popup__places-image').alt = `${data.name}. Красивые места России.`;
    this._popup.querySelector('.popup__places-title').textContent = data.name;
    super.open();
  }
}