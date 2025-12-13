window.addEventListener('click', function (event) {

  /* ===== ЛІЧИЛЬНИК ===== */
  if (event.target.dataset.action === 'plus' ||
      event.target.dataset.action === 'minus') {

    const counterWrapper = event.target.closest('.counter-wrapper');
    const counter = counterWrapper.querySelector('[data-counter]');

    if (event.target.dataset.action === 'plus') {
      counter.innerText = ++counter.innerText;
    }

    if (event.target.dataset.action === 'minus') {
      if (counter.innerText > 1) {
        counter.innerText = --counter.innerText;
      }
    }
  }

  /* ===== ДОДАВАННЯ В КОШИК ===== */
  if (event.target.hasAttribute('data-cart')) {

    const card = event.target.closest('.product-card');

    const productInfo = {
      id: card.querySelector('.product-title').innerText,
      title: card.querySelector('.product-title').innerText,
      price: parseInt(card.querySelector('.price').innerText),
      count: parseInt(card.querySelector('[data-counter]').innerText),
      img: card.querySelector('img').getAttribute('src')
    };

    const cartItems = document.getElementById('cart-items');

    const existingItem = [...cartItems.children].find(item =>
      item.dataset.id === productInfo.id
    );

    if (existingItem) {
      const countEl = existingItem.querySelector('.cart-count');
      countEl.innerText =
        parseInt(countEl.innerText) + productInfo.count;
    } else {
      const cartItemHTML = `
        <li class="cart-item" data-id="${productInfo.id}">
          <img src="${productInfo.img}">
          <div>
            <strong>${productInfo.title}</strong><br>
            ${productInfo.price} грн<br>
            Кількість: <span class="cart-count">${productInfo.count}</span>
          </div>
        </li>
      `;
      cartItems.insertAdjacentHTML('beforeend', cartItemHTML);
    }

    // Скидання лічильника
    card.querySelector('[data-counter]').innerText = '1';
  }
});
