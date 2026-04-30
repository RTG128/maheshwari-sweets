/* ============================================================
   MAHESHWARI SWEETS - FINAL STABLE LOGIC (FIXED)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Force stop loading spinner after 2.5 seconds
    setTimeout(() => {
        window.stop();
        console.log("Loading stopped to enable clicks. - cart.js:9");
    }, 2500);

    if (typeof products !== 'undefined') {
        renderProducts(products);
    }
    setupFilters();
    updateCartUI();
});

function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    grid.innerHTML = items.map(p => {
        const cartItem = cart.find(item => item.id === p.id);
        const qty = cartItem ? cartItem.quantity : 0;

        let buttonHTML = qty > 0 ? `
            <div class="qty-selector" style="display:flex; align-items:center; gap:8px; background:#f0f0f0; border-radius:8px; padding:2px 8px;">
                <button onclick="handleCartUpdate('${p.id}', 'REMOVE')" style="border:none; background:none; font-weight:bold; cursor:pointer; color:#800000;">-</button>
                <span style="font-weight:bold;">${qty}</span>
                <button onclick="handleCartUpdate('${p.id}', 'ADD')" style="border:none; background:none; font-weight:bold; cursor:pointer; color:#800000;">+</button>
            </div>
        ` : `<button class="add-btn" onclick="handleCartUpdate('${p.id}', 'ADD')">+</button>`;

        return `
        <div class="product-card">
            <div class="img-box">
                <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/300x200?text=Food'">
            </div>
            <div class="product-info">
                <span class="cat-label">${p.category}</span>
                <h3 class="p-name">${p.name}</h3>
                <div class="price-row">
                    <span class="p-price">₹${p.price}</span>
                    <div id="btn-container-${p.id}">${buttonHTML}</div>
                </div>
            </div>
        </div>`;
    }).join('');
}

function handleCartUpdate(productId, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const itemIndex = cart.findIndex(item => item.id === productId);

    if (action === 'ADD') {
        if (itemIndex > -1) cart[itemIndex].quantity += 1;
        else cart.push({ ...product, quantity: 1 });
    } else {
        if (itemIndex > -1) {
            if (cart[itemIndex].quantity > 1) cart[itemIndex].quantity -= 1;
            else cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    
    // Refresh only the items currently on screen
    const currentFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'All';
    const filteredItems = (currentFilter === 'All') ? products : products.filter(p => p.category === currentFilter);
    renderProducts(filteredItems);
}

function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBar = document.getElementById('floatingCartBar');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartBar) return;

    if (cart.length > 0) {
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartBar.style.display = 'flex';
        if (cartCount) cartCount.innerText = totalQty;
        if (cartTotal) cartTotal.innerText = `₹${totalPrice}`;
        
        // Min order ₹100 color logic
        cartBar.style.background = totalPrice < 100 ? "#555" : "#800000";
    } else {
        cartBar.style.display = 'none';
    }
}

function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filtered = btn.dataset.filter === 'All' ? products : products.filter(p => p.category === btn.dataset.filter);
            renderProducts(filtered);
        };
    });
}

window.handleCartUpdate = handleCartUpdate;