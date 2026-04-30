/* ============================================================
   MAHESHWARI SWEETS - FULL MENU DATA
   Author: Gemini AI Integration
   Description: Clean menu data with categories and image links
   ============================================================ */

const products = [
    // --- BREAKFAST ---
    { id: 'br-01', name: 'Chhola Bhatura (2 Pc)', price: 80, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1626132647523-66f1bf516751?w=400' },
    { id: 'br-02', name: 'Aloo Paratha', price: 40, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5369511?w=400' },
    { id: 'br-03', name: 'Gobhi Paratha', price: 50, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1541014541259-eb529f7f849a?w=400' },
    { id: 'br-04', name: 'Sattu Paratha', price: 50, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=400' },
    { id: 'br-05', name: 'Paneer Paratha', price: 60, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1626500155531-48e06380637c?w=400' },
    { id: 'br-06', name: 'Veg Cutlet', price: 10, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1626139575234-a28628078696?w=400' },
    { id: 'br-07', name: 'Kachori Sabzi', price: 10, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1626132647424-da1726a8f76e?w=400' },
    { id: 'br-08', name: 'Dhuska (Local Special)', price: 10, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1601050690597-df056fb1ce24?w=400' },
    { id: 'br-09', name: 'Samosa', price: 10, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1601050690597-df056fb1ce24?w=400' },
    { id: 'br-10', name: 'Aloo Chop', price: 10, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=400' },
    { id: 'br-11', name: 'Bread Chop (2 Pc)', price: 25, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
    { id: 'br-12', name: 'Pyaz Kachori (2 Pc)', price: 25, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1626132647523-247d46862590?w=400' },
    { id: 'br-13', name: 'Jalebi (Per Plate)', price: 25, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=400' },

    // --- SWEETS ---
    { id: 'sw-01', name: 'Gulab Jamun (Ghee)', price: 15, category: 'Sweets', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=400' },
    { id: 'sw-02', name: 'Sponge Rasgulla', price: 12, category: 'Sweets', image: 'https://images.unsplash.com/photo-1634563859685-64d42049e6d0?w=400' },
    { id: 'sw-03', name: 'Motichoor Ladoo', price: 10, category: 'Sweets', image: 'https://images.unsplash.com/photo-1605192554106-d549b15ff92c?w=400' },
    { id: 'sw-04', name: 'Kaju Katli', price: 20, category: 'Sweets', image: 'https://images.unsplash.com/photo-1593560704563-f175a2261479?w=400' },

    // --- THALI ---
    { id: 'th-01', name: 'Veg Special Thali', price: 140, category: 'Thali', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400' },
    { id: 'th-02', name: 'Veg Thali (Simple)', price: 60, category: 'Thali', image: 'https://images.unsplash.com/photo-1626777553731-032060395350?w=400' },
    { id: 'th-03', name: 'Chicken Thali', price: 150, category: 'Thali', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' },
    { id: 'th-04', name: 'Fish Curry Thali', price: 140, category: 'Thali', image: 'https://images.unsplash.com/photo-1626132647523-247d46862590?w=400' },
    { id: 'th-05', name: 'Mutton Thali', price: 180, category: 'Thali', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400' },

    // --- PANEER & VEG ---
    { id: 'vm-01', name: 'Paneer Butter Masala', price: 260, category: 'Veg-Main', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' },
    { id: 'vm-02', name: 'Paneer Do Pyaza', price: 240, category: 'Veg-Main', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' },
    { id: 'vm-03', name: 'Kadahi Paneer', price: 260, category: 'Veg-Main', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' },
    { id: 'vm-04', name: 'Matar Paneer', price: 220, category: 'Veg-Main', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' },
    { id: 'vm-05', name: 'Mix Veg Special', price: 140, category: 'Veg-Main', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400' },
    { id: 'vm-06', name: 'Dal Tadka (Yellow)', price: 60, category: 'Veg-Main', image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400' },

    // --- NON-VEG ---
    { id: 'nv-01', name: 'Chicken Curry (4 Pc)', price: 240, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400' },
    { id: 'nv-02', name: 'Chicken Butter Masala', price: 280, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400' },
    { id: 'nv-03', name: 'Chicken Dehati (Full)', price: 550, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1614398751058-eb2e0bf63e53?w=400' },
    { id: 'nv-04', name: 'Mutton Curry (2 Pc)', price: 200, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1544378730-8b5104b18790?w=400' },
    { id: 'nv-05', name: 'Egg Curry (2 Pc)', price: 60, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1591814468924-caf7e422a7ed?w=400' },

    // --- CHINESE ---
    { id: 'ch-01', name: 'Veg Chowmein', price: 80, category: 'Chinese', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
    { id: 'ch-02', name: 'Chicken Chowmein', price: 140, category: 'Chinese', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400' },
    { id: 'ch-03', name: 'Veg Fried Rice', price: 100, category: 'Chinese', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400' },
    { id: 'ch-04', name: 'Chicken Chilli (8 Pc)', price: 160, category: 'Chinese', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400' },
    { id: 'ch-05', name: 'Veg Manchurian', price: 140, category: 'Chinese', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400' },

    // --- ROLLS ---
    { id: 'rl-01', name: 'Veg Roll', price: 40, category: 'Rolls', image: 'https://images.unsplash.com/photo-1628102476695-8d51390b7993?w=400' },
    { id: 'rl-02', name: 'Paneer Roll', price: 70, category: 'Rolls', image: 'https://images.unsplash.com/photo-1628102476695-8d51390b7993?w=400' },
    { id: 'rl-03', name: 'Egg Chicken Roll', price: 80, category: 'Rolls', image: 'https://images.unsplash.com/photo-1628102476695-8d51390b7993?w=400' },
    { id: 'rl-04', name: 'Double Egg Chicken Roll', price: 100, category: 'Rolls', image: 'https://images.unsplash.com/photo-1628102476695-8d51390b7993?w=400' },

    // --- SNACKS ---
    { id: 'sn-01', name: 'Veg Pakoda (8 Pc)', price: 80, category: 'Snacks', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400' },
    { id: 'sn-02', name: 'Paneer Pakoda (8 Pc)', price: 150, category: 'Snacks', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400' },
    { id: 'sn-03', name: 'French Fries', price: 70, category: 'Snacks', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400' }
];

// Verify if data is loaded correctly
console.log("Menu Data Loaded: - data.js:71", products.length, " items found.");

// Export logic for different environments
if (typeof module !== 'undefined') {
    module.exports = products;
}