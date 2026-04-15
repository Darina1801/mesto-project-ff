function onAppearPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', keyHandler);
}

function onClosePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keyHandler);
}

function keyHandler(event) {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        if (popup) {
            onClosePopup(popup);
        }
    }
}

function mouseHandler(event) {
    if (event.target.classList.contains('popup_is-opened')) {
        onClosePopup(event.target);
    } else if (event.target.classList.contains('popup__close')) {
        onClosePopup(event.target.closest('.popup'));
    }
}

export { onAppearPopup, onClosePopup, mouseHandler };