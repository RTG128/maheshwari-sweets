
/* ===================================

   MAHESHWARI SWEETS - GLOBAL CONFIG

   Purpose: Centralized Settings

=================================== */



const MS_CONFIG = {

    // 1. Shop Identity

    SHOP_NAME: "Maheshwari Sweets Ulatu",

    

    // 2. WhatsApp Number (Bina '+' ke, country code ke sath)

    // Isi number par sare orders receive honge

    WHATSAPP_NUMBER: "917047833473", 



    // 3. Pricing & Delivery (As per your instruction)

    CURRENCY: "₹",

    DELIVERY_CHARGE: 10,  // Fix delivery charge har order par

    MIN_ORDER_VALUE: 100, // Kam se kam itne ka sauda hona chahiye



    // 4. Order Settings

    ORDER_PREFIX: "MS-ULATU-", // Order ID kuch aisi dikhegi: MS-ULATU-1234

    

    // 5. Backend API URL

    // Agar aap local server chala rahe hain toh http://localhost:5000/api

    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 

                  ? "http://localhost:5000/api" 

                  : "/api",



    // 6. Categories (Menu ke hisaab se)

    CATEGORIES: [

        "All",

        "Breakfast",

        "Sweets",

        "Chinese",

        "Rolls",

        "Snacks",

        "Thali"

    ]

};



// Freeze kar rahe hain taaki koi dusri script ise galti se change na kar sake

Object.freeze(MS_CONFIG);