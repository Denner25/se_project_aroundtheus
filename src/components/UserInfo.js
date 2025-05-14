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
    return userInfo;
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._description.textContent = about;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
