/* ===================================
   MAHESHWARI SWEETS - UTILITY FUNCTIONS
   Updated: Item Removal & Min-Order Logic
=================================== */

const Utils = {
    
    // 1. Currency Formatter (₹ Symbol safety)
    formatCurrency: (amount) => {
        const symbol = (typeof MS_CONFIG !== 'undefined') ? MS_CONFIG.CURRENCY : '₹';
        return `${symbol}${parseFloat(amount).toFixed(2)}`;
    },

    // 2. Get Cart from LocalStorage
    getCart: () => {
        try {
            const cartData = localStorage.getItem('ms_cart');
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error("Cart retrieval error: - utils.js:20", error);
            return [];
        }
    },

    // 3. Save Cart to LocalStorage
    saveCart: (cartArray) => {
        localStorage.setItem('ms_cart', JSON.stringify(cartArray));
    },

    // 4. Clear Cart after Order
    clearCart: () => {
        localStorage.removeItem('ms_cart');
    },

    // 5. Calculate Totals (Updated with Min-Order & Delivery Charge)
    calculateBill: (cartItems) => {
        const subtotal = cartItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseInt(item.qty) || 0;
            return total + (price * qty);
        }, 0);

        // Min Order Check (₹100)
        const minAmount = 100;
        const isEligible = subtotal >= minAmount;
        const remainingForMin = isEligible ? 0 : minAmount - subtotal;

        // Delivery Charge logic
        const delivery = (typeof MS_CONFIG !== 'undefined') ? MS_CONFIG.DELIVERY_CHARGE : 10;
        const grandTotal = subtotal > 0 ? (subtotal + delivery) : 0;

        return {
            subtotal,
            delivery,
            grandTotal,
            isEligible,
            remainingForMin
        };
    },

    // 6. Generate HTML for Add/Remove Buttons
    // Ye function decide karega ki "+" dikhana hai ya "- 1 +" selector
    renderQuantityControls: (productId, cart) => {
        const item = cart.find(i => i.id === productId);
        const qty = item ? item.qty : 0;

        if (qty > 0) {
            return `
                <div class="quantity-controls">
                    <button class="qty-btn minus" onclick="handleCartUpdate('${productId}', 'REMOVE')">-</button>
                    <span class="qty-count">${qty}</span>
                    <button class="qty-btn plus" onclick="handleCartUpdate('${productId}', 'ADD')">+</button>
                </div>
            `;
        } else {
            return `<button class="add-btn" onclick="handleCartUpdate('${productId}', 'ADD')">+</button>`;
        }
    },

    // 7. Generate Unique Order ID
    generateOrderId: () => {
        const prefix = (typeof MS_CONFIG !== 'undefined') ? MS_CONFIG.ORDER_PREFIX : 'MSW-';
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `${prefix}${randomNum}`;
    },

    // 8. Notification Helper
    showToast: (message) => {
        // Bitter Truth: Simple alert user ko irritate karta hai, par ye 100% work karta hai
        alert(message);
    }
};

// Global access safety
window.Utils = Utils;