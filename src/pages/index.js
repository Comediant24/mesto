import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  editProfileButton,
  popupProfileNameInput,
  popupProfileJobInput,
  addPlacesButton,
  propertiesForm,
  popupConfig,
} from '../utils/constants.js';
import './index.css';

// Установка имени юзера с сервера
fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me', {
    headers: {
      authorization: '868762c3-88e2-4bf0-b9ab-a6e82ee7a617'
    }
  })
  .then(res => res.json())
  .then(data => {
    document.querySelector('.profile__user-name').textContent = data.name;
    document.querySelector('.profile__user-job').textContent = data.about;
    document.querySelector('.profile__avatar').src = data.avatar;
  });

// функция слушателя картинки для карт
const popupImage = new PopupWithImage('.popup_image-places', popupConfig);
popupImage.setEventListeners();

const handleCardClick = (data) => {
  popupImage.open(data);
};

// Функция создания новой карточки
const createCard = (cardItem) => {
  const placeCard = new Card(cardItem, '#places-template', handleCardClick);
  return placeCard.generateCard();
};

// Создание списка карточек
const cardsSection = new Section({
    renderer: (cardItem) => {
      const placeCard = createCard(cardItem);
      cardsSection.addItem(placeCard);
    },
  },
  '.places__cards'
);

// Инициализация карт с сервера
fetch('https://mesto.nomoreparties.co/v1/cohort-14/cards', {
    headers: {
      authorization: '868762c3-88e2-4bf0-b9ab-a6e82ee7a617'
    }
  })
  .then(res => res.json())
  .then(data => {
    cardsSection.renderItems(data);
  });

// Создание информации о пользователи
const userInfo = new UserInfo({
  userName: '.profile__user-name',
  userJob: '.profile__user-job',
});

// Создание попапа для user
const popupUserInfoEdit = new PopupWithForm(
  '.popup_edit-profile',
  popupConfig,
  (formData) => {
    userInfo.setUserInfo(formData);
    popupUserInfoEdit.close()
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
const popupPlaceAdd = new PopupWithForm(
  '.popup_add-places',
  popupConfig,
  (formData) => {
    const newPlace = createCard({
      name: formData['places-name'],
      link: formData['places-image'],
    });
    cardsSection.addItem(newPlace);
    popupPlaceAdd.close()
  }
);
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