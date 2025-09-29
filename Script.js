let cart = [];

// Add item to cart
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    updateCartUI(id);
    updateCartSummary();
    showNotification(${name} has been added to your cart.);
}

// Remove item from cart
function removeFromCart(id) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== id);
        }
    }
    
    updateCartUI(id);
    updateCartSummary();
    
    const item = cart.find(item => item.id === id);
    const itemName = item ? item.name : 'Item';
    showNotification(${itemName} has been removed from your cart.);
}

// Update cart UI for specific product
function updateCartUI(productId) {
    const item = cart.find(item => item.id === productId);
    const quantity = item ? item.quantity : 0;
    
    const addButton = document.querySelector([onclick*="addToCart('${productId}'"]);
    const removeButton = document.querySelector([onclick*="removeFromCart('${productId}'"]);
    const quantitySpan = document.getElementById(quantity-${productId});
    
    if (quantity > 0) {
        if (removeButton) removeButton.style.display = 'inline-block';
        if (quantitySpan) {
            quantitySpan.style.display = 'inline-block';
            quantitySpan.textContent = ${quantity} in cart;
        }
    } else {
        if (removeButton) removeButton.style.display = 'none';
        if (quantitySpan) quantitySpan.style.display = 'none';
    }
}

// Update cart summary
function updateCartSummary() {
    const cartSummary = document.getElementById('cart-summary');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartSummary.style.display = 'none';
        return;
    }
    
    // Clear current items
    cartItems.innerHTML = '';
    
    // Add each item to cart display
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>₱${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="btn btn-remove" onclick="removeFromCart('${item.id}')">-</button>
        `;
        cartItems.appendChild(itemDiv);
    });
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    // Show cart if items exist
    if (cart.length > 0) {
        cartSummary.style.display = 'flex';
    }
}

// Toggle cart visibility
function toggleCart() {
    const cartSummary = document.getElementById('cart-summary');
    if (cart.length > 0) {
        cartSummary.style.display = cartSummary.style.display === 'none' ? 'flex' : 'none';
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(Thank you for your order! Total: ₱${total.toFixed(2)});
    
    // Clear cart
    cart = [];
    updateCartSummary();
    
    // Update all product UIs
    document.querySelectorAll('[id^="quantity-"]').forEach(span => {
        span.style.display = 'none';
    });
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.style.display = 'none';
    });
}

// Notification system
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }}
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--heritage-red);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-heritage);
        z-index: 3000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform})