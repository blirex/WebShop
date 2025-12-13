window.addEventListener('click', function (event) {

  if (event.target.dataset.action === 'plus' ||
      event.target.dataset.action === 'minus') {

    const counterWrapper = event.target.closest('.counter-wrapper');
    if (!counterWrapper) return;

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

  if (event.target.hasAttribute('data-cart')) {

    const card = event.target.closest('.product-card');

    const productInfo = {
      id: card.querySelector('.product-title').innerText,
      title: card.querySelector('.product-title').innerText,
      price: card.querySelector('.price').innerText,
      img: card.querySelector('.product-img').getAttribute('src'),
      count: parseInt(card.querySelector('[data-counter]').innerText)
    };

    const cartItems = document.getElementById('cart-items');

    const existingItem = [...cartItems.children].find(item =>
      item.dataset.id === productInfo.id
    );

    if (existingItem) {
      const countEl = existingItem.querySelector('[data-counter]');
      countEl.innerText = parseInt(countEl.innerText) + productInfo.count;
    } else {
      const cartItemHTML = `
        <li class="cart-item" data-id="${productInfo.id}">
          <img src="${productInfo.img}">
          <div class="cart-info">
            <strong>${productInfo.title}</strong><br>
            ${productInfo.price} грн
          </div>
          <div class="items counter-wrapper">
            <div class="items_control" data-action="minus">-</div>
            <div class="items_current" data-counter>${productInfo.count}</div>
            <div class="items_control" data-action="plus">+</div>
          </div>
        </li>
      `;
      cartItems.insertAdjacentHTML('beforeend', cartItemHTML);
    }

    card.querySelector('[data-counter]').innerText = '1';
  }

  if (
    event.target.dataset.action === 'minus' &&
    event.target.closest('.cart')
  ) {
    const counterWrapper = event.target.closest('.counter-wrapper');
    const counter = counterWrapper.querySelector('[data-counter]');

    if (counter.innerText > 1) {
      counter.innerText = --counter.innerText;
    } else {
      event.target.closest('.cart-item').remove();
    }
  }
});
