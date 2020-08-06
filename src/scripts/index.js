import Card from '../components/Card.js';
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js';
import initialCards from './initialCards.js';
import {
  popupOpen,
  popupClose
} from './utils.js';

const popupProfile = document.querySelector('.popup_edit-profile');
const editProfileButton = document.querySelector('.profile__user-edit-button');
const popupProfileCloseButton = document.querySelector(
  '.popup__close-button_edit-profile'
);
const popupProfileOverlay = document.querySelector(
  '.popup__overlay_edit-profile'
);
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
const popupPlacesCloseButton = document.querySelector(
  '.popup__close-button__add-places'
);
const popupPlacesOverlay = document.querySelector('.popup__overlay_add-places');
const popupPlacesForm = document.querySelector('.popup__form_add-places');
const popupPlacesNameInput = document.querySelector(
  '.popup__input_type_places-name'
);
const popupPlacesImageInput = document.querySelector(
  '.popup__input_type_place-image'
);

const popupImage = document.querySelector('.popup_image-places');
const popupImageCloseButton = document.querySelector(
  '.popup__close-button_image-places'
);
const popupImageOverlay = document.querySelector(
  '.popup__overlay_image-places'
);

const placesCardList = document.querySelector('.places__cards');

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

// Функция создания карточек
// const createPlace = (title, image) => {
//   const newPlace = {
//     name: title,
//     link: image,
//   };
//   const placeCard = new Card(newPlace, '#places-template');
//   const placeItem = placeCard.generateCard();

//   return placeItem;
// };

// Функция добавления новых карточек в начало
// const renderPlaceItemNew = (item) => {
//   placesCardList.prepend(item);
// };

// Функция для генерации новой карточки
const newCard = (title, image) => {
  const cardList = new Section({
    items: [{
      name: title,
      link: image
    }],
    renderer: (cardItem) => {
      const placeCard = new Card(cardItem, '#places-template');
      const placeItem = placeCard.generateCard();
      cardList.addItem(placeItem);
    }
  }, '.places__cards');
  return cardList;
}

// Функция для отправки введенной информации places и создания новой карточки
const formSubmitHandlerPlaces = (evt) => {
  evt.preventDefault();
  const place = newCard(
    popupPlacesNameInput.value,
    popupPlacesImageInput.value
  );
  popupPlacesForm.reset();
  place.renderItems();
  popupClose(popupPlaces);
};


// инициализация стартовых карточек массива через классы Card и Section
const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const placeCard = new Card(cardItem, '#places-template');
    const placeItem = placeCard.generateCard();
    cardList.addItem(placeItem)
  }
}, '.places__cards');

cardList.renderItems();

// Функция добавления стартовых карточек попорядку
// const renderPlaceItemStart = (item) => {
//   placesCardList.append(item);
// };

// initialCards.forEach((item) => {
//   const placeCard = new Card(item, '#places-template');

//   const placeItem = placeCard.generateCard();
//   renderPlaceItemStart(placeItem);
// });

// Слушатели событий popup для user
editProfileButton.addEventListener('click', () => {
  popupProfileNameInput.value = nameProfileUser.textContent;
  popupProfileJobInput.value = jobProfileUser.textContent;

  popupProfileFormValidate.resetForm();
  popupOpen(popupProfile);
});
popupProfileCloseButton.addEventListener('click', () =>
  popupClose(popupProfile)
);
popupProfileOverlay.addEventListener('click', () => popupClose(popupProfile));
popupProfileForm.addEventListener('submit', formSubmitHandlerProfile);

// Слушатели событий popup для places
addPlacesButton.addEventListener('click', () => {
  popupPlacesForm.reset();

  popupPlaceFormValidate.resetForm();
  popupOpen(popupPlaces);
});
popupPlacesCloseButton.addEventListener('click', () => popupClose(popupPlaces));
popupPlacesOverlay.addEventListener('click', () => popupClose(popupPlaces));
popupPlacesForm.addEventListener('submit', formSubmitHandlerPlaces);

// Слушатели событий popup для popupImage
popupImageOverlay.addEventListener('click', () => popupClose(popupImage));
popupImageCloseButton.addEventListener('click', () => popupClose(popupImage));