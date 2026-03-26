// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardsList = document.querySelector('.places__list');

// Функция создания карточки
function createCard(element, removeCard, likeCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const title = card.querySelector('.card__title');
    const image = card.querySelector('.card__image');

    title.textContent = element.name;
    image.src = element.link;
    image.alt = element.name;

    const deleteButton = card.querySelector('.card__delete-button').addEventListener('click', removeCard);
    const likeButton = card.querySelector('.card__like-button').addEventListener('click', likeCard);
    return card;
}

// Функция удаления карточки
function removeCard(event) {
    event.target.closest('.card').remove();
}

function likeCard(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

// Вывести карточки на страницу
function appendCardsToList(cards) {
    initialCards.forEach((element) => {
        cardsList.appendChild(createCard(element, removeCard, likeCard));
    });
}

appendCardsToList(initialCards);