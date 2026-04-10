import './pages/index.css';

import { initialCards } from './scripts/cards';
import { renderCard, removeCard, likeCard } from './scripts/card';
import { onAppearPopup, onClosePopup } from './scripts/modal';

const cardsList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const imageCardPopup = document.querySelector('.popup_type_image');
const newCardFormPopup = document.querySelector('.popup_type_new-card');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = document.forms['edit-profile'];
const addNewPlaceForm = document.forms['new-place'];

function renderCards(cards) {
    cards.forEach((element) => {
        cardsList.appendChild(renderCard(element, removeCard, likeCard, addImagePopupHandler));
    });
}

function addImagePopupHandler(element) {
    const cardPopupImage = imageCardPopup.querySelector('.popup__image');
    cardPopupImage.src = element.target.src;
    cardPopupImage.alt = element.target.alt;
    onAppearPopup(imageCardPopup);
}

renderCards(initialCards);

addButton.addEventListener('click', () => { 
    onAppearPopup(newCardFormPopup);
});

popupCloseButton.addEventListener('click', () => {
    onClosePopup(newCardFormPopup);
});

addNewPlaceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newCard = {
        name: addNewPlaceForm.elements['place-name'].value,
        link: addNewPlaceForm.elements.link.value
    };

    const newCardNode = renderCard(newCard, removeCard, likeCard, addImagePopupHandler);
    cardsList.prepend(newCardNode);
    addNewPlaceForm.reset();
    onClosePopup(newCardFormPopup);
});

profileEditButton.addEventListener('click', () => {
    editProfileForm.elements.name.value = profileTitle.innerText;
    editProfileForm.elements.description.value = profileDescription.innerText;
    onAppearPopup(profileEditPopup);
});

function handleEditProfileFormSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = editProfileForm.elements.name.value;
    profileDescription.textContent = editProfileForm.elements.description.value;
    onClosePopup(profileEditPopup);
}

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);