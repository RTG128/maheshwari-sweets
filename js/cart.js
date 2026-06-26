document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.stop();
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
                    <span class="p-price">Rs.${p.price}</span>
                    <div id="btn-container-${p.id}">${buttonHTML}</div>
                </div>
            </div>
        </div>`;
    }).join('');
}

// Suggestion Rules — category ke basis pe suggest karo
// Chinese add karo → Samosa suggest
// Breakfast add karo → Gulab Jamun suggest
// Rolls add karo → Jalebi suggest
// Thali add karo → Gulab Jamun suggest
// Snacks add karo → Veg Chowmein suggest
// Veg-Main add karo → Jalebi suggest
// Non-Veg add karo → Sponge Rasgulla suggest
// Sweets add karo → Chhola Bhatura suggest
const SUGGESTION_RULES = {
    'Chinese':   'br-09',
    'Breakfast': 'sw-01',
    'Rolls':     'br-13',
    'Thali':     'sw-01',
    'Snacks':    'ch-01',
    'Veg-Main':  'br-13',
    'Non-Veg':   'sw-02',
    'Sweets':    'br-01'
};

function showSuggestionPopup(addedProduct) {
    const existing = document.getElementById('suggestion-popup');
    if (existing) existing.remove();

    const suggestId = SUGGESTION_RULES[addedProduct.category];
    if (!suggestId) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const alreadyInCart = cart.find(i => i.id === suggestId);
    if (alreadyInCart) return;

    const item = products.find(p => p.id === suggestId);
    if (!item) return;

    const popup = document.createElement('div');
    popup.id = 'suggestion-popup';
    popup.style.cssText = `
        position: fixed;
        bottom: 90px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        border: 2px solid #d4af37;
        border-radius: 16px;
        padding: 14px 16px;
        width: 88%;
        max-width: 400px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        z-index: 3000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        animation: slideUp 0.3s ease;
    `;

    popup.innerHTML = `
        <style>
            @keyframes slideUp {
                from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                to   { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
        </style>
        <div style="flex:1;">
            <div style="font-size:0.7rem; color:#800000; font-weight:700; text-transform:uppercase; margin-bottom:3px;">Aapko Pasand Aayega</div>
            <div style="font-size:0.95rem; font-weight:700; color:#333;">${item.name}</div>
            <div style="font-size:0.85rem; color:#800000; font-weight:800;">Rs.${item.price}</div>
        </div>
        <button onclick="handleCartUpdate('${item.id}', 'ADD'); document.getElementById('suggestion-popup').remove();"
            style="background:#800000; color:white; border:none; padding:10px 16px; border-radius:10px; font-weight:700; cursor:pointer; font-size:0.85rem; white-space:nowrap;">
            Add +
        </button>
        <button onclick="document.getElementById('suggestion-popup').remove();"
            style="background:#f0f0f0; color:#555; border:none; padding:10px 12px; border-radius:10px; font-weight:700; cursor:pointer; font-size:0.85rem;">
            X
        </button>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {
        const p = document.getElementById('suggestion-popup');
        if (p) p.remove();
    }, 4000);
}

function handleCartUpdate(productId, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const itemIndex = cart.findIndex(item => item.id === productId);

    if (action === 'ADD') {
        if (itemIndex > -1) cart[itemIndex].quantity += 1;
        else {
            cart.push({ ...product, quantity: 1 });
            showSuggestionPopup(product);
        }
    } else {
        if (itemIndex > -1) {
            if (cart[itemIndex].quantity > 1) cart[itemIndex].quantity -= 1;
            else cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();

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
        if (cartTotal) cartTotal.innerText = 'Rs.' + totalPrice;

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