export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.userName);
    this._job = document.querySelector(data.userJob);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
    this._id = data._id;
  }
}