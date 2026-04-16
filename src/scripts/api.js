const URL = 'https://mesto.nomoreparties.co';
const TOKEN = '493b871d-1813-4354-b8a1-4527b37450bb'; 
const GROUP_ID = 'high-education-web-developer-magistr_4';
const BASE_URL = `${URL}/v1/${GROUP_ID}`;

const config = {
  baseUrl: BASE_URL,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
}

function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(handleResponse);
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(handleResponse);
}

function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  }).then(handleResponse);
}

function addCard({name, link}) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  }).then(handleResponse);
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(handleResponse);
}

function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }).then(handleResponse);
}

function dislikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(handleResponse);
}

function setAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  }).then(handleResponse);
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

export { getUserData, getCards, editProfile, addCard, deleteCard, likeCard, dislikeCard, setAvatar }