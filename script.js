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
            const productCard = createProductCard(product);
            productList.appendChild(productCard);
        });
    });

// Function to create product card
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('border', 'p-4', 'bg-gray-800', 'rounded', 'product-card');
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="mb-4">
        <h3 class="text-lg font-semibold">${product.name}</h3>
        <p class="text-gray-400">${product.description}</p>
        <p class="text-orange-400 font-bold">$${product.price.toFixed(2)}</p>
        <a href="product.html?id=${product.id}" class="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">View</a>
    `;
    return productCard;
}

// Load product details if in product page
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
                <p class="text-gray-400">${product.description}</p>
                <p class="text-orange-400 font-bold">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">Add to Cart</button>
            `;
        });
}

// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart function
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

// Remove from cart function
function removeFromCart(id) {
    cart = cart.filter(item => item.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Display cart function
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const product = products.find(p => p.id == item.id);
            const cartItem = document.createElement('div');
            cartItem.classList.add('border', 'p-4', 'bg-gray-800', 'rounded', 'mb-4');
            cartItem.innerHTML = `
                <h3 class="text-lg font-semibold">${product.name}</h3>
                <p class="text-gray-400">Quantity: ${item.quantity}</p>
                <p class="text-orange-400 font-bold">$${(product.price * item.quantity).toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})" class="bg-red-500 text-white px-4 py-2 rounded mt-4">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });
    }
}

// Checkout form submission
document.getElementById('checkout-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'index.html';
});

// Display cart if cart-items element exists
if (document.getElementById('cart-items')) {
    displayCart();
}

// Mouse Movement Interaction for Shapes
const shapesContainer = document.createElement('div');
shapesContainer.className = 'shapes-container';
document.body.appendChild(shapesContainer);

// Create shapes
for (let i = 0; i < 10; i++) {
    const shape = document.createElement('div');
    shape.className = 'shape';
    shape.style.width = `${Math.random() * 100 + 50}px`; // Random size
    shape.style.height = shape.style.width; // Keep it a square
    shape.style.top = `${Math.random() * 100}vh`;
    shape.style.left = `${Math.random() * 100}vw`;
    shapesContainer.appendChild(shape);
}

// Mouse movement effect
document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach(shape => {
        const rect = shape.getBoundingClientRect();
        const dx = clientX - (rect.left + rect.width / 2);
        const dy = clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scale = Math.max(1 - distance / 400, 0.5); // Scale based on distance
        shape.style.transform = `scale(${scale}) translate(${dx / 20}px, ${dy / 20}px)`;
    });
});
