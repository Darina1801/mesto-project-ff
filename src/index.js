import './pages/index.css';

import { onAppearPopup, onClosePopup } from './scripts/modal';
import { createCard, likeCard as changeCardLike, removeCard } from './scripts/card'; 
import { enableValidation, clearValidation } from './scripts/validation';
import { getUserData, getCards, editProfile, addCard, deleteCard, likeCard, dislikeCard, setAvatar } from './scripts/api';

const cardsList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const avatarEditPopup = document.querySelector('.popup_type_edit-avatar');
const imageCardPopup = document.querySelector('.popup_type_image');
const newCardFormPopup = document.querySelector('.popup_type_new-card');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const EDIT_PROFILE_FORM_NAME = 'edit-profile';
const ADD_NEW_PLACE_FORM_NAME = 'new-place';
const EDIT_AVATAR_FORM_NAME = 'edit-avatar';
const editProfileForm = document.forms[EDIT_PROFILE_FORM_NAME];
const addNewPlaceForm = document.forms[ADD_NEW_PLACE_FORM_NAME];
const editAvatarForm = document.forms[EDIT_AVATAR_FORM_NAME];
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

let profileUserId;

function onLikeCard(event, cardId) {
    const isLiked = event.target.classList.contains('card__like-button_is-active');
    const likeMethod = isLiked ? dislikeCard : likeCard; 
    likeMethod(cardId) 
        .then((card) => { 
            changeCardLike(event, card.likes.length);
        }) 
        .catch((error) => console.error(error));
}

function onDeleteCard(card, cardId) {
    deleteCard(cardId) 
        .then(() => { 
            removeCard(card);
        }) 
        .catch((error) => console.error(error));
}

function updateProfile(profile) {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileImage.style.backgroundImage = `url(${profile.avatar})`;
}

function resetForm(form) {
    form.reset();
    clearValidation(form, validationConfig);
  }

function renderCards(cards, userId) {
    cards.forEach((element) => {
        cardsList.appendChild(createCard(element, userId, onDeleteCard, onLikeCard, addImagePopupHandler));
    });
}

function addImagePopupHandler(element) {
    const cardPopupImage = imageCardPopup.querySelector('.popup__image');
    const cardPopupCaption = imageCardPopup.querySelector('.popup__caption');
    cardPopupImage.src = element.target.src;
    cardPopupImage.alt = element.target.alt;
    cardPopupCaption.textContent = element.target.alt;
    onAppearPopup(imageCardPopup);
}

addButton.addEventListener('click', () => { 
    onAppearPopup(newCardFormPopup);
});

popupCloseButton.addEventListener('click', () => {
    onClosePopup(newCardFormPopup);
});

addNewPlaceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const popupButton = addNewPlaceForm.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';
    const newCard = {
        name: addNewPlaceForm.elements['place-name'].value,
        link: addNewPlaceForm.elements.link.value
    };

    addCard(newCard)
        .then((card) => { 
            const newCardNode = createCard(card, profileUserId, onDeleteCard, onLikeCard, addImagePopupHandler);
            cardsList.prepend(newCardNode);
        })
        .finally(() => {
            resetForm(addNewPlaceForm);
        });
    onClosePopup(newCardFormPopup);
});

profileEditButton.addEventListener('click', () => {
    editProfileForm.elements['edit-name'].value = profileTitle.innerText;
    editProfileForm.elements.description.value = profileDescription.innerText;
    onAppearPopup(profileEditPopup);
});

editProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const popupButton = editProfileForm.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';
    const name = editProfileForm.elements['edit-name'].value;
    const description = editProfileForm.elements.description.value;
    
    editProfile(name, description)
        .then(() => getUserData())
        .then((profile) => updateProfile(profile))
        .finally(() => {
            resetForm(editProfileForm);
        });
    onClosePopup(profileEditPopup);
});

function setAvatarListener() {
    profileImage.addEventListener('click', () => {
        onAppearPopup(avatarEditPopup);
    });
}
setAvatarListener();

editAvatarForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const popupButton = editAvatarForm.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';
    const avatarLink = editAvatarForm.avatar.value;
    setAvatar(avatarLink).then((profile) => updateProfile(profile));   
    onClosePopup(avatarEditPopup);
});

Promise.all([getUserData(), getCards()])
    .then(([profile, cards]) => {
        profileUserId = profile._id;
        updateProfile(profile);
        renderCards(cards, profileUserId);
    })
    .catch((error) => console.error(error));

enableValidation(validationConfig);