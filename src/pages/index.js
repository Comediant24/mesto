import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import {
  editProfileButton,
  popupProfileNameInput,
  popupProfileJobInput,
  addPlacesButton,
  propertiesForm,
  popupConfig,
  userName,
  userJob,
  userAvatar,
  myId,
} from '../utils/constants.js';
import './index.css';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/',
  headers: {
    authorization: '868762c3-88e2-4bf0-b9ab-a6e82ee7a617',
    'Content-Type': 'application/json',
  },
});

// Установка имени юзера с сервера
api.getUserInfo().then((data) => {
  userName.textContent = data.name;
  userJob.textContent = data.about;
  userAvatar.src = data.avatar;
});

const popupDelete = new PopupWithConfirm('.popup_delete-place', popupConfig);
popupDelete.setEventListeners();

// функция слушателя картинки для карт
const popupImage = new PopupWithImage('.popup_image-places', popupConfig);
popupImage.setEventListeners();

const handleCardClick = (data) => {
  popupImage.open(data);
};

// Функция создания новой карточки
const createCard = (cardItem) => {
  const placeCard = new Card(
    cardItem,
    '#places-template',
    handleCardClick,
    {
      handleDeleteIconClick: () => {
        popupDelete.open();
        popupDelete.setFormSubmitHandler(() => {
          api.deleteElement(cardItem._id).then(() => placeCard.deleteCard());
        });
      },
      handleLikeClick: (like) => {
        if (!like.classList.contains('places__button-like_enabled')) {
          return api.addLikeElement(cardItem._id).then((res) => {
            placeCard.likeCard(res.likes.length);
          });
        }
        return api.removeLikeElement(cardItem._id).then((res) => {
          placeCard.likeCard(res.likes.length);
        });
      },
    },
    myId
  );
  return placeCard.generateCard();
};

// Создание списка карточек
const cardsSection = new Section(
  {
    renderer: (cardItem) => {
      const placeCard = createCard(cardItem);
      cardsSection.addItem(placeCard);
    },
  },
  '.places__cards'
);

// Инициализация карт с сервера
api.getInitialCards().then((data) => {
  cardsSection.renderItems(data.reverse());
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
    api.sendUserInfo(formData).then((user) => userInfo.setUserInfo(user));
    popupUserInfoEdit.close();
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
    api
      .sendNewElement(formData)
      .then((result) => createCard(result))
      .then((newPlace) => cardsSection.addItem(newPlace))
      .then(() => popupPlaceAdd.close());
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
