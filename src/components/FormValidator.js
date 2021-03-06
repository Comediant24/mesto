export default class FormValidator {
  constructor(formSelector, data) {
    this._form = document.querySelector(formSelector);
    this._input = data.inputSelector;
    this._submitButton = this._form.querySelector(data.submitButtonSelector);
    this._inactive = data.inactiveButtonClass;
    this._inputError = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
  }

  _showInputError(input) {
    input.classList.add(this._inputError);
    input.nextElementSibling.textContent = input.validationMessage;
    input.nextElementSibling.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    input.classList.remove(this._inputError);
    input.nextElementSibling.textContent = '';
    input.nextElementSibling.classList.remove(this._errorClass);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._inactive);
      button.disabled = true;
    } else {
      button.classList.remove(this._inactive);
      button.disabled = false;
    }
  }

  _isInputValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isInputValid(inputElement);
        this._toggleButtonState(this._inputList, this._submitButton);
      });
    });
  }

  resetForm() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState(this._inputList, this._submitButton);
  }

  enableValidation() {
    this._setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }
}
