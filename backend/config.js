/* ===================================
   MS-ULATU - BACKEND CONFIGURATION
   Purpose: Server Port & Security
=================================== */

const BACKEND_CONFIG = {
    // Server kis port par chalega (localhost:5000)
    PORT: process.env.PORT || 5000,

    // Agar future mein Database use karein (e.g., MongoDB)
    MONGODB_URI: "mongodb://localhost:27017/maheshwari_sweets",

    // Authentication Secret (Admin login ke liye)
    JWT_SECRET: "ulatu_sweets_secret_key_7833",

    // Backend se WhatsApp formatting ke liye rules
    ORDER_STATUS: ["Pending", "Processing", "Delivered", "Cancelled"],

    // Security Headers
    CORS_OPTIONS: {
        origin: "*", // Filhal sabke liye open, production mein domain name aayega
        methods: "GET,POST",
    }
};

// Node.js environment ke liye export
if (typeof module !== 'undefined') {
    module.exports = BACKEND_CONFIG;
}