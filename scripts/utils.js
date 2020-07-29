export {popupImage, popupOpen};

const popupImage = document.querySelector('.popup_image-places');

const popupOpen = popup => {
  popup.classList.add('popup_opened');
};