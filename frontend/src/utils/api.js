class Api {
  constructor({baseUrl, authorization}) {
    this._cardsUrl = baseUrl + '/cards';
    this._userInfoUrl = baseUrl + '/users/me';
    this._userAvatarUrl = baseUrl + '/users/me/avatar';
  
    this._autorization = authorization;
  }
  
  _getHeader() {
    return {
      'Content-Type': 'application/json',
      authorization: this._autorization 
    }
  }
  
  _getJson(res) {
    if (res.ok) {
      return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  }
  
  getInitialCards() {
    return fetch(this._cardsUrl , {
      method: 'GET',
      headers: this._getHeader()
      })
      .then(this._getJson);
  }
  
  getUserInfo() {
    return fetch(this._userInfoUrl, {
      method: 'GET',
      headers: this._getHeader()
      })
      .then(this._getJson);
  }
  
  postUserInfo({name, about}) {
    return fetch(this._userInfoUrl, {
      method: 'PATCH',
      headers: this._getHeader(),
      body: JSON.stringify({
        name: name,
        about: about,
      })
      })
      .then(this._getJson);
  }
  
  postUserAvatar(data) {
    return fetch(this._userAvatarUrl, {
      method: 'PATCH',
      headers: this._getHeader(),
      body: JSON.stringify({
        avatar: data,
      })
      })
      .then(this._getJson);
  }
  
  postCard(data) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._getHeader(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
      })
      .then(this._getJson);
  }
  
  deleteCard(id) {
    return fetch(this._cardsUrl + '/' + id, {
      method: 'DELETE',
      headers: this._getHeader()
    })
    .then(this._getJson);
  }
  
  like(id) {
    return fetch(this._cardsUrl + '/' + id + '/likes', {
      method: 'PUT',
      headers: this._getHeader()
    })
    .then(this._getJson);
  }
  
  removeLike(id) {
    return fetch(this._cardsUrl + '/' + id + '/likes', {
      method: 'DELETE',
      headers: this._getHeader()
    })
    .then(this._getJson);
  }
}

  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
    authorization: '653fa548-6834-4cc4-a376-28fd07f6118e'   
  });

export default api;