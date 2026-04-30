document.addEventListener('DOMContentLoaded', () => {

    // URL se try karo, nahi mila toh localStorage se lo
    const urlParams = new URLSearchParams(window.location.search);
    let orderKey = urlParams.get('id') || localStorage.getItem('last_order_key');

    if (!orderKey) {
        document.getElementById('current-status').innerText = "ID MISSING";
        document.getElementById('current-status').style.background = "#dc3545";
        return;
    }

    // Firebase se direct key se data lo
    db.ref('orders/' + orderKey).on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            updateTrackingUI(data, orderKey);
        } else {
            document.getElementById('current-status').innerText = "ORDER NOT FOUND";
            document.getElementById('current-status').style.background = "#dc3545";
        }
    });
});

function updateTrackingUI(data, orderKey) {

    // Order ID display
    const displayId = document.getElementById('display-order-id');
    if (displayId) {
        displayId.innerText = 'Order #' + (data.orderId || orderKey.substring(1, 7).toUpperCase());
    }

    // Order date
    const dateEl = document.getElementById('order-date');
    if (dateEl && data.timestamp) {
        const d = new Date(data.timestamp);
        dateEl.innerText = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
            + ' | ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    // Status box
    const statusBox = document.getElementById('current-status');
    if (statusBox) {
        statusBox.innerText = (data.status || 'Pending').toUpperCase();
        statusBox.style.background = data.status === 'Delivered' ? '#1D9E75'
            : data.status === 'Rejected' ? '#dc3545'
            : '#800000';
    }

    // Customer details — Firebase mein customerName/customerPhone/address hai
    const nameEl = document.getElementById('cust-name');
    const addrEl = document.getElementById('cust-addr');
    if (nameEl) nameEl.innerText = data.customerName || '---';
    if (addrEl) addrEl.innerText = data.address + (data.landmark ? ' | ' + data.landmark : '') || '---';

    // Total — Firebase mein totalAmount hai
    const totalEl = document.getElementById('grand-total');
    if (totalEl) totalEl.innerText = data.totalAmount || 0;

    // Items — quantity/qty dono handle karo
    const itemsBox = document.getElementById('items-list');
    if (itemsBox && data.items && data.items.length > 0) {
        itemsBox.innerHTML = data.items.map(item => {
            const qty = item.quantity || item.qty || 1;
            return `
            <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f0e8d8;">
                <span style="color:#444; font-size:14px;">${item.name} x ${qty}</span>
                <span style="color:#800000; font-weight:700; font-size:14px;">₹${item.price * qty}</span>
            </div>`;
        }).join('');
    } else if (itemsBox) {
        itemsBox.innerHTML = '<p style="color:#999; font-size:13px; text-align:center;">Items nahi mile.</p>';
    }

    // Progress bar
    updateProgressBar(data.status);

    // 2 minute cancel button — sirf Pending order pe dikhao
    showCancelOption(data.status, orderKey);
}

function updateProgressBar(status) {
    const bar = document.getElementById('progress-bar');
    let width = "0%";
    let step = 1;

    if (status === 'Accepted')                              { step = 2; width = "33%"; }
    else if (status === 'Out for Delivery' || status === 'On the Way') { step = 3; width = "66%"; }
    else if (status === 'Delivered')                        { step = 4; width = "100%"; }

    for (let i = 1; i <= 4; i++) {
        const dot = document.getElementById('dot-' + i);
        if (dot) {
            if (i <= step) dot.classList.add('active');
            else dot.classList.remove('active');
        }
    }
    if (bar) bar.style.width = width;
}

function showCancelOption(status, orderKey) {
    // Purana cancel box hata do agar pehle se hai
    const existing = document.getElementById('cancel-box');
    if (existing) existing.remove();

    if (status !== 'Pending') return;

    const orderTime = parseInt(localStorage.getItem('last_order_time') || '0');
    const elapsed = Date.now() - orderTime;
    const remaining = 120000 - elapsed; // 2 min = 120000ms

    if (remaining <= 0) return;

    // Cancel box banao
    const box = document.createElement('div');
    box.id = 'cancel-box';
    box.style.cssText = 'margin-top:20px; background:#fff3f3; border:1.5px solid #f5c6c6; border-radius:14px; padding:15px; text-align:center;';

    box.innerHTML = `
        <p style="margin:0 0 8px; font-size:0.85rem; color:#555;">Order cancel karna hai? <strong id="cancel-timer" style="color:#800000;"></strong> baad nahi kar payenge.</p>
        <button id="cancelBtn" style="background:#dc3545; color:white; border:none; padding:10px 28px; border-radius:10px; font-weight:700; cursor:pointer; font-size:0.9rem;">
            Order Cancel Karo
        </button>
    `;

    // Back to Menu button ke pehle insert karo
    const btnHome = document.querySelector('.btn-home');
    if (btnHome) btnHome.parentNode.insertBefore(box, btnHome);

    // Countdown timer
    let timeLeft = Math.floor(remaining / 1000);
    const timerEl = document.getElementById('cancel-timer');

    function updateTimer() {
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        if (timerEl) timerEl.innerText = m + ':' + (s < 10 ? '0' + s : s);
        if (timeLeft <= 0) {
            box.remove();
            return;
        }
        timeLeft--;
        setTimeout(updateTimer, 1000);
    }
    updateTimer();

    // Cancel button click
    document.getElementById('cancelBtn').addEventListener('click', function() {
        if (confirm('Pakka cancel karna hai?')) {
            db.ref('orders/' + orderKey).update({ status: 'Cancelled' }).then(() => {
                box.remove();
                const statusBox = document.getElementById('current-status');
                if (statusBox) {
                    statusBox.innerText = 'CANCELLED';
                    statusBox.style.background = '#dc3545';
                }
                localStorage.removeItem('last_order_key');
                localStorage.removeItem('last_order_time');
            });
        }
    });
}