export const editProfileButton = document.querySelector('.profile__user-edit-button');

export const popupProfileNameInput = document.querySelector(
  '.popup__input_type_profile-name'
);
export const popupProfileJobInput = document.querySelector(
  '.popup__input_type_profile-status'
);
export const addPlacesButton = document.querySelector('.profile__add-button');

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
  popupFormInput: '.popup__input'
}