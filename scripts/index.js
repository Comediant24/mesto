import Card from './card.js';

const popupProfile = document.querySelector('.popup_edit-profile');
const editProfileButton = document.querySelector('.profile__user-edit-button');
const popupProfileCloseButton = document.querySelector('.popup__close-button_edit-profile');
const popupProfileOverlay = document.querySelector('.popup__overlay_edit-profile');
const nameProfileUser = document.querySelector('.profile__user-name');
const jobProfileUser = document.querySelector('.profile__user-job');
const popupProfileForm = document.querySelector('.popup__form_edit-profile');
const popupProfileNameInput = document.querySelector('.popup__input_type_profile-name');
const popupProfileJobInput = document.querySelector('.popup__input_type_profile-status');
const popupProfileSaveButton = popupProfileForm.querySelector('.popup__save-button');

const popupPlaces = document.querySelector('.popup_add-places');
const addPlacesButton = document.querySelector('.profile__add-button');
const popupPlacesCloseButton = document.querySelector('.popup__close-button__add-places');
const popupPlacesOverlay = document.querySelector('.popup__overlay_add-places');
const popupPlacesForm = document.querySelector('.popup__form_add-places');
const popupPlacesNameInput = document.querySelector('.popup__input_type_places-name');
const popupPlacesImageInput = document.querySelector('.popup__input_type_place-image');
const popupPlacesSaveButton = popupPlacesForm.querySelector('.popup__save-button');

const popupImage = document.querySelector('.popup_image-places');
const popupImageCloseButton = document.querySelector('.popup__close-button_image-places');
const popupImageOverlay = document.querySelector('.popup__overlay_image-places');
const popupImagePlace = document.querySelector('.popup__places-image');
const popupImageTitle = document.querySelector('.popup__places-title');

const placesTemplate = document.querySelector('#places-template').content;
const placesCardList = document.querySelector('.places__cards');

const initialCards = [
  {
    name: 'Селигер',
    link: './images/seliger.jpg'
  },
  {
    name: 'Сахалин',
    link: './images/sahalin_134.jpg'
  },
  {
    name: 'Эвенкия',
    link: './images/plato-putarano.png'
  },
  {
    name: 'Якутия',
    link: './images/lensk-stolb.jpg'
  },
  {
    name: 'Байкал',
    link: './images/baikal.jpg'
  },
  {
    name: 'Красноярск',
    link: './images/kras-stolb.jpg'
  }
];

const propertiesForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Функция закрытия Popup по escape
const popupEscape = evt => {
  const popup = document.querySelector('.popup_opened');
  if (evt.key == 'Escape') {
    popupClose(popup);
  }
};

// Функция добавления слушателя Escape
const setCloseListeners = () => {
  document.addEventListener('keydown', popupEscape);
};

// Функция удаления слушателя Escape
const removeCloseListeners = () => {
  document.removeEventListener('keydown', popupEscape);
};

// Функция добавления класса _opened
const popupOpen = popup => {
  popup.classList.add('popup_opened');
  setCloseListeners ();
};

// Функция удаления класса _opened
const popupClose = popup => {
  popup.classList.remove('popup_opened');
  removeCloseListeners ();
};

// Функция для отправки введенной информации profile
const formSubmitHandlerProfile = evt => {
  evt.preventDefault();
  nameProfileUser.textContent = popupProfileNameInput.value;
  jobProfileUser.textContent = popupProfileJobInput.value;
  popupClose(popupProfile);
};

// // Функция лайка places
// const likePlaceItem = cloneNode => {
//   cloneNode.querySelector('.places__button-like').addEventListener('click', (evt) => {
//     const placesItemLike = evt.target;
//     placesItemLike.classList.toggle('places__button-like_enabled');
//   });
// };

// // Функция удаления карточки
// const deletePlaceItem = cloneNode => {
//   cloneNode.querySelector('.places__button-delete').addEventListener('click', (evt) => {
//     const placesItemDelete = evt.target.closest('.places__items');
//     placesItemDelete.remove();
//   });
// };

// Функция попапа Image
const renderPopupImage = (title, image, cloneNode) => {
  cloneNode.querySelector('.places__image').addEventListener('click', () => {
    popupImagePlace.src = image;
    popupImagePlace.alt = `${title}. Красивые места России.`;
    popupImageTitle.textContent = title;
    popupOpen(popupImage);
  });
};

// Функция создания карточек
const createPlace = (title, image) => {
  const newPlace = {
    name: title,
    link: image
  }
  const placeCard = new Card (newPlace, '#places-template');
  const placeItem = placeCard.generateCard();


  renderPopupImage (title, image, placeItem);
  
  return placeItem;
};

// Функция добавления новых карточек в начало
const renderPlaceItemNew = item => {
  placesCardList.prepend(item);
};

// Функция добавления стартовых карточек попорядку
const renderPlaceItemStart = item => {
  placesCardList.append(item);
};

// Функция для отправки введенной информации places
const formSubmitHandlerPlaces = evt => {
  evt.preventDefault();
  const place = createPlace (popupPlacesNameInput.value, popupPlacesImageInput.value);
  popupPlacesForm.reset();
  renderPlaceItemNew (place);
  popupClose(popupPlaces);
};

//инициализация стартовых карточек массива через класс Card
initialCards.forEach (item => {
  const placeCard = new Card (item, '#places-template');

  const placeItem = placeCard.generateCard();
  placesCardList.append(placeItem);
})

// Слушатели событий popup для user
editProfileButton.addEventListener('click', () => {
  popupProfileNameInput.value = nameProfileUser.textContent;
  popupProfileJobInput.value = jobProfileUser.textContent;
  const inputsProfile = Array.from(popupProfileForm.querySelectorAll('.popup__input'));
  inputsProfile.forEach( input => {
    hideInputError (input, propertiesForm);
  });
  toggleButtonState(inputsProfile, popupProfileSaveButton, propertiesForm);
  popupOpen(popupProfile);
});
popupProfileCloseButton.addEventListener('click', () => popupClose(popupProfile));
popupProfileOverlay.addEventListener('click', () => popupClose(popupProfile));
popupProfileForm.addEventListener('submit', formSubmitHandlerProfile);

// Слушатели событий popup для places
addPlacesButton.addEventListener('click', () => {
  popupPlacesForm.reset();
  const inputsPlaces = Array.from(popupPlacesForm.querySelectorAll('.popup__input'));
  toggleButtonState(inputsPlaces, popupPlacesSaveButton, propertiesForm);
  popupOpen(popupPlaces);
});
popupPlacesCloseButton.addEventListener('click', () => popupClose(popupPlaces));
popupPlacesOverlay.addEventListener('click', () => popupClose(popupPlaces));
popupPlacesForm.addEventListener('submit', formSubmitHandlerPlaces);

// Слушатели событий popup для popupImage
popupImageOverlay.addEventListener('click', () => popupClose(popupImage));
popupImageCloseButton.addEventListener('click', () => popupClose(popupImage));

enableValidation(propertiesForm);