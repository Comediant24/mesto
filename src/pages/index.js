import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../utils/initialCards.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  editProfileButton,
  popupProfileNameInput,
  popupProfileJobInput,
  addPlacesButton,
  propertiesForm,
} from '../utils/constants.js';
import './index.css';

// функция слушателя картинки для карт
const popupImage = new PopupWithImage('.popup_image-places', '.popup__places-image', '.popup__places-title');

const handleCardClick = (data) => {
  popupImage.open(data);
  popupImage.setEventListeners();
};

// Функция создания новой карточки
const cardSection = (items) => {
  const card = new Section({
      items: items,
      renderer: (cardItem) => {
        const placeCard = new Card(
          cardItem,
          '#places-template',
          handleCardClick
        );
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

// Создание информации о пользователи
const userInfo = new UserInfo({
  userName: '.profile__user-name',
  userJob: '.profile__user-job',
});

// Создание попапа для user
const popupUserInfoEdit = new PopupWithForm(
  '.popup_edit-profile',
  (formData) => {
    userInfo.setUserInfo(formData);
  }
);
popupUserInfoEdit.setEventListeners();

// Форма валидации popup для user
const popupProfileFormValidate = new FormValidator(
  '.popup__form_edit-profile',
  propertiesForm
);
popupProfileFormValidate.enableValidation();

// Слушатели событий popup для user
editProfileButton.addEventListener('click', () => {
  const userGetInfo = userInfo.getUserInfo();
  popupProfileNameInput.value = userGetInfo.name;
  popupProfileJobInput.value = userGetInfo.job;
  popupUserInfoEdit.open();
  popupProfileFormValidate.resetForm();
});

// Создание попапа для places
const popupPlaceAdd = new PopupWithForm('.popup_add-places', (formData) => {
  const newPlace = cardSection([{
    name: formData['places-name'],
    link: formData['places-image'],
  }, ]);
  newPlace.renderItems();
});
popupPlaceAdd.setEventListeners();

// Форма валидации popup для places
const popupPlaceFormValidate = new FormValidator(
  '.popup__form_add-places',
  propertiesForm
);
popupPlaceFormValidate.enableValidation();

// Слушатели событий popup для places
addPlacesButton.addEventListener('click', () => {
  popupPlaceAdd.open();
  popupPlaceFormValidate.resetForm();
});