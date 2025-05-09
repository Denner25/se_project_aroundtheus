export default class UserInfo {
  constructor(profileName, profileDescription) {
    this._name = profileName;
    this._description = profileDescription;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.profileName = this._name.textContent;
    userInfo.profileDescription = this._description.textContent;
    // input was replaced by empty userInfo object
    // when moving value to textContent logic
    // as inputs are handled by form class
    return userInfo;
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
