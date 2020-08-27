export const myId = '9724bb4fa739b68d54858228';
export const editProfileButton = document.querySelector(
  '.profile__user-edit-button'
);
export const submitAvatarButton = document.querySelector('.popup__button-avatar');
export const submitPlacesButton = document.querySelector('.popup__button-places');
export const submitProfileButton = document.querySelector('.popup__button-profile');

export const popupProfileNameInput = document.querySelector(
  '.popup__input_type_profile-name'
);
export const popupProfileJobInput = document.querySelector(
  '.popup__input_type_profile-status'
);
export const addPlacesButton = document.querySelector('.profile__add-button');
export const changeAvatarButton = document.querySelector(
  '.profile__button-avatar'
);

export const userName = document.querySelector('.profile__user-name');
export const userJob = document.querySelector('.profile__user-job');
export const userAvatar = document.querySelector('.profile__avatar');

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