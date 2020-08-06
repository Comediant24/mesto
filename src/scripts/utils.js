export {popupImage, popupOpen, popupClose};

const popupImage = document.querySelector('.popup_image-places');

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
