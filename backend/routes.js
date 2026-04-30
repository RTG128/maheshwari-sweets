/* ===================================
   MS-ULATU - BACKEND ROUTES (FIXED)
   Logic: Handling Orders & Admin Requests
=================================== */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Orders file ka rasta
const ordersFilePath = path.join(__dirname, 'orders.json');

// Helper function: Data read karne ke liye taaki code baar-baar na likhna pade
const readOrders = () => {
    if (!fs.existsSync(ordersFilePath)) {
        fs.writeFileSync(ordersFilePath, JSON.stringify([]));
        return [];
    }
    const data = fs.readFileSync(ordersFilePath, 'utf8');
    return JSON.parse(data || "[]");
};

// --- 1. Order Receive Karein (POST) ---
router.post('/place-order', (req, res) => {
    try {
        const newOrder = req.body;
        const orders = readOrders();

        // Naya order array ke sabse upar daalein (Latest first)
        orders.unshift({
            ...newOrder,
            status: newOrder.status || "Pending",
            timestamp: newOrder.timestamp || new Date().toISOString()
        });

        fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
        console.log(`✅ Order Saved: ${newOrder.orderId} - routes.js:38`);
        
        res.status(200).json({ success: true, message: "Order Saved Successfully!" });
    } catch (err) {
        console.error("❌ Save Error: - routes.js:42", err);
        res.status(500).json({ success: false, message: "Server Error!" });
    }
});

// --- 2. Saare Orders Dekhein (GET) ---
// DHAYAN DEIN: Admin dashboard '/api/orders' ko call karta hai
router.get('/orders', (req, res) => {
    try {
        const orders = readOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).send("Error reading orders.");
    }
});

// --- 3. Order Status Update Karein (PUT) ---
router.put('/update-status/:id', (req, res) => {
    try {
        const orderId = req.params.id;
        const newStatus = req.body.status;
        let orders = readOrders();

        const index = orders.findIndex(o => o.orderId === orderId);
        
        if (index !== -1) {
            orders[index].status = newStatus;
            fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
            res.json({ success: true });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

module.exports = router;