let isAudioActive = localStorage.getItem('ms_audio_enabled') === 'true';
let databaseReady = false; 

const ringtone = new Audio('assets/sounds/notification.mp3');
ringtone.preload = 'auto';

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('ms_admin_logged') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    const startBtn = document.getElementById('startAudioBtn');
    const alertBox = document.getElementById('voiceAlertBox');

    if (isAudioActive && alertBox) alertBox.style.display = 'none';

    if (startBtn) {
        startBtn.addEventListener('click', function() {
            isAudioActive = true;
            localStorage.setItem('ms_audio_enabled', 'true');
            if(alertBox) alertBox.style.display = 'none';
            
            ringtone.play().then(() => {
                ringtone.pause();
                ringtone.currentTime = 0;
            }).catch(e => console.error("Audio unlock failed - admin.js:27", e));

            const t = new SpeechSynthesisUtterance("System Online");
            t.lang = 'hi-IN';
            window.speechSynthesis.speak(t);
        });
    }

    db.ref('orders').on('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) {
            updateDashboard([]);
            databaseReady = true;
            return;
        }
        
        const startOfToday = new Date().setHours(0,0,0,0);
        const allOrders = Object.keys(data).map(k => {
            const o = data[k];
            return {
                firebaseKey: k,
                orderId: o.orderId || k.substring(1, 6).toUpperCase(),
                name: o.customerName || (o.customer ? o.customer.name : 'Unknown'),
                phone: o.customerPhone || (o.customer ? o.customer.phone : 'N/A'),
                address: o.address || (o.customer ? o.customer.address : 'N/A'),
                landmark: o.landmark || '',
                items: o.items || [],
                total: o.totalAmount || (o.summary ? o.summary.grandTotal : 0),
                status: o.status || 'Pending',
                paymentMode: o.paymentMode || 'Cash on Delivery',
                paymentStatus: o.paymentStatus || 'Unpaid',
                timestamp: o.timestamp || 0
            };
        });

        const todayOrders = allOrders
            .filter(o => o.timestamp >= startOfToday)
            .sort((a, b) => b.timestamp - a.timestamp);

        updateDashboard(todayOrders);
        setTimeout(() => { databaseReady = true; }, 2000); 
    });

    db.ref('orders').limitToLast(1).on('child_added', (snapshot) => {
        if (!databaseReady) return; 
        const order = snapshot.val();
        const timeDiff = Date.now() - (order.timestamp || 0);
        if (isAudioActive && order.status === 'Pending' && timeDiff < 60000) {
            triggerLiveAlert(order.customerName || (order.customer ? order.customer.name : 'Naya'));
        }
    });
});

function triggerLiveAlert(customerName) {
    ringtone.pause();
    ringtone.currentTime = 0;
    ringtone.play().then(() => {
        setTimeout(() => {
            const msg = `Naya Order! ${customerName} se aaya hai.`;
            const speech = new SpeechSynthesisUtterance(msg);
            speech.lang = 'hi-IN';
            window.speechSynthesis.speak(speech);
        }, 1200);
    });
}

function updateDashboard(orders) {
    const list = document.getElementById('ordersList');
    if (!orders || orders.length === 0) {
        if(list) list.innerHTML = `<div style="text-align:center; padding:50px; color:#666;"><p>Aaj koi order nahi hai.</p></div>`;
        updateStats(0, 0, 0);
        return;
    }
    renderOrders(orders);
    calculateStats(orders);
}

function renderOrders(orders) {
    const container = document.getElementById('ordersList');
    if(!container) return;
    container.innerHTML = orders.map(order => {
        const sColor = getStatusColor(order.status);
        const isPaid = order.paymentStatus === 'Paid';
        const isUPI = order.paymentMode === 'UPI / Online';

        // Payment badge
        const paymentBadge = `
            <span style="
                background: ${isPaid ? '#e8f5e9' : '#fff3f3'};
                color: ${isPaid ? '#2e7d32' : '#800000'};
                border: 1.5px solid ${isPaid ? '#4CAF50' : '#f5c6c6'};
                padding: 3px 10px;
                border-radius: 20px;
                font-size: 0.72rem;
                font-weight: 700;
            ">${isPaid ? 'PAID' : 'UNPAID'}</span>
        `;

        // Mark as Paid button — sirf UPI orders pe dikhega aur sirf tab tak jab Unpaid ho
        const markPaidBtn = (isUPI && !isPaid) ? `
            <button onclick="markAsPaid('${order.firebaseKey}')" style="
                background: #e8f5e9;
                color: #2e7d32;
                border: 1.5px solid #4CAF50;
                padding: 10px;
                border-radius: 10px;
                cursor: pointer;
                font-weight: 700;
                font-size: 0.75rem;
                width: 100%;
                margin-top: 10px;
            ">Mark as Paid</button>
        ` : '';

        return `
        <div class="order-card" style="background:white; border-radius:20px; padding:0; margin-bottom:30px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); border: 1px solid #eee; overflow:hidden;">
            
            <div style="background:${sColor}; padding:15px 20px; display:flex; justify-content:space-between; align-items:center; color:white;">
                <span style="font-weight:800; letter-spacing:1px; font-size:0.8rem;">ORDER #${order.orderId}</span>
                <span style="background:rgba(255,255,255,0.2); padding:4px 12px; border-radius:50px; font-size:0.75rem; font-weight:700; text-transform:uppercase;">${order.status}</span>
            </div>

            <div style="padding:20px;">
                <div style="display:flex; justify-content:space-between; border-bottom: 1px dashed #ddd; padding-bottom:15px; margin-bottom:15px;">
                    <div>
                        <h3 style="margin:0; color:#800000; font-size:1.4rem;">${order.name}</h3>
                        <p style="margin:5px 0; font-weight:700; color:#333;">📞 ${order.phone}</p>
                        <div style="margin-top:6px; display:flex; align-items:center; gap:8px;">
                            <span style="font-size:0.75rem; color:#555; font-weight:600;">${order.paymentMode}</span>
                            ${paymentBadge}
                        </div>
                    </div>
                    <div style="text-align:right; font-size:0.75rem; color:#888;">
                        ${new Date(order.timestamp).toLocaleDateString()}<br>
                        ${new Date(order.timestamp).toLocaleTimeString()}
                    </div>
                </div>

                <div style="background:#fcfcfc; border:1px solid #f0f0f0; padding:12px; border-radius:12px; margin-bottom:20px;">
                    <p style="margin:0; font-size:0.85rem; color:#666; line-height:1.5;">
                        <strong style="color:#333; text-transform:uppercase; font-size:0.7rem;">Delivery Pata:</strong><br>
                        ${order.address}
                        ${order.landmark ? `<br><span style="color:#d4af37; font-weight:700;">🚩 Landmark: ${order.landmark}</span>` : ''}
                    </p>
                </div>

                <div style="background:#fffdfa; border: 1px solid #fff0d6; border-radius:12px; padding:15px;">
                    <table style="width:100%; border-collapse:collapse; font-size:0.9rem;">
                        <thead>
                            <tr style="border-bottom:1px solid #eee; text-align:left; color:#888; font-size:0.7rem;">
                                <th style="padding-bottom:8px;">ITEM NAME</th>
                                <th style="padding-bottom:8px; text-align:center;">QTY</th>
                                <th style="padding-bottom:8px; text-align:right;">PRICE</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map(i => `
                                <tr style="border-bottom:1px solid #fafafa;">
                                    <td style="padding:10px 0; font-weight:600; color:#444;">${i.name}</td>
                                    <td style="padding:10px 0; text-align:center; font-weight:700;">${i.quantity || i.qty}</td>
                                    <td style="padding:10px 0; text-align:right; font-weight:600;">₹${(i.price || 0) * (i.quantity || i.qty)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <div style="margin-top:15px; padding-top:15px; border-top:2px solid #800000; display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-weight:800; color:#800000; font-size:1.1rem;">GRAND TOTAL</span>
                        <span style="font-weight:800; color:#800000; font-size:1.3rem;">₹${order.total}</span>
                    </div>
                </div>

                ${markPaidBtn}

                <div style="margin-top:25px; display:grid; grid-template-columns: repeat(3, 1fr) 45px; gap:10px;">
                    <button onclick="updateStatus('${order.firebaseKey}', 'Accepted')" style="background:#007bff; color:white; border:none; padding:12px; border-radius:10px; cursor:pointer; font-weight:700; font-size:0.8rem; transition:0.3s;">Accept</button>
                    <button onclick="updateStatus('${order.firebaseKey}', 'Delivered')" style="background:#28a745; color:white; border:none; padding:12px; border-radius:10px; cursor:pointer; font-weight:700; font-size:0.8rem; transition:0.3s;">Done</button>
                    <button onclick="updateStatus('${order.firebaseKey}', 'Rejected')" style="background:#dc3545; color:white; border:none; padding:12px; border-radius:10px; cursor:pointer; font-weight:700; font-size:0.8rem; transition:0.3s;">Reject</button>
                    <button onclick="deleteOrder('${order.firebaseKey}')" style="background:#f1f1f1; color:#999; border:none; border-radius:10px; cursor:pointer; font-weight:bold;">✕</button>
                </div>
            </div>
        </div>`;
    }).join('');
}

function getStatusColor(status) {
    switch(status) {
        case 'Accepted': return '#007bff';
        case 'Delivered': return '#28a745';
        case 'Rejected': return '#dc3545';
        default: return '#800000';
    }
}

function calculateStats(orders) {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'Pending' || o.status === 'Accepted').length;
    const earnings = orders.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    updateStats(total, pending, earnings);
}

function updateStats(total, pending, earnings) {
    if(document.getElementById('totalOrders')) document.getElementById('totalOrders').innerText = total;
    if(document.getElementById('pendingOrders')) document.getElementById('pendingOrders').innerText = pending;
    if(document.getElementById('totalEarnings')) document.getElementById('totalEarnings').innerText = `₹${earnings.toFixed(0)}`;
}

window.updateStatus = function(key, status) {
    db.ref('orders/' + key).update({ status: status });
}

window.deleteOrder = function(key) {
    if(confirm('Order delete kar dein?')) db.ref('orders/' + key).remove();
}

window.markAsPaid = function(key) {
    if(confirm('Kya aapne payment receive kar li hai?')) {
        db.ref('orders/' + key).update({ paymentStatus: 'Paid' });
    }
}