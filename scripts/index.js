const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
const editButton = document.querySelector('.profile__user-edit-button');
const formPopup = document.querySelector('.popup__edit-form');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_status');
const nameUser = document.querySelector('.profile__user-name');
const jobUser = document.querySelector('.profile__user-job');
const popupOverlay = document.querySelector('.popup__overlay');

function popupToggle () {
  nameInput.value = nameUser.textContent;
  jobInput.value = jobUser.textContent;
  if (popup.classList.contains('popup_opened')) {
    popup.classList.toggle('popup_opened');
  } else {
    popup.classList.toggle('popup_opened');
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameUser.textContent = nameInput.value;
  jobUser.textContent = jobInput.value;
  popupToggle ()
}

popupOverlay.addEventListener('click', popupToggle);
editButton.addEventListener('click', popupToggle);
closeButton.addEventListener('click', popupToggle);
formPopup.addEventListener('submit', formSubmitHandler);