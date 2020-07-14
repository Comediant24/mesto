enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  // submitButtonSelector: '.popup__save-button',
  // inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});

function enableValidation ( propertiesForm ) {
  const formElements = Array.from(document.querySelectorAll(propertiesForm.formSelector));
  
  formElements.forEach( form => {
    form.addEventListener('submit', evt => {
      evt.preventDefault();
    })
    form.addEventListener('input', (evt) => {
      isValid(evt, propertiesForm);
    })
  })
}

function isValid (evt, propertiesForm) {
  if (!evt.target.validity.valid) {
    showInputError(evt, propertiesForm);
  } else {
    hideInputError(evt, propertiesForm);
  }
}

function showInputError (evt, propertiesForm) {
  evt.target.classList.add(propertiesForm.inputErrorClass);
  evt.target.nextElementSibling.classList.add(propertiesForm.errorClass);
}

function hideInputError (evt, propertiesForm) {
  evt.target.classList.remove(propertiesForm.inputErrorClass);
  evt.target.nextElementSibling.classList.remove(propertiesForm.errorClass);
};