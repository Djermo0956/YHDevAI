// Particle generation for interactive background
const numParticles = 100; // Number of particles
const backgroundDiv = document.createElement('div');
backgroundDiv.className = 'background';
document.body.appendChild(backgroundDiv); // Append the background div to the body

for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 10 + 5; // Random size between 5px and 15px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.top = `${Math.random() * 100}vh`; // Random vertical position
    particle.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    particle.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random duration between 5s and 10s
    backgroundDiv.appendChild(particle);
}

// Load products and display them
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById('product-list');
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('border', 'p-4', 'bg-white', 'rounded', 'product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="mb-4">
                <h3 class="text-lg font-semibold">${product.name}</h3>
                <p class="text-gray-700">${product.description}</p>
                <p class="text-blue-500 font-bold">$${product.price.toFixed(2)}</p>
                <a href="product.html?id=${product.id}" class="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">View</a>
            `;
            productList.appendChild(productCard);
        });
    });

// Load product details
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
if (productId) {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);
            const productDetails = document.getElementById('product-details');
            productDetails.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="mb-4">
                <h2 class="text-2xl font-bold">${product.name}</h2>
                <p class="text-gray-700">${product.description}</p>
                <p class="text-blue-500 font-bold">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">Add to Cart</button>
            `;
        });
}

// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
    const product = cart.find(item => item.id == id);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ id, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    if (cart.length == 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const product = products.find(p => p.id == item.id);
            const cartItem = document.createElement('div');
            cartItem.classList.add('border', 'p-4', 'bg-white', 'rounded', 'mb-4');
            cartItem.innerHTML = `
                <h3 class="text-lg font-semibold">${product.name}</h3>
                <p class="text-gray-700">Quantity: ${item.quantity}</p>
                <p class="text-blue-500 font-bold">$${(product.price * item.quantity).toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})" class="bg-red-500 text-white px-4 py-2 rounded mt-4">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });
    }
}

document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'index.html';
});

if (document.getElementById('cart-items')) {
    displayCart();
}
