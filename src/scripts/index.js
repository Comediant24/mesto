import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js';
import initialCards from './initialCards.js';
import {
  popupClose
} from './utils.js';
import PopupWithImage from '../components/PopupWithImage.js';

const popupProfile = document.querySelector('.popup_edit-profile');
const editProfileButton = document.querySelector('.profile__user-edit-button');

const nameProfileUser = document.querySelector('.profile__user-name');
const jobProfileUser = document.querySelector('.profile__user-job');
const popupProfileForm = document.querySelector('.popup__form_edit-profile');
const popupProfileNameInput = document.querySelector(
  '.popup__input_type_profile-name'
);
const popupProfileJobInput = document.querySelector(
  '.popup__input_type_profile-status'
);

const popupPlaces = document.querySelector('.popup_add-places');
const addPlacesButton = document.querySelector('.profile__add-button');
const popupPlacesForm = document.querySelector('.popup__form_add-places');
const popupPlacesNameInput = document.querySelector(
  '.popup__input_type_places-name'
);
const popupPlacesImageInput = document.querySelector(
  '.popup__input_type_place-image'
);

// const placesCardList = document.querySelector('.places__cards');
const propertiesForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Функция для отправки введенной информации profile
const formSubmitHandlerProfile = (evt) => {
  evt.preventDefault();
  nameProfileUser.textContent = popupProfileNameInput.value;
  jobProfileUser.textContent = popupProfileJobInput.value;
  popupClose(popupProfile);
};

const popupProfileFormValidate = new FormValidator(
  '.popup__form_edit-profile',
  propertiesForm
);
popupProfileFormValidate.enableValidation();

const popupPlaceFormValidate = new FormValidator(
  '.popup__form_add-places',
  propertiesForm
);
popupPlaceFormValidate.enableValidation();

// Слушатель картинки для карт
const setImageListener = (cardItem) => {
  document.querySelector('.places__image').addEventListener('click', () => {
    const popupImage = new PopupWithImage('.popup_image-places');
    popupImage.setEventListeners();
    popupImage.open(cardItem.name, cardItem.link);
  });
}

// Функция создания новой карточки
const cardSection = (items) => {
  const card = new Section({
    items: items,
    renderer: (cardItem) => {
      const placeCard = new Card(cardItem, '#places-template');
      const placeItem = placeCard.generateCard();
      card.addItem(placeItem);
      setImageListener(cardItem);
    }
  }, '.places__cards');
  return card;
}

// Функция для отправки введенной информации places и создания новой карточки
const formSubmitHandlerPlaces = (evt) => {
  evt.preventDefault();
  const newPlace = cardSection([{
    name: popupPlacesNameInput.value,
    link: popupPlacesImageInput.value
  }]);
  popupPlacesForm.reset();
  newPlace.renderItems();
  popupClose(popupPlaces);
};

// Инициализация стартовых карточек массива через классы Card и Section
const initialItemCard = cardSection(initialCards)
initialItemCard.renderItems();

// Слушатели событий popup для user
const popupUser = new Popup('.popup_edit-profile')
editProfileButton.addEventListener('click', () => {
  popupProfileNameInput.value = nameProfileUser.textContent;
  popupProfileJobInput.value = jobProfileUser.textContent;
  popupProfileFormValidate.resetForm();
  popupUser.open();
});
popupUser.setEventListeners();
popupProfileForm.addEventListener('submit', formSubmitHandlerProfile);

// Слушатели событий popup для places
const popupPlacesTemp = new Popup('.popup_add-places');
addPlacesButton.addEventListener('click', () => {
  popupPlacesForm.reset();
  popupPlaceFormValidate.resetForm();
  popupPlacesTemp.open();
});
popupPlacesTemp.setEventListeners();
popupPlacesForm.addEventListener('submit', formSubmitHandlerPlaces);