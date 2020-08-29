export default class Card {
  constructor(
    data,
    cardSelector, {
      handleCardClick,
      handleDeleteIconClick,
      handleLikeClick
    },
    myId
  ) {
    this._data = data;
    this._name = data.name;
    this._img = data.link;
    this._likeUser = data.likes;
    this._likesCount = data.likes.length;
    this._id = data._id;
    this._myId = myId;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const placesTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector('.places__items')
      .cloneNode(true);
    return placesTemplate;
  }

  deleteCard() {
    this._element.remove();
  }

  likeCard(likeCount) {
    this._likes.textContent = likeCount;
    this._like.classList.toggle('places__button-like_enabled');
  }

  _isLiked() {
    return this._likeUser.find((like) => like._id === this._myId);
  }

  _setEventListeners() {
    this._like.addEventListener('click', () =>
      this._handleLikeClick(this._like)
    );
    if (this._ownerId === this._myId) {
      this._delete.addEventListener('click', () => {
        this._handleDeleteIconClick();
      });
    } else {
      this._delete.remove();
    }
    this._image.addEventListener('click', () =>
      this._handleCardClick(this._data)
    );
  }

  generateCard() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.places__button-like');
    this._likes = this._element.querySelector('.places__like-counter');
    this._delete = this._element.querySelector('.places__button-delete');
    this._element.querySelector('.places__title').textContent = this._name;
    if (!(this._isLiked() === undefined)) {
      this._like.classList.toggle('places__button-like_enabled');
    }
    this._image = this._element.querySelector('.places__image');
    this._image.src = this._img;
    this._image.alt = `Лучшая фотография ${this._name}`
    this._likes.textContent = this._likesCount;
    this._setEventListeners();
    return this._element;
  }
}