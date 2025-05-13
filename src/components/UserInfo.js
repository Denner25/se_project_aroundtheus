export default class UserInfo {
  constructor(profileName, profileDescription, avatar) {
    this._name = profileName;
    this._description = profileDescription;
    this._avatar = avatar;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.profileName = this._name.textContent;
    userInfo.profileDescription = this._description.textContent;
    // userInfo.avatar = this._avatar.src;
    // input was replaced by empty userInfo object
    // when moving value to textContent logic
    // as inputs are handled by form class

    return userInfo;
  }

  setUserInfo(name, description, avatar) {
    this._name.textContent = name;
    this._description.textContent = description;
    this._avatar.src = avatar;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
