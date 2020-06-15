const editButton = document.querySelector('.profile__user-edit-button');
const nameUser = document.querySelector('.profile__user-name');
const jobUser = document.querySelector('.profile__user-job');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
const popupOverlay = document.querySelector('.popup__overlay');
const formPopup = document.querySelector('.popup__edit-form');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_status');

// Функция переключатель класса у popup
function popupToggle () {
  if (!(popup.classList.contains('popup_opened'))) {  // проверка отсутствия у popup модификатора popup_opened
    nameInput.value = nameUser.textContent;
    jobInput.value = jobUser.textContent;
  }
  popup.classList.toggle('popup_opened');
}

// Функция для отправки введенной информации 
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameUser.textContent = nameInput.value;
  jobUser.textContent = jobInput.value;
  popupToggle ()
}

// Слушатели событий popup
popupOverlay.addEventListener('click', popupToggle);
editButton.addEventListener('click', popupToggle);
closeButton.addEventListener('click', popupToggle);
formPopup.addEventListener('submit', formSubmitHandler);