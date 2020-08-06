import {
  popupImage,
  popupOpen
} from '../scripts/utils.js';

export default class Card {

  constructor(data, cardSelector) {

    this._name = data.name;
    this._img = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const placesTemplate = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.places__items')
      .cloneNode(true);

    return placesTemplate;
  }

  _likePlaceItem(evt) {
    const placesItemLike = evt.target;
    placesItemLike.classList.toggle('places__button-like_enabled');
  }

  _deletePlaceItem(evt) {
    const placesItemDelete = evt.target.closest('.places__items');
    placesItemDelete.remove();
  }

  _renderPopupImage() {
    popupImage.querySelector('.popup__places-image').src = this._img;
    popupImage.querySelector('.popup__places-image').alt = `${this._name}. Красивые места России.`;
    popupImage.querySelector('.popup__places-title').textContent = this._name;
    popupOpen(popupImage);
  }

  _setEventListeners() {
    this._element.querySelector('.places__button-like').addEventListener('click', this._likePlaceItem);
    this._element.querySelector('.places__button-delete').addEventListener('click', this._deletePlaceItem);
    this._element.querySelector('.places__image').addEventListener('click', () => {
      this._renderPopupImage()
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.places__title').textContent = this._name;
    this._element.querySelector('.places__image').src = this._img;

    return this._element;
  }
}