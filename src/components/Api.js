export default class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  _handleError(error) {
    console.error(`К сожалению, произошла ошибка: ${error}`);
    return Promise.reject(error.message);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
        headers: this._headers,
      })
      .then((res) => this._handleResponse(res))
      .catch(this._handleError);
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then((res) => res.json());
  }

  sendUserInfo(formData) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: formData['user-name'],
        about: formData['user-job'],
      }),
    }).then((res) => res.json());
  }

  sendNewElement(formData) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: formData['places-name'],
        link: formData['places-image'],
      }),
    }).then((res) => res.json());
  }

  deleteElement(id) {
    return fetch(`${this._url}cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then((res) => this._handleResponse(res))
      .catch(this._handleError);
  }

  addLikeElement(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then((res) => this._handleResponse(res))
      .catch(this._handleError);
  }

  removeLikeElement(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then((res) => this._handleResponse(res))
      .catch(this._handleError);
  }

  changeAvatar(formData) {
    return fetch(`${this._url}users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: formData['avatar-link'],
        }),
      })
      .then((res) => this._handleResponse(res))
      .catch(this._handleError);
  }
}