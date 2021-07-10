//city-button
const headerCityButton = document.querySelector('.header__city-button');
const cartListGoods = document.querySelector('.cart__list-goods');

let hash = location.hash.substring(1); //#hash

headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?';

headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city)
})

//cart parsing 
const getLocalStorage = () => JSON.parse(localStorage.getItem('cart-lomoda')) || [];
const setLocalStrage = data => localStorage.setItem('cart-lomoda', JSON.stringify(data));

const renderCart = () => {
        cartListGoods.textContent = '';

        const cartItem = getLocalStorage();

        cartItem.forEach((item, i) => {

                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                            <td>${i}</td>
                            <td>${item.brand} ${item.name}</td>
                            ${item.color ? `<td>${item.color}</td>` : `<td>-</td>`}
                            ${item.size ? `<td>${item.size}</td>` : `<td>-</td>`}
                            <td>${item.cost} &#8381;</td>
                            <td><button class="btn-delete" data-id="${item.id}">&times;</button></td>
                        `;
            cartListGoods.append(tr);
    })
}

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
    renderCart();
};

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    disableScroll();
};

//db query

const getData = async() => {
    const data = await fetch('db.json');

    if (data.ok) {
        return data.json()
    } else {
        throw new Error(
            `Данные не были получены, ошибка ${data.status} ${data.statusText}`
        )
    }
};

const getGoods = (callback, prop, value) => {
    getData()
        .then(data => {
            if (value) {
                callback(data.filter(item => item[prop] === value))
            } else {
                callback(data);
            }
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



//page constructor 

try {
    const goodsList = document.querySelector('.goods__list');


    if (!goodsList) {
        throw 'this is not a goods page!';
    }

    // title changing 

    const goodsTitle = document.querySelector('.goods__title');
    const changeTitle = () => {
        goodsTitle.textContent = document.querySelector(`[href*="#${hash}"]`).textContent;

        // if (hash === 'men') {
        //     title.textContent = 'Мужчинам'
        // } else if (hash === 'women') {
        //     title.textContent = 'Женщинам'
        // } else if (hash === 'kids') {
        //     title.textContent = 'Детям'
        // };
    };

    const createCard = ({ id, preview, cost, brand, name, sizes }) => {

            // destructuring assignment
            // ^
            // const { id, preview, cost, brand, name, sizes } = data;
            // ^
            // const id = data.id;
            // const preview = data.preview;
            // const cost = data.cost;
            // const brand = data.brand;
            // const name = data.name;
            // const sizes = data.sizes;

            const li = document.createElement('li');
            li.classList.add('goods__item');
            li.innerHTML = `
        <article class="good">
            <a class="good__link-img" href="card-good.html#${id}">
                <img class="good__img" src="goods-image/${preview}" alt="">
            </a>
            <div class="good__description">
                <p class="good__price">${cost} &#8381;</p>
                <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                ${sizes ? 
                    `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>` :
                    ''}
                <a class="good__link" href="card-good.html#id56454">Подробнее</a>
            </div>
        </article>
        `
        return li;
    };

    const renderGoodsList = data => {
        goodsList.textContent = '';
        changeTitle();

        data.forEach(item => {
            const card = createCard(item);
            goodsList.append(card);
        });

        window.addEventListener('hashchange', () => {
            hash = location.hash.substring(1);
            
            getGoods(renderGoodsList, 'category', hash);
        });
    };

    getGoods(renderGoodsList, 'category', hash);
} catch (err) {
    console.warn(err);
}

// good-page constructor

try {
    
    if (!document.querySelector('.card-good')) {
         throw 'this is not a card-good page!';
    }

    const cardGoodImage = document.querySelector('.card-good__image');
    const cardGoodBrand = document.querySelector('.card-good__brand');
    const cardGoodTitle = document.querySelector('.card-good__title');
    const cardGoodPrice = document.querySelector('.card-good__price');
    const cardGoodColor = document.querySelector('.card-good__color');
    const cardGoodColorList = document.querySelector('.card-good__color-list');
    const cardGoodSizes = document.querySelector('.card-good__sizes');
    const cardGoodSizesList = document.querySelector('.card-good__sizes-list');
    const cardGoodBuy = document.querySelector('.card-good__buy');
    const cardGoodSelectWrapper = document.querySelectorAll('.card-good__select__wrapper');

    const generateList = data => data.reduce((html, item, i) => html +
        `<li class="card-good__select-item" data-id="${i}">${item}</li>`,
    '');

    const renderCardGood = ([{ brand, name, cost, color, sizes, photo }]) => {

        const data = { brand, name, cost, id };
            
        cardGoodImage.src = `goods-image/${photo}`;
        cardGoodImage.alt = `${brand} ${name}`;
        cardGoodBrand.textContent = brand;
        cardGoodTitle.textContent = name;
        cardGoodPrice.textContent = `${cost} ₽`;
        if (color) {
            cardGoodColor.textContent = color[0];
            cardGoodColor.dataset.id = 0;
            cardGoodColorList.innerHTML = generateList(color);
        } else {
            cardGoodColor.style.display = 'none';
        }
        if (sizes) {
            cardGoodSizes.textContent = sizes[0];
            cardGoodSizes.dataset.id = 0;
            cardGoodSizesList.innerHTML = generateList(sizes);
        } else {
            cardGoodSizes.style.display = 'none';
        };
        cardGoodBuy.addEventListener('click', () => {
            if (color) data.color = cardGoodColor.textContent;
            if (sizes) data.sizes = cardGoodSizes.textContent;

            const cartData = getLocalStorage();
            cartData.push(data);
            setLocalStrage(cartData);
        });
    };

    cardGoodSelectWrapper.forEach(item => {
        item.addEventListener('click', e => {
            const target = e.target;

            if (target.closest('.card-good__select')) {
                target.classList.toggle('card-good__select__open');
            }

            if (target.closest('.card-good__select-item')) {
                const cardGoodSelect = item.querySelector('.card-good__select');
                cardGoodSelect.textContent = target.textConent;
                cardGoodSelect.dataset.id = target.dataset.id;
                cardGoodSelect.classList.remove('card-good__select__open');
            }
        })
    })
    
    

    getGoods(renderCardGood, 'id', hash)
   
} catch (err) {
    console.warn(err)
}