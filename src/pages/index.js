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
  changeAvatarButton,
  submitProfileButton,
  submitAvatarButton,
  submitPlacesButton,
  myToken,
  cohort,
} from '../utils/constants.js';
import './index.css';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: cohort,
  headers: {
    authorization: myToken,
    'Content-Type': 'application/json',
  },
});

api.getUserInfo().then((data) => {
  userName.textContent = data.name;
  userJob.textContent = data.about;
  userAvatar.src = data.avatar;
});

const popupDelete = new PopupWithConfirm('.popup_delete-place', popupConfig);
const popupImage = new PopupWithImage('.popup_image-places', popupConfig);
popupDelete.setEventListeners();
popupImage.setEventListeners();

const handleCardClick = (data) => {
  popupImage.open(data);
};

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

const cardsSection = new Section(
  {
    renderer: (cardItem) => {
      const placeCard = createCard(cardItem);
      cardsSection.addItem(placeCard);
    },
  },
  '.places__cards'
);

api.getInitialCards().then((data) => {
  cardsSection.renderItems(data.reverse());
});

const userInfo = new UserInfo({
  userName: '.profile__user-name',
  userJob: '.profile__user-job',
  userAvatar: '.profile__avatar',
});

const popupUserInfoEdit = new PopupWithForm(
  '.popup_edit-profile',
  popupConfig,
  (formData) => {
    submitProfileButton.textContent = 'Сохранение...';
    api
      .sendUserInfo(formData)
      .then((user) => userInfo.setUserInfo(user))
      .then(() => popupUserInfoEdit.close())
      .then(() => (submitProfileButton.textContent = 'Сохранить'));
  }
);
popupUserInfoEdit.setEventListeners();

const popupAvatarFormValidate = new FormValidator(
  '.popup__form_avatar-change',
  propertiesForm
);
const popupProfileFormValidate = new FormValidator(
  '.popup__form_edit-profile',
  propertiesForm
);
const popupPlaceFormValidate = new FormValidator(
  '.popup__form_add-places',
  propertiesForm
);
popupProfileFormValidate.enableValidation();
popupAvatarFormValidate.enableValidation();
popupPlaceFormValidate.enableValidation();

const popupAvatar = new PopupWithForm(
  '.popup_avatar-change',
  popupConfig,
  (formData) => {
    submitAvatarButton.textContent = 'Сохранение...';
    api
      .changeAvatar(formData)
      .then((user) => userInfo.setUserInfo(user))
      .then(() => popupAvatar.close())
      .then(() => (submitAvatarButton.textContent = 'Сохранить'));
  }
);
popupAvatar.setEventListeners();

changeAvatarButton.addEventListener('click', () => {
  popupAvatar.open();
  popupAvatarFormValidate.resetForm();
});

editProfileButton.addEventListener('click', () => {
  const userGetInfo = userInfo.getUserInfo();
  popupProfileNameInput.value = userGetInfo.name;
  popupProfileJobInput.value = userGetInfo.job;
  popupUserInfoEdit.open();
  popupProfileFormValidate.resetForm();
});

const popupPlaceAdd = new PopupWithForm(
  '.popup_add-places',
  popupConfig,
  (formData) => {
    submitPlacesButton.textContent = 'Сохранение...';
    api
      .sendNewElement(formData)
      .then((result) => createCard(result))
      .then((newPlace) => cardsSection.addItem(newPlace))
      .then(() => popupPlaceAdd.close())
      .then(() => (submitPlacesButton.textContent = 'Создать'));
  }
);
popupPlaceAdd.setEventListeners();

addPlacesButton.addEventListener('click', () => {
  popupPlaceAdd.open();
  popupPlaceFormValidate.resetForm();
});
