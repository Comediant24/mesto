enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  // submitButtonSelector: '.popup__save-button',
  // inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});

function enableValidation ( propertiesForm ) {
  const formList = Array.from(document.querySelectorAll(propertiesForm.formSelector));
  
  formList.forEach( formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    setEventListeners(formElement, propertiesForm);
  });
}

function setEventListeners (formElement, propertiesForm) {

  const inputList = Array.from(formElement.querySelectorAll(propertiesForm.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, propertiesForm)
    });
  });
}

function isValid (input, propertiesForm) {
  if (!input.validity.valid) {
    showInputError(input, input.validationMessage, propertiesForm);
  } else {
    hideInputError(input, propertiesForm);
  }
}

function showInputError (input, errorMessage, propertiesForm) {
  input.classList.add(propertiesForm.inputErrorClass);
  input.nextElementSibling.textContent = errorMessage;
  input.nextElementSibling.classList.add(propertiesForm.errorClass);
}

function hideInputError (input, propertiesForm) {
  input.classList.remove(propertiesForm.inputErrorClass);
  input.nextElementSibling.textContent = '';
  input.nextElementSibling.classList.remove(propertiesForm.errorClass);
};
