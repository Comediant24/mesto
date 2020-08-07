// Функция добавления класса _opened
const popupOpen = (popup) => {
  popup.classList.add('popup_opened');
};

// Функция удаления класса _opened
const popupClose = (popup) => {
  popup.classList.remove('popup_opened');
};

export {
  popupOpen,
  popupClose
};