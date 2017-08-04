'use strict';

const Shop = (() => {
    const getProducts = onload => {
        const xhr = new XMLHttpRequest;
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            if ( xhr.readyState !== 4 ) {
                return;
            }
            onload( xhr.response );
        };
        xhr.open( 'GET', 'server/data/products.json' );
        xhr.send();
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
        renderProducts: renderProducts
    };
})(),
    container = document.getElementById ( 'products-container' );

Shop.getProducts( data => Shop.renderProducts({
    element: container,
    data: data
}));
