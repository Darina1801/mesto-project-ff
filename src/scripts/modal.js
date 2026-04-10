function onAppearPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', keyHandler);
    document.addEventListener('mousedown', mouseHandler);
}

function onClosePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keyHandler);
    document.removeEventListener('mousedown', mouseHandler);
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
    if (event.target.classList.contains('popup_is-opened') || event.target.classList.contains('popup__close')) {
        const popup = document.querySelector('.popup_is-opened');
        onClosePopup(popup);
    }
}

export { onAppearPopup, onClosePopup };