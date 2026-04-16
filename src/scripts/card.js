const cardTemplate = document.querySelector('#card-template').content;

function createCard(element, userId, deleteCard, likeCard, addImagePopupHandler) {
    if (!userId) {
        console.error('ID пользователя не получен. Карточка не будет создана.');
        return;
    }
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const title = card.querySelector('.card__title');
    const image = card.querySelector('.card__image');

    title.textContent = element.name;
    image.src = element.link;
    image.alt = element.name;
    image.addEventListener('click', addImagePopupHandler);

    const deleteButton = card.querySelector('.card__delete-button'); 
    if (element.owner?._id === userId) {
        deleteButton.addEventListener('click', () => {
            deleteCard(card, element._id);
        });
    } else {
        deleteButton.remove();
    }
    const likeButton = card.querySelector('.card__like-button');
    if (element.likes.some((like) => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }
    likeButton.addEventListener('click', (event) => {
        likeCard(event, element._id);
    });
    const likesCounter = card.querySelector('.card__like-counter');
    likesCounter.textContent = element.likes.length;

    return card;
}

function likeCard(event, likeCount) {
    event.target.classList.toggle('card__like-button_is-active')
    const likesCounter = event.target.nextElementSibling;
    likesCounter.textContent = likeCount;
}

function isCardLiked(event) {
    return event.target.classList.contains('card__like-button_is-active');
}

function removeCard(card) {
    card.remove();
}

export { createCard, likeCard, isCardLiked, removeCard };