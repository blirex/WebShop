window.addEventListener('click', function(event) {
  if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
    const counterWrapper = event.target.closest('.counter-wrapper');
    const counter = counterWrapper.querySelector('[data-counter]');

    if (event.target.dataset.action === 'plus') {
      counter.innerText = ++counter.innerText;
    } else if (event.target.dataset.action === 'minus') {
      if (parseInt(counter.innerText) > 1) {
        counter.innerText = --counter.innerText;
      }
    }
  }
});

const cartItems = document.getElementById('cart-items');

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('add-to-cart')) {
    const productCard = event.target.closest('.product-card');
    const productName = productCard.querySelector('h2').innerText;
    const productPrice = productCard.querySelector('p').innerText;
    const productCount = productCard.querySelector('[data-counter]').innerText;

    const li = document.createElement('li');
    li.textContent = `${productName} (${productPrice}) - Кількість: ${productCount}`;
    cartItems.appendChild(li);
  }
});