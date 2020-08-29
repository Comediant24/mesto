export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  setUserInfo(formData) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: formData['user-name'],
        about: formData['user-job'],
      }),
    }).then((res) => this._handleResponse(res));
  }

  addCard(formData) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: formData['places-name'],
        link: formData['places-image'],
      }),
    }).then((res) => this._handleResponse(res));
  }

  removeCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  addLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  removeLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  changeAvatar(formData) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: formData['avatar-link'],
      }),
    }).then((res) => this._handleResponse(res));
  }
}
