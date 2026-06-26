/* ===================================
   MAHESHWARI SWEETS - PRO CHECKOUT (TRACKING ENABLED)
   Features: Firebase Sync, Auto PDF, Order Tracking
=================================== */

document.addEventListener('DOMContentLoaded', () => {
    renderReviewOrder();
    const checkoutForm = document.getElementById('checkoutForm');
    if(checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
});

function renderReviewOrder() {
    const reviewContainer = document.getElementById('orderReview');
    const cart = Utils.getCart();
    
    if (!cart || cart.length === 0) {
        reviewContainer.innerHTML = "<p class='text-center'>Aapka cart khali hai!</p>";
        return;
    }

    let subtotal = 0;
    let itemsHTML = cart.map(item => {
        subtotal += item.price * item.qty;
        return `
            <div class="checkout-item" style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom: 1px dashed #ddd; padding-bottom:5px;">
                <span>${item.name} (x${item.qty})</span>
                <span>₹${item.price * item.qty}</span>
            </div>
        `;
    }).join('');

    const delivery = MS_CONFIG.DELIVERY_CHARGE;
    const total = subtotal + delivery;

    reviewContainer.innerHTML = `
        <div class="bill-box" style="background:#fff9f0; padding:15px; border-radius:10px; border: 1px solid #800000;">
            <h4 style="color:#800000; margin-bottom:10px; text-align:center;">OFFICIAL BILL SUMMARY</h4>
            ${itemsHTML}
            <div style="margin-top:15px; border-top: 2px solid #800000; padding-top:10px;">
                <div style="display:flex; justify-content:space-between;">
                    <span>Subtotal:</span><span>₹${subtotal}</span>
                </div>
                <div style="display:flex; justify-content:space-between; color: green; font-weight:600;">
                    <span>Delivery Charge:</span><span>₹${delivery}</span>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:1.2rem; font-weight:800; color:#800000; margin-top:10px;">
                    <span>Grand Total:</span><span>₹${total}</span>
                </div>
            </div>
        </div>
    `;
}

async function generatePDFInvoice(order) {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Header
        doc.setFillColor(100, 0, 0); 
        doc.rect(0, 0, 210, 50, 'F');
        doc.setTextColor(212, 175, 55); 
        doc.setFontSize(28);
        doc.text("MAHESHWARI SWEETS", 105, 25, { align: "center" });
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text("ULATU, RANCHI | PURE & FRESH", 105, 35, { align: "center" });
        
        // Info
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text(`INVOICE NO: ${order.orderId}`, 15, 60);
        doc.text(`DATE: ${new Date().toLocaleString()}`, 150, 60);
        doc.line(15, 65, 195, 65);
        
        doc.text("DELIVER TO:", 20, 78);
        doc.text(`Name: ${order.customer.name}`, 20, 85);
        doc.text(`Phone: ${order.customer.phone}`, 20, 92);
        doc.text(`Address: ${order.customer.address}`, 20, 99);
        
        let y = 115;
        doc.setFillColor(100, 0, 0);
        doc.rect(15, y, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text("ITEM DESCRIPTION", 20, y + 6);
        doc.text("QTY", 140, y + 6);
        doc.text("PRICE", 170, y + 6);
        
        doc.setTextColor(0, 0, 0);
        y += 15;
        order.items.forEach((item) => {
            doc.text(`${item.name}`, 20, y);
            doc.text(`${item.qty}`, 142, y);
            doc.text(`Rs. ${item.price * item.qty}`, 170, y);
            y += 10;
        });
        
        doc.setFont("helvetica", "bold");
        doc.text("GRAND TOTAL:", 130, y + 10);
        doc.text(`Rs. ${order.summary.grandTotal}`, 170, y + 10);
        
        doc.save(`${order.orderId}_Invoice.pdf`);
        return true;
    } catch (error) {
        console.error("PDF Error: - checkout.js:107", error);
        return false;
    }
}

async function handleCheckout(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const cart = Utils.getCart();
    
    if (!cart || cart.length === 0) return alert("Cart khali hai!");

    btn.disabled = true;
    btn.innerHTML = "SABAR KAREIN... Order ho raha hai";

    // --- TRACKING LOGIC START ---
    const currentOrderId = MS_CONFIG.ORDER_PREFIX + Math.floor(1000 + Math.random() * 9000);
    // --- TRACKING LOGIC END ---

    const orderData = {
        orderId: currentOrderId,
        customer: {
            name: document.getElementById('custName').value.trim(),
            phone: document.getElementById('custPhone').value.trim(),
            address: document.getElementById('custAddress').value.trim(),
            landmark: document.getElementById('custLandmark').value.trim()
        },
        items: cart,
        summary: {
            subtotal: cart.reduce((acc, item) => acc + (item.price * item.qty), 0),
            delivery: MS_CONFIG.DELIVERY_CHARGE,
            grandTotal: cart.reduce((acc, item) => acc + (item.price * item.qty), 0) + MS_CONFIG.DELIVERY_CHARGE
        },
        status: 'Pending',
        timestamp: Date.now()
    };

    try {
        // Safe database connection initialization right before using
        const currentDb = window.db || firebase.database();
        
        // --- STEP 1: FIREBASE SYNC ---
        const newOrderRef = currentDb.ref('orders').push(); // Pehle reference banaya
        const firebaseId = newOrderRef.key; // Firebase ki unique key nikaali (e.g. -OKmZ...)
        
        await newOrderRef.set(orderData); // Ab data save kiya
        console.log("Database updated with Firebase ID: - checkout.js:153", firebaseId);

        // --- STEP 2: SAVE FOR TRACKING --- ✅ FIXED: firebaseId save ho raha hai
        localStorage.setItem('last_order_key', firebaseId);
        localStorage.setItem('last_order_time', Date.now());

        // --- STEP 3: PDF GENERATION ---
        btn.innerHTML = "BILL DOWNLOAD HO RAHA HAI...";
        await generatePDFInvoice(orderData);

        // --- STEP 4: FINAL SUCCESS ---
        btn.innerHTML = "ORDER SUCCESSFUL!";

        // Cart clear karein
        localStorage.removeItem('ms_cart');

        setTimeout(() => {
            alert("Dhanyawad! Order mil gaya hai.");
            
            // ✅ FIXED: firebaseId URL mein ja raha hai, currentOrderId nahi
            window.location.href = "my-order.html?id=" + firebaseId;
        }, 1000);
    } catch (err) {
        console.error("Order Error: - checkout.js:176", err);
        alert("Server connection fail! Check your internet.");
        btn.disabled = false;
        btn.innerHTML = "Confirm Order";
    }
}