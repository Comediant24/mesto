import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import {
  propertiesForm,
  popupConfig,
  userName,
  userJob,
  userAvatar,
  popup,
  templateCard,
  popupForm,
  userConfig,
  buttonConfig,
  profileInput,
  cardsContainer,
  currentUser,
} from '../utils/constants.js';
import renderLoading from '../utils/utils.js';

const api = new Api({
  baseUrl: currentUser.cohortUrl,
  headers: {
    authorization: currentUser.token,
    'Content-Type': 'application/json',
  },
});

api
  .getUserInfo()
  .then((data) => {
    userName.textContent = data.name;
    userJob.textContent = data.about;
    userAvatar.src = data.avatar;
  })
  .catch((err) => console.error(err));

const popupDelete = new PopupWithConfirm(popup.deletePlace, popupConfig);
const popupImage = new PopupWithImage(popup.imagePlace, popupConfig);
popupDelete.setEventListeners();
popupImage.setEventListeners();

const renderer = (cardItem) => {
  const placeCard = new Card(
    cardItem,
    templateCard,
    {
      handleCardClick: () => {
        popupImage.open(cardItem);
      },
      handleDeleteIconClick: () => {
        popupDelete.open();
        popupDelete.setFormSubmitHandler(() => {
          api
            .removeCard(cardItem._id)
            .then(() => {
              placeCard.deleteCard();
              popupDelete.close();
            })
            .catch((err) => console.error(err));
        });
      },
      handleLikeClick: (like) => {
        if (!like.classList.contains(buttonConfig.likeEnabled)) {
          return api
            .addLike(cardItem._id)
            .then((res) => {
              placeCard.likeCard(res.likes.length);
            })
            .catch((err) => console.error(err));
        }
        return api
          .removeLike(cardItem._id)
          .then((res) => {
            placeCard.likeCard(res.likes.length);
          })
          .catch((err) => console.error(err));
      },
    },
    currentUser.id
  );
  cardsSection.addItem(placeCard.generateCard());
};

const cardsSection = new Section(
  {
    renderer,
  },
  cardsContainer
);

api
  .getInitialCards()
  .then((data) => {
    cardsSection.renderItems(data.reverse());
  })
  .catch((err) => console.error(err));

const userInfo = new UserInfo({
  userName: userConfig.name,
  userJob: userConfig.job,
  userAvatar: userConfig.avatar,
});

const popupUserInfoEdit = new PopupWithForm(
  popup.editProfile,
  popupConfig,
  (formData) => {
    renderLoading(popup.editProfile, true);
    api
      .setUserInfo(formData)
      .then((user) => userInfo.setUserInfo(user))
      .then(() => popupUserInfoEdit.close())
      .catch((err) => console.error(err))
      .finally(() => renderLoading(popup.editProfile, false));
  }
);
popupUserInfoEdit.setEventListeners();

const popupAvatarFormValidate = new FormValidator(
  popupForm.avatarForm,
  propertiesForm
);
const popupProfileFormValidate = new FormValidator(
  popupForm.editUserForm,
  propertiesForm
);
const popupPlaceFormValidate = new FormValidator(
  popupForm.addPlaceForm,
  propertiesForm
);
popupProfileFormValidate.enableValidation();
popupAvatarFormValidate.enableValidation();
popupPlaceFormValidate.enableValidation();

const popupAvatar = new PopupWithForm(
  popup.loadAvatar,
  popupConfig,
  (formData) => {
    renderLoading(popup.loadAvatar, true);
    api
      .changeAvatar(formData)
      .then((user) => userInfo.setUserInfo(user))
      .then(() => popupAvatar.close())
      .catch((err) => console.error(err))
      .finally(() => renderLoading(popup.loadAvatar, false));
  }
);
popupAvatar.setEventListeners();

buttonConfig.changeAvatar.addEventListener('click', () => {
  popupAvatar.open();
  popupAvatarFormValidate.resetForm();
});

buttonConfig.editProfile.addEventListener('click', () => {
  const userGetInfo = userInfo.getUserInfo();
  profileInput.nameUser.value = userGetInfo.name;
  profileInput.jobUser.value = userGetInfo.job;
  popupUserInfoEdit.open();
  popupProfileFormValidate.resetForm();
});

const popupPlaceAdd = new PopupWithForm(
  popup.addPlaces,
  popupConfig,
  (formData) => {
    renderLoading(popup.addPlaces, true);
    api
      .addCard(formData)
      .then((result) => renderer(result))
      .then(() => popupPlaceAdd.close())
      .catch((err) => console.error(err))
      .finally(() => renderLoading(popup.addPlaces, false, 'Создать'));
  }
);
popupPlaceAdd.setEventListeners();

buttonConfig.addPlace.addEventListener('click', () => {
  popupPlaceAdd.open();
  popupPlaceFormValidate.resetForm();
});
