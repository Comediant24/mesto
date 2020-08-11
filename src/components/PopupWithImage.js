import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector, data);
    this._image = this._popup.querySelector(data.popupPlaceImage);
    this._title = this._popup.querySelector(data.popupPlaceTitle);
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = `${data.name}. Красивые места России.`;
    this._title.textContent = data.name;
    super.open();
  }
}