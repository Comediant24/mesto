export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.userName);
    this._job = document.querySelector(data.userJob);
  }

  getUserInfo() {
    this._userValues = {};
    this._userValues.name = this._name.textContent;
    this._userValues.job = this._job.textContent;
    return this._userValues;
  }

  setUserInfo(data) {
    this._name.textContent = data['user-name'];
    this._job.textContent = data['user-job'];
  }
}