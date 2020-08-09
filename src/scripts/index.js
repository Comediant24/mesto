import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from './initialCards.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const editProfileButton = document.querySelector('.profile__user-edit-button');

const nameProfileUser = document.querySelector('.profile__user-name');
const jobProfileUser = document.querySelector('.profile__user-job');
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
const setImageListener = (cardItem) => {
  document.querySelector('.places__image').addEventListener('click', () => {
    const popupImage = new PopupWithImage('.popup_image-places');
    popupImage.open(cardItem.name, cardItem.link);
  });
};

// Функция создания новой карточки
const cardSection = (items) => {
  const card = new Section({
      items: items,
      renderer: (cardItem) => {
        const placeCard = new Card(cardItem, '#places-template');
        const placeItem = placeCard.generateCard();
        card.addItem(placeItem);
        setImageListener(cardItem);
      },
    },
    '.places__cards'
  );
  return card;
};

// Инициализация стартовых карточек массива через классы Card и Section
const initialItemCard = cardSection(initialCards);
initialItemCard.renderItems();

// Слушатели событий popup для user
editProfileButton.addEventListener('click', () => {
  const popupUserInfoEdit = new PopupWithForm('.popup_edit-profile', (formData) => {
    nameProfileUser.textContent = formData['user-name'];
    jobProfileUser.textContent = formData['user-job'];
  });

  popupProfileNameInput.value = nameProfileUser.textContent;
  popupProfileJobInput.value = jobProfileUser.textContent;

  popupUserInfoEdit.open();
  const popupProfileFormValidate = new FormValidator(
    '.popup__form',
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
  const popupProfileFormValidate = new FormValidator(
    '.popup__form',
    propertiesForm
  );
  popupProfileFormValidate.enableValidation();
  popupProfileFormValidate.resetForm();
})