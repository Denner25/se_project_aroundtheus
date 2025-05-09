export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._checkResponse = this._checkResponse.bind(this);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return (
      fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
        .then(this._checkResponse)
        // extra .then to keep using title and not change everywhere to name
        .then((data) => {
          return data.map((item) => ({
            id: item._id,
            title: item.name,
            link: item.link,
            ...item,
          }));
        })
    );
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  addItem({ title, link }) {
    return (
      fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
        method: "POST",
        body: JSON.stringify({
          name: title,
          link,
        }),
      })
        .then(this._checkResponse)
        // extra .then to keep using title and not change everywhere to name
        .then((data) => {
          return {
            id: data._id,
            title: data.name,
            link: data.link,
            ...data,
          };
        })
    );
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  unlikeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }
}
