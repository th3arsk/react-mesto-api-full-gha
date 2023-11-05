//const BASE_URL = 'https://auth.nomoreparties.co' 
const BASE_URL = 'https://api.th3arsk.students.nomoredomainsmonster.ru'

export function signup(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
}

export function signin(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
  .then((res => res.json()))
  .then((res) => {
    if (res) {
      localStorage.setItem('jwt', res.token);
      return res
     }
  })
}

export function checkToken() {
  const token = localStorage.getItem('jwt');
  
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
}
 

