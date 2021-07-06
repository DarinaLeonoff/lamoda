const headerCityButton = document.querySelector('.header__city-button'),
    subheaderCart = document.querySelector('.subheader__cart'),
    cartOverlay = document.querySelector('.cart-overlay');


//city-button

headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?';

headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city)
})

//cart modal 

subheaderCart.addEventListener('click', () => {
    cartOverlay.classList.add('cart-overlay-open');
})

cartOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
        cartOverlay.classList.remove('cart-overlay-open');
    }
})