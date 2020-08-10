import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupTitle) {
    super(popupSelector);
    this._image = this._popup.querySelector(popupImage);
    this._title = this._popup.querySelector(popupTitle);
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = `${data.name}. Красивые места России.`;
    this._title.textContent = data.name;
    super.open();
  }
}