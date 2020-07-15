const showInputError = (input, errorMessage, propertiesForm) => {
  input.classList.add(propertiesForm.inputErrorClass);
  input.nextElementSibling.textContent = errorMessage;
  input.nextElementSibling.classList.add(propertiesForm.errorClass);
};

const hideInputError = (input, propertiesForm) => {
  input.classList.remove(propertiesForm.inputErrorClass);
  input.nextElementSibling.textContent = '';
  input.nextElementSibling.classList.remove(propertiesForm.errorClass);
};

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, button, propertiesForm) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(propertiesForm.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(propertiesForm.inactiveButtonClass);
    button.disabled = false;
  }
};

const isInputValid = (input, propertiesForm) => {  
  if (!input.validity.valid) {
    showInputError(input, input.validationMessage, propertiesForm);
  } else {
    hideInputError(input, propertiesForm);
  }
};

const setEventListeners = (formElement, propertiesForm) => {
  const inputList = Array.from(formElement.querySelectorAll(propertiesForm.inputSelector));
  const buttonElement = formElement.querySelector(propertiesForm.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isInputValid(inputElement, propertiesForm);
      toggleButtonState(inputList, buttonElement, propertiesForm);
    });
  });
};

const enableValidation = propertiesForm => {
  const formList = Array.from(document.querySelectorAll(propertiesForm.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, propertiesForm);
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
  });
};