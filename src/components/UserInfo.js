export default class UserInfo {
  constructor(profileTitle, profileDescription) {
    this._title = profileTitle;
    this._description = profileDescription;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.profileTitle = this._title.textContent;
    userInfo.profileDescription = this._description.textContent;
    // input was replaced by empty userInfo object
    // when moving value to textContent logic
    // as inputs are handled by form class
    return userInfo;
  }

  setUserInfo(title, description) {
    this._title.textContent = title;
    this._description.textContent = description;
  }
}
