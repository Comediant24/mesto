
export default class FormValidator {

  constructor (formSelector, data) {
    this._form = formSelector; // Сюда должен передаваться класс конкретной формы
    this._input = data.inputSelector;
    this._submitButton = data.submitButtonSelector;
    this._inactive = data.inactiveButtonClass;
    this._inputError = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  _showInputError = (input) => {
    input.classList.add(this._inputError);
    input.nextElementSibling.textContent = input.validationMessage;
    input.nextElementSibling.classList.add(this._errorClass);
  };

  _hideInputError = (input) => {
    input.classList.remove(this._inputError);
    input.nextElementSibling.textContent = '';
    input.nextElementSibling.classList.remove(this._errorClass);
  };

  _hasInvalidInput = inputList => {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState = (inputList, button) => {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._inactive);
      button.disabled = true;
    } else {
      button.classList.remove(this._inactive);
      button.disabled = false;
    }
  };

  _isInputValid = (input) => {  
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  };

  _setEventListeners = (form) => {
    const inputList = Array.from(form.querySelectorAll(this._input));
    const buttonElement = form.querySelector(this._submitButton);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isInputValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {
    const formElement = document.querySelector(this._form);
    this._setEventListeners(formElement);
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
  };
}