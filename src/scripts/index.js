import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from './initialCards.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const editProfileButton = document.querySelector('.profile__user-edit-button');

const popupProfileNameInput = document.querySelector(
  '.popup__input_type_profile-name'
);
const popupProfileJobInput = document.querySelector(
  '.popup__input_type_profile-status'
);
const addPlacesButton = document.querySelector('.profile__add-button');

// const placesCardList = document.querySelector('.places__cards');
const propertiesForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Слушатель картинки для карт
const handleCardClick = (name, img) => {
  const popupImage = new PopupWithImage('.popup_image-places');
  popupImage.open(name, img);
};

// Функция создания новой карточки
const cardSection = (items) => {
  const card = new Section({
      items: items,
      renderer: (cardItem) => {
        const placeCard = new Card(cardItem, '#places-template', handleCardClick);
        const placeItem = placeCard.generateCard();
        card.addItem(placeItem);
      },
    },
    '.places__cards'
  );
  return card;
};

// Инициализация стартовых карточек массива через классы Card и Section
const initialItemCard = cardSection(initialCards);
initialItemCard.renderItems();

const userInfo = new UserInfo({
  userName: '.profile__user-name',
  userJob: '.profile__user-job'
});

// Слушатели событий popup для user
editProfileButton.addEventListener('click', () => {

  const popupUserInfoEdit = new PopupWithForm('.popup_edit-profile', (formData) => {
    userInfo.setUserInfo(formData['user-name'], formData['user-job']);

    // nameProfileUser.textContent = formData['user-name'];
    // jobProfileUser.textContent = formData['user-job'];
  });
  const userGetInfo = userInfo.getUserInfo();
  popupProfileNameInput.value = userGetInfo.name;
  popupProfileJobInput.value = userGetInfo.job;
  popupUserInfoEdit.open();
  const popupProfileFormValidate = new FormValidator(
    '.popup__form_edit-profile',
    propertiesForm
  );
  popupProfileFormValidate.enableValidation();
  popupProfileFormValidate.resetForm();
})

// Слушатели событий popup для places
addPlacesButton.addEventListener('click', () => {
  const popupPlaceAdd = new PopupWithForm('.popup_add-places', (formData) => {
    const newPlace = cardSection([{
      name: formData['places-name'],
      link: formData['places-image'],
    }, ]);
    newPlace.renderItems();
  });

  popupPlaceAdd.open();

  const popupPlaceFormValidate = new FormValidator(
    '.popup__form_add-places',
    propertiesForm
  );
  popupPlaceFormValidate.enableValidation();
  popupPlaceFormValidate.resetForm();
})