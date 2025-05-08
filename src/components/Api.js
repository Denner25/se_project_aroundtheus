export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return (
      fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        // extra .then to keep using title and not change everywhere to name
        .then((data) => {
          return data.map((item) => ({
            title: item.name,
            link: item.link,
            ...item,
          }));
        })
    );
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateProfile({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addItem({ title, link }) {
    return (
      fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
        method: "POST",
        body: JSON.stringify({
          name: title,
          link,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        // extra .then to keep using title and not change everywhere to name
        .then((data) => {
          return {
            title: data.name,
            link: data.link,
            ...data,
          };
        })
    );
  }
}
