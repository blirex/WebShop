function toggleCartStatus() {
  const cartItems = document.getElementById('cart-items');
  const emptyBlock = document.querySelector('.cart-empty');
  const checkoutBtn = document.querySelector('.checkout');

  if (cartItems.children.length === 0) {
    emptyBlock.style.display = 'block';
    checkoutBtn.style.display = 'none';
  } else {
    emptyBlock.style.display = 'none';
    checkoutBtn.style.display = 'block';
  }
}

function calcCartPrice() {
  const cartItems = document.querySelectorAll('.cart-item');
  const totalPriceEl = document.querySelector('.total-price');
  let totalPrice = 0;

  cartItems.forEach(item => {
    const price = parseInt(
      item.querySelector('.cart-price').dataset.price
    );
    const count = parseInt(
      item.querySelector('[data-counter]').innerText
    );
    totalPrice += price * count;
  });

  totalPriceEl.innerText = totalPrice;
}

window.addEventListener('click', function (event) {

  // + / -
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
      } else if (event.target.closest('.cart-item')) {
        event.target.closest('.cart-item').remove();
      }
    }

    toggleCartStatus();
    calcCartPrice();
  }

  if (event.target.hasAttribute('data-cart')) {

    const card = event.target.closest('.product-card');

    const productInfo = {
      id: card.querySelector('.product-title').innerText,
      title: card.querySelector('.product-title').innerText,
      price: card.querySelector('.price').dataset.price,
      img: card.querySelector('.product-img').src,
      count: parseInt(card.querySelector('[data-counter]').innerText)
    };

    const cartItems = document.getElementById('cart-items');

    const existingItem = [...cartItems.children].find(
      item => item.dataset.id === productInfo.id
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
            <span class="cart-price" data-price="${productInfo.price}">
              ${productInfo.price} грн
            </span>
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

    toggleCartStatus();
    calcCartPrice();
  }
});

toggleCartStatus();
