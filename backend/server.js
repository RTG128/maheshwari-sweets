/* ===================================
   MS-ULATU - MAIN BACKEND SERVER
   Fixed: Open CORS & Direct Logging
=================================== */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // File check karne ke liye add kiya
const config = require('./config');
const routes = require('./routes');

const app = express();

// 1. Middlewares (SABSE ZAROORI BADLAV)
// CORS ko ekdum simple rakha hai taaki connection block na ho
app.use(cors({
    origin: '*', // Sabhi ports se request allow karega (Live Server & Localhost)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// 2. Database Check (Bitter Truth: File honi chahiye warna crash hoga)
const ordersPath = path.join(__dirname, 'orders.json');
if (!fs.existsSync(ordersPath)) {
    fs.writeFileSync(ordersPath, JSON.stringify([]));
    console.log("📝 orders.json nahi mili, nayi file bana di gayi hai. - server.js:30");
}

// 3. Static Files
app.use(express.static(path.join(__dirname, '../')));

// 4. Use Routes
app.use('/api', routes);

// 5. Default Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// 6. Start Server
const PORT = config.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n========================================= - server.js:47`);
    console.log(`🚀 SERVER ACTIVE: http://localhost:${PORT} - server.js:48`);
    console.log(`📡 Dashboard link: http://localhost:${PORT}/admin.html - server.js:49`);
    console.log(`📦 Database: backend/orders.json - server.js:50`);
    console.log(`=========================================\n - server.js:51`);
});