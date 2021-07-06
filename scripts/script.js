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
    console.log(scrollWidth);
};

const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.dbScrollY,
    })
};

//cart modal 

subheaderCart.addEventListener('click', () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
})

cartOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
        cartOverlay.classList.remove('cart-overlay-open');
        enableScroll();
    }
})