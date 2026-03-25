// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardList = document.querySelector('.places__list');

// Функция создания карточки
function createCard(element, removeCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const title = card.querySelector('.card__title');
    const image = card.querySelector('.card__image');
    const description = card.querySelector('.card__description');

    title.textContent = element.name;
    image.src = element.link;
    image.alt = element.name;
    description.textContent = element.description;

    const deleteButton = cardTemplate.querySelector('.card__delete-button').addEventListener('click', removeCard);
    const likeButton = cardTemplate.querySelector('.card__like-button').addEventListener('click', function (event) {
        event.target.classList.toggle('card__like-button_active');
    });

    return card;
}

// Функция удаления карточки
function removeCard(event) {
    event.target.closest('.card').remove();
}

// Вывести карточки на страницу
function appendCardsToList(cards) {
    initialCards.forEach((element) => {
        cardsList.appendChild(createCard(element, removeCard));
    });
}

appendCardsToList(initialCards);