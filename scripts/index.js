//const popup = document.querySelector('.popup');
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


// Функция переключатель класса у popup
popupToggle = popup => {
  if (!(popup.classList.contains('popup_opened'))) {
    popupProfileNameInput.value = nameProfileUser.textContent;
    popupProfileJobInput.value = jobProfileUser.textContent;
    popupPlacesNameInput.value = '';
    popupPlacesImageInput.value = '';
  }
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
  addPlaces (popupPlacesNameInput.value, popupPlacesImageInput.value);
  popupToggle (popupPlaces);
}

// Функция добавления новых карточек
addPlaces = (title, image) => {
  console.log(title, image)
  const placesTemplate = document.querySelector('#places-template').content;
  const placesCardList = document.querySelector('.places__cards');
  const placesItems = placesTemplate.cloneNode(true);
  
  const placesTitle = placesItems.querySelector('.places__title');
  const placesImage = placesItems.querySelector('.places__image');
  
  placesTitle.textContent = title;
  placesImage.src = image;
  
  placesCardList.prepend(placesItems);
}

// Слушатели событий popup для user
popupProfileOverlay.addEventListener('click', () => {
  popupToggle(popupProfile)
});
editProfileButton.addEventListener('click', () => {
  popupToggle(popupProfile)
});
popupProfileCloseButton.addEventListener('click', () => {
  popupToggle(popupProfile)
});
popupProfileForm.addEventListener('submit', formSubmitHandlerProfile);


// Слушатели событий popup для places
popupPlacesOverlay.addEventListener('click', () => {
  popupToggle(popupPlaces)
});
addPlacesButton.addEventListener('click', () => {
  popupToggle(popupPlaces)
});
popupPlacesCloseButton.addEventListener('click', () => {
  popupToggle(popupPlaces)
});
popupPlacesForm.addEventListener('submit', formSubmitHandlerPlaces);

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//инициализация стартовых карточек массива
initialCards.forEach (item => {
  addPlaces (item.name, item.link);
});