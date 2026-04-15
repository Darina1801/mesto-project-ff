const URL = 'https://mesto.nomoreparties.co';
const TOKEN = ''; 
const GROUP_ID = 'cohort-magistr-2';
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
  }).then(response => handleResponse(response));
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(response => handleResponse(response));
}

function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  }).then(response => handleResponse(response));
}

function addCard({name, link}) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  }).then(response => handleResponse(response));
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(response => handleResponse(response));
}

function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }).then(response => handleResponse(response));
}

function dislikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(response => handleResponse(response));
}

function setAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  }).then(response => handleResponse(response));
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

export { getUserData, getCards, editProfile, addCard, deleteCard, likeCard, dislikeCard, setAvatar }