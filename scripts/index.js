import { cartModalOpen, cartModalClose } from './module.js';
import pageCagory from './pageCategory.js';
import pageCardGood from './pageCardGood.js';
import { getLocalStorage, setLocalStorage } from './localStorage.js';

let hash = location.hash.substring(1); //#hash

pageCagory(hash);
pageCardGood(hash);

//city-button

const headerCityButton = document.querySelector('.header__city-button');
const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

// cart calculating goods

const declOfNum = (n, titles, from) => {
    return n + ' ' + titles[from ? n % 10 === 1 && n % 100 !== 11 ? 1 : 2 : n % 10 === 1 && n % 100 !== 11 ?
        0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

export const updateCountGoodsCart = () => {
    if (getLocalStorage().length) {
        subheaderCart.textContent = declOfNum(getLocalStorage().length, ['товар', 'товара', 'товаров']);
    } else {
        subheaderCart.textContent = 'Корзина';
    }
};

updateCountGoodsCart();


headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?';

headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city)
})

// cart open/close

subheaderCart.addEventListener('click', () => {
    cartModalOpen(cartOverlay)
});
cartOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
        cartModalClose(cartOverlay);
    }
});