const cardTemplate = document.querySelector('#card-template').content;

function createCard(element, removeCard, likeCard, addImagePopupHandler) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const title = card.querySelector('.card__title');
    const image = card.querySelector('.card__image');

    title.textContent = element.name;
    image.src = element.link;
    image.alt = element.name;
    image.addEventListener('click', addImagePopupHandler);

    const deleteButton = card.querySelector('.card__delete-button'); 
    deleteButton.addEventListener('click', removeCard);
    const likeButton = card.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCard);
    return card;
}

// Функция удаления карточки
function removeCard(event) {
    event.target.closest('.card').remove();
}

function likeCard(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

export { createCard as renderCard, removeCard, likeCard };