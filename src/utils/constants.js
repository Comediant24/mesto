export const currentUser = {
  id: '9724bb4fa739b68d54858228',
  token: '868762c3-88e2-4bf0-b9ab-a6e82ee7a617',
  cohortUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/',
};

export const templateCard = '#places-template';
export const cardsContainer = '.places__cards';

export const buttonConfig = {
  editProfile: document.querySelector('.profile__user-edit-button'),
  addPlace: document.querySelector('.profile__add-button'),
  changeAvatar: document.querySelector('.profile__button-avatar'),
  likeEnabled: 'places__button-like_enabled',
};

export const profileInput = {
  nameUser: document.querySelector('.popup__input_type_profile-name'),
  jobUser: document.querySelector('.popup__input_type_profile-status'),
};

export const userConfig = {
  name: '.profile__user-name',
  job: '.profile__user-job',
  avatar: '.profile__avatar',
};

export const userName = document.querySelector(userConfig.name);
export const userJob = document.querySelector(userConfig.job);
export const userAvatar = document.querySelector(userConfig.avatar);

export const popup = {
  editProfile: '.popup_edit-profile',
  loadAvatar: '.popup_avatar-change',
  addPlaces: '.popup_add-places',
  deletePlace: '.popup_delete-place',
  imagePlace: '.popup_image-places',
};

export const propertiesForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const popupConfig = {
  popupOpen: 'popup_opened',
  popupPlaceImage: '.popup__places-image',
  popupPlaceTitle: '.popup__places-title',
  popupCloseButton: '.popup__close-button',
  popupOverlay: '.popup__overlay',
  popupForm: '.popup__form',
  popupFormInput: '.popup__input',
};

export const popupForm = {
  avatarForm: '.popup__form_avatar-change',
  editUserForm: '.popup__form_edit-profile',
  addPlaceForm: '.popup__form_add-places',
};
