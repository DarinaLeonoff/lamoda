import { renderCart } from './cart.js'

//scroll

const disableScroll = () => {
    const scrollWidth = window.innerWidth - document.body.offsetWidth;
    document.body.dbScrollY = window.scrollY;
    document.body.style.cssText = `
    position: fixed;
    top: ${-window.scrollY}px;
    width: 100%;
    height: 1vh;
    overflow: hidden;
    padding-right: ${scrollWidth}px; 
    `;
};

const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.dbScrollY,
    })
};

//cart modal 

export const cartModalOpen = overlay => {
    overlay.classList.add('cart-overlay-open');
    disableScroll();
    renderCart();
};

export const cartModalClose = overlay => {
    overlay.classList.remove('cart-overlay-open');
    disableScroll();
};

document.addEventListener('keydown', e => {
    if (e.key == 'Escape') {
        cartModalClose();
    }
});