//city-button
const headerCityButton = document.querySelector('.header__city-button');

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
};

const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.dbScrollY,
    })
};

//cart modal 
const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
};

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    disableScroll();
};

//db query

const getData = async() => {
    const data = await fetch('db2.json');

    if (data.ok) {
        return data.json()
    } else {
        throw new Error(
            `Данные не были получены, ошибка ${data.status} ${data.statusText}`
        )
    }
};

const getGoods = callback => {
    getData()
        .then(data => {
            callback(data);
        })
        .catch(err => {
            console.log(err);
        })
}


// cart open/close

subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
        cartModalClose();
    }
});

document.addEventListener('keydown', e => {
    if (e.key == 'Escape') {
        cartModalClose();
    }
});