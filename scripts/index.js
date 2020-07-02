const popupProfile = document.querySelector('.popup_edit-profile');
const editProfileButton = document.querySelector('.profile__user-edit-button');
const popupProfileCloseButton = document.querySelector('.popup__close-button_edit-profile');
const popupProfileOverlay = document.querySelector('.popup__overlay_edit-profile');
const nameProfileUser = document.querySelector('.profile__user-name');
const jobProfileUser = document.querySelector('.profile__user-job');
const popupProfileForm = document.querySelector('.popup__form_edit-profile');
const popupProfileNameInput = document.querySelector('.popup__input_type_profile-name');
const popupProfileJobInput = document.querySelector('.popup__input_type_profile-status');

const popupPlaces = document.querySelector('.popup_add-places');
const addPlacesButton = document.querySelector('.profile__add-button');
const popupPlacesCloseButton = document.querySelector('.popup__close-button__add-places');
const popupPlacesOverlay = document.querySelector('.popup__overlay_add-places');
const popupPlacesForm = document.querySelector('.popup__form_add-places');
const popupPlacesNameInput = document.querySelector('.popup__input_type_places-name');
const popupPlacesImageInput = document.querySelector('.popup__input_type_place-image');

const popupImage = document.querySelector('.popup_image-places');
const popupImageCloseButton = document.querySelector('.popup__close-button_image-places');
const popupImageOverlay = document.querySelector('.popup__overlay_image-places');

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

// Функция переключатель класса у popup
popupToggle = popup => {
  popup.classList.toggle('popup_opened');
}

// Функция для отправки введенной информации profile
formSubmitHandlerProfile = evt => {
  evt.preventDefault();
  nameProfileUser.textContent = popupProfileNameInput.value;
  jobProfileUser.textContent = popupProfileJobInput.value;
  popupToggle (popupProfile);
}

// Функция для отправки введенной информации places
formSubmitHandlerPlaces = evt => {
  evt.preventDefault();
  const place = addPlace (popupPlacesNameInput.value, popupPlacesImageInput.value);  
  popupPlacesNameInput.value = '';
  popupPlacesImageInput.value = '';
  renderPlaceItemNew (place);
  popupToggle (popupPlaces);
}

// Функция добавления новых карточек в начало
function renderPlaceItemNew (item) {
  placesCardList.prepend(item);
}

// Функция добавления стартовых карточек попорядку
function renderPlaceItemStart (item) {
  placesCardList.append(item);
};

// Функция добавления карточек
function addPlace (title, image) {
  const placeItem = placesTemplate.cloneNode(true);
  
  placeItem.querySelector('.places__title').textContent = title;
  placeItem.querySelector('.places__image').src = image;
  placeItem.querySelector('.places__image').alt = `${title}. Красивые места России.`;
  
  likePlaceItem (placeItem);
  deletePlaceItem (placeItem);
  renderPopupImage (title, image, placeItem);
  
  return placeItem;
}

// Функция лайка places
function likePlaceItem (cloneNode) {
  cloneNode.querySelector('.places__button-like').addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('places__button-like_enabled');
  });
}

// Функция удаления карточки
function deletePlaceItem (cloneNode) {
  cloneNode.querySelector('.places__button-delete').addEventListener('click', (evt) => {
    const placesItem = evt.target.closest('.places__items');
    placesItem.remove();
  });
};

// Функция попапа Image
function renderPopupImage (title, image, cloneNode) {
  cloneNode.querySelector('.places__image').addEventListener('click', () => {
    document.querySelector('.popup__places-image').src = image;
    document.querySelector('.popup__places-image').alt = `${title}. Красивые места России.`;
    document.querySelector('.popup__places-title').textContent = title;
    popupToggle(popupImage);
  });
};

//инициализация стартовых карточек массива
initialCards.forEach (item => {
  const place = addPlace (item.name, item.link);
  renderPlaceItemStart (place);
});

// Слушатели событий popup для user
editProfileButton.addEventListener('click', () => {
  popupProfileNameInput.value = nameProfileUser.textContent;
  popupProfileJobInput.value = jobProfileUser.textContent;
  popupToggle(popupProfile)
});
popupProfileCloseButton.addEventListener('click', () => popupToggle(popupProfile));
popupProfileOverlay.addEventListener('click', () => popupToggle(popupProfile));
popupProfileForm.addEventListener('submit', formSubmitHandlerProfile);

// Слушатели событий popup для places
addPlacesButton.addEventListener('click', () => popupToggle(popupPlaces));
popupPlacesCloseButton.addEventListener('click', () => popupToggle(popupPlaces));
popupPlacesOverlay.addEventListener('click', () => popupToggle(popupPlaces));
popupPlacesForm.addEventListener('submit', formSubmitHandlerPlaces);

// Слушатели событий popup для popupImage
popupImageOverlay.addEventListener('click', () => popupToggle(popupImage));
popupImageCloseButton.addEventListener('click', () => popupToggle(popupImage));