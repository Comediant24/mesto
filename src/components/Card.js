export default class Card {

  constructor(data, cardSelector, handleCardClick, myId) {
    this._data = data;
    this._name = data.name;
    this._img = data.link;
    this._likesCount = data.likes.length;
    this._myId = myId;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    this._element.querySelector('.places__button-like').addEventListener('click', this._likePlaceItem);
    if (this._ownerId === this._myId) {
      this._delete.addEventListener('click', this._deletePlaceItem);
    } else {
      this._delete.remove();
    }
    this._image.addEventListener('click', () => this._handleCardClick(this._data));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._delete = this._element.querySelector('.places__button-delete');
    this._image = this._element.querySelector('.places__image');
    this._element.querySelector('.places__title').textContent = this._name;
    this._image.src = this._img;
    this._element.querySelector('.places__like-counter').textContent = this._likesCount;
    this._setEventListeners();
    return this._element;
  }
}