/* ===================================
   MAHESHWARI SWEETS - WHATSAPP LOGIC
   Fixed: Ultimate Redirect Method
=================================== */

const WhatsApp = {
    formatMessage: (order) => {
        let message = `*👑 MAHESHWARI SWEETS ORDER* \n`;
        message += `*ID:* #${order.orderId}\n`;
        message += `------------------------------\n`;
        message += `*👤 CUSTOMER:* ${order.customer.name}\n`;
        message += `*📞 CONTACT:* ${order.customer.phone}\n`;
        message += `*📍 ADDRESS:* ${order.customer.address}\n`;
        
        if(order.customer.landmark) {
            message += `*🏢 LANDMARK:* ${order.customer.landmark}\n`;
        }
        
        message += `------------------------------\n`;
        message += `*🛒 ITEMS ORDERED:*\n\n`;

        order.items.forEach((item, index) => {
            message += `${index + 1}. *${item.name}*\n`;
            message += `   Qty: ${item.qty} x ₹${item.price} = *₹${(item.price * item.qty).toFixed(2)}*\n`;
        });

        message += `\n------------------------------\n`;
        message += `*💵 BILL SUMMARY:*\n`;
        message += `Subtotal: ₹${order.summary.subtotal.toFixed(2)}\n`;
        message += `Delivery: ₹${order.summary.delivery.toFixed(2)}\n`;
        message += `*TOTAL AMOUNT: ₹${order.summary.grandTotal.toFixed(2)}*\n`;
        message += `------------------------------\n`;
        message += `_Sent from Ulatu Portal_`;

        return encodeURIComponent(message);
    },

    saveOrderToAdmin: (orderData) => {
        try {
            let allOrders = JSON.parse(localStorage.getItem('maheshwari_orders')) || [];
            const orderEntry = {
                ...orderData,
                status: 'Pending',
                isRead: false,
                timestamp: new Date().toISOString()
            };
            allOrders.unshift(orderEntry);
            if(allOrders.length > 50) allOrders.pop();
            localStorage.setItem('maheshwari_orders', JSON.stringify(allOrders));
        } catch (e) {
            console.error("Admin Sync Fail: - whatsapp.js:51", e);
        }
    },

    sendOrder: (orderData) => {
        // 1. Backup Save
        WhatsApp.saveOrderToAdmin(orderData);

        // 2. Format URL
        const encodedText = WhatsApp.formatMessage(orderData);
        const adminPhone = MS_CONFIG.WHATSAPP_NUMBER; 
        const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedText}`;
        
        // 3. Clear Cart
        if (window.Utils && Utils.clearCart) {
            Utils.clearCart();
        }

        // 4. BITTER TRUTH FIX: window.location.replace use kar rahe hain
        // Yeh browser history ko replace karke seedha WhatsApp par le jayega
        // Isse popup blocker trigger nahi hota kyunki naya tab nahi khul raha
        console.log("Redirecting... - whatsapp.js:72");
        window.location.replace(whatsappUrl);
    }
};

window.WhatsApp = WhatsApp;