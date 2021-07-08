//city-button
const headerCityButton = document.querySelector('.header__city-button');

let hash = location.hash.substring(1); //#hash

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
    const data = await fetch('db.json');

    if (data.ok) {
        return data.json()
    } else {
        throw new Error(
            `Данные не были получены, ошибка ${data.status} ${data.statusText}`
        )
    }
};

const getGoods = (callback, value) => {
    getData()
        .then(data => {
            if (value) {
                callback(data.filter(item => item.category === value))
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

//card constructor 

try {
    const goodsList = document.querySelector('.goods__list');


    if (!goodsList) {
        throw 'this is not a goods page!';
    }

    const categoryName = hash => {
        const title = document.querySelector('.goods__title');
        if (hash === 'men') {
            title.textContent = 'Мужчинам'
        } else if (hash === 'women') {
            title.textContent = 'Женщинам'
        } else if (hash === 'kids') {
            title.textContent = 'Детям'
        };
    }

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
        categoryName(hash);
        
        data.forEach(item => {
            const card = createCard(item);
            goodsList.append(card);
        });

        window.addEventListener('hashchange', () => {
            hash = location.hash.substring(1);
            
            getGoods(renderGoodsList, hash);
        });
    };

    getGoods(renderGoodsList, hash);
} catch (err) {
    console.warn(err);
}