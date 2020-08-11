import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, data, submiter) {
    super(popupSelector, data);
    this._form = this._popup.querySelector(data.popupForm);
    this._inputList = this._popup.querySelectorAll(data.popupFormInput);
    this._handleFormSubmit = submiter;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}