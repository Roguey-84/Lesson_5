'use strict';

const Shop = (() => {
    const getProducts = onload => {
        const xhr = new XMLHttpRequest;
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            if ( xhr.readyState !== 4 || xhr.status !== 200 ) {
                return;
            }
            onload( xhr.response );
        };
        xhr.open( 'GET', 'data/products.json' );
        xhr.send();
    },
        addProduct = ( id, onload ) => {
            const xhr = new XMLHttpRequest,
                form = new FormData;

            form.append( 'id', id );
            form.append( 'quantity', 1 );
            xhr.responseType = 'json';
            xhr.onreadystatechange = () => {
                if ( xhr.readyState !== 4 ) {
                    return;
                }
                onload( xhr.response );
            };
            xhr.open( 'POST', 'data/add.json' );
            xhr.send( form );
        },
        removeProduct = ( id, onload ) => {
            const xhr = new XMLHttpRequest,
                form = new FormData;

            form.append( 'id', id );
            xhr.responseType = 'json';
            xhr.onreadystatechange = () => {
                if ( xhr.readyState !== 4 ) {
                    return;
                }
                onload( xhr.response );
            };
            xhr.open( 'POST', 'data/add.json' );
            xhr.send( form );
        },
        getBasket = onload => {
            const xhr = new XMLHttpRequest;
            xhr.responseType = 'json';
            xhr.onreadystatechange = () => {
                if ( xhr.readyState !== 4 || xhr.status !== 200 ) {
                    return;
                }
                onload( xhr.response );
            };
            xhr.open( 'GET', 'data/get.json' );
            xhr.send();
        },
        renderBasket = options => {
            const element = options.container.querySelector( '.basket__list' ),
                data = options.data;
            for (let i = 0, len = data.length; i < len; i++) {
                const {title, price, id} = data[i],
                    productElement = document.createElement('div'),
                    productTitle = document.createElement('h3'),
                    productPrice = document.createElement('div'),
                    productButton = document.createElement('button');

                productElement.className = 'basket__item';
                productTitle.textContent = title;
                productPrice.textContent = price;

                productButton.className = 'basket__item-delete';
                productButton.type = 'button';
                productButton.textContent = 'Удалить';
                productButton.dataset.id = id;

                productElement.appendChild(productTitle);
                productElement.appendChild(productPrice);
                productElement.appendChild(productButton);

                element.appendChild(productElement);
            }
        },
        renderProducts = options => {
        const element = options.container.querySelector( '.products__list' ),
            data = options.data;
        for (let i = 0, len = data.length; i < len; i++) {
            const { title, price, id } = data[ i ],
                productElement = document.createElement( 'div' ),
                productTitle = document.createElement( 'h2' ),
                productPrice = document.createElement( 'div' ),
                productButton = document.createElement( 'button' );

            productTitle.textContent = title;
            productPrice.textContent = price;

            productButton.className = 'products__item-buy';
            productButton.type = 'button';
            productButton.textContent = 'Купить';
            productButton.dataset.id = id;

            productElement.appendChild( productTitle );
            productElement.appendChild( productPrice );
            productElement.appendChild( productButton );

            element.appendChild( productElement );
        }
    };

    return {
        getProducts: getProducts,
        renderProducts: renderProducts,
        basket: {
            render: renderBasket,
            get: getBasket,
            add: addProduct,
            remove: removeProduct
        }
    };
})(),
    container = document.getElementById ( 'products-container' );

document.addEventListener( 'click', e => {
    if ( e.target.classList.contains( 'pruducts__item-buy' )) {
        const id = e.target.dataset.id;

        Shop.basket.add( id, data => {
            alert( 'Товар успешно добавлен' );
        })
    }

    if ( e.target.classList.contains( 'basket__item-delete' )) {
        const id = e.target.dataset.id;

        Shop.basket.delete( id, data => {
            e.target.closest( '.basket__item' ).remove();
            alert( 'Товар успешно удалён' );
        })
    }
});
Shop.basket.get( data => Shop.basket.render({
    element: basket,
    data: data
}));
Shop.getProducts( data => Shop.renderProducts({
    element: container,
    data: data
}));
