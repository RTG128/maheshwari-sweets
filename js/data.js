/* ============================================================
   MAHESHWARI SWEETS - FULL MENU DATA (100% GITHUB EXACT CASE MATCH)
   Author: Gemini AI Integration
   Description: Clean menu data with fixed local image paths matching folder structure
   ============================================================ */

const products = [
    // --- BREAKFAST ---
    { id: 'br-01', name: 'Chhola Bhatura (2 Pc)', price: 80, category: 'Breakfast', image: 'assets/images/Chola-bhatura.jpg' },
    { id: 'br-02', name: 'Aloo Paratha', price: 40, category: 'Breakfast', image: 'assets/images/aloo-paratha.jpg' },
    { id: 'br-03', name: 'Gobhi Paratha', price: 50, category: 'Breakfast', image: 'assets/images/Gobhi-paratha.jpg' },
    { id: 'br-04', name: 'Sattu Paratha', price: 50, category: 'Breakfast', image: 'assets/images/Sattu-paratha.jpg' },
    { id: 'br-05', name: 'Paneer Paratha', price: 60, category: 'Breakfast', image: 'assets/images/paneer-paratha.jpg' },
    { id: 'br-06', name: 'Veg Cutlet', price: 10, category: 'Breakfast', image: 'assets/images/Veg-cutlet.jpg' }, 
    { id: 'br-07', name: 'Kachori Sabzi', price: 10, category: 'Breakfast', image: 'assets/images/Kachori-sabji.jpg' },
    { id: 'br-08', name: 'Dhuska (Local Special)', price: 10, category: 'Breakfast', image: 'assets/images/Dhuska.jpg' },
    { id: 'br-09', name: 'Samosa', price: 10, category: 'Breakfast', image: 'assets/images/Samosa.jpg' },
    { id: 'br-10', name: 'Aloo Chop', price: 10, category: 'Breakfast', image: 'assets/images/Aloo Chop.jpg' },
    { id: 'br-11', name: 'Bread Chop (2 Pc)', price: 25, category: 'Breakfast', image: 'assets/images/Bread chop.jpg' },
    { id: 'br-12', name: 'Pyaz Kachori (2 Pc)', price: 25, category: 'Breakfast', image: 'assets/images/pyaz-kachori.jpg' },
    { id: 'br-13', name: 'Jalebi (Per Plate)', price: 25, category: 'Breakfast', image: 'assets/images/Jalebi.jpg' },

    // --- SWEETS ---
    { id: 'sw-01', name: 'Gulab Jamun (Ghee)', price: 15, category: 'Sweets', image: 'assets/images/Gulab-jamun.jpg' },
    { id: 'sw-02', name: 'Sponge Rasgulla', price: 12, category: 'Sweets', image: 'assets/images/Sponge-rasgulla.jpg' },
    { id: 'sw-03', name: 'Motichoor Ladoo', price: 10, category: 'Sweets', image: 'assets/images/Motichoor-ladoo.jpg' },
    { id: 'sw-04', name: 'Kaju Katli', price: 20, category: 'Sweets', image: 'assets/images/Kaju-katli.jpg' },

    // --- THALI ---
    { id: 'th-01', name: 'Veg Special Thali', price: 140, category: 'Thali', image: 'assets/images/Veg-special-thali.jpg' }, 
    { id: 'th-02', name: 'Veg Thali (Simple)', price: 60, category: 'Thali', image: 'assets/images/Veg-thali(simple).jpg' },
    { id: 'th-03', name: 'Chicken Thali', price: 150, category: 'Thali', image: 'assets/images/Chicken-Thali.jpg' },
    { id: 'th-04', name: 'Fish Curry Thali', price: 140, category: 'Thali', image: 'assets/images/fish-curry-thali.jpg' },
    { id: 'th-05', name: 'Mutton Thali', price: 180, category: 'Thali', image: 'assets/images/Mutton-thali.jpg' },

    // --- PANEER & VEG ---
    { id: 'vm-01', name: 'Paneer Butter Masala', price: 260, category: 'Veg-Main', image: 'assets/images/paneer-butter-masala.jpg' },
    { id: 'vm-02', name: 'Paneer Do Pyaza', price: 240, category: 'Veg-Main', image: 'assets/images/Paneer-do-pyaza.jpg' },
    { id: 'vm-03', name: 'Kadahi Paneer', price: 260, category: 'Veg-Main', image: 'assets/images/Kadai-Paneer.jpg' },
    { id: 'vm-04', name: 'Matar Paneer', price: 220, category: 'Veg-Main', image: 'assets/images/matar-paneer.jpg' },
    { id: 'vm-05', name: 'Mix Veg Special', price: 140, category: 'Veg-Main', image: 'assets/images/mixed_veg.jpg' },
    { id: 'vm-06', name: 'Dal Tadka (Yellow)', price: 60, category: 'Veg-Main', image: 'assets/images/Dal-Tadka(yellow).jpg' },

    // --- NON-VEG ---
    { id: 'nv-01', name: 'Chicken Curry (4 Pc)', price: 240, category: 'Non-Veg', image: 'assets/images/Chicken-curry.jpg' },
    { id: 'nv-02', name: 'Chicken Butter Masala', price: 280, category: 'Non-Veg', image: 'assets/images/Chicken-Butter-masala.jpg' }, 
    { id: 'nv-03', name: 'Chicken Dehati (Full)', price: 550, category: 'Non-Veg', image: 'assets/images/Chicken-Dehati.jpg' },
    { id: 'nv-04', name: 'Mutton Curry (2 Pc)', price: 200, category: 'Non-Veg', image: 'assets/images/Mutton-curry.jpg' },
    { id: 'nv-05', name: 'Egg Curry (2 Pc)', price: 60, category: 'Non-Veg', image: 'assets/images/Egg-curry.jpg' },

    // --- CHINESE ---
    { id: 'ch-01', name: 'Veg Chowmein', price: 80, category: 'Chinese', image: 'assets/images/Veg-Chowmein.jpg' },
    { id: 'ch-02', name: 'Chicken Chowmein', price: 140, category: 'Chinese', image: 'assets/images/Chicken-chowmein.jpg' },
    { id: 'ch-03', name: 'Veg Fried Rice', price: 100, category: 'Chinese', image: 'assets/images/Veg-Fried-Rice.jpg' }, 
    { id: 'ch-04', name: 'Chicken Chilli (8 Pc)', price: 160, category: 'Chinese', image: 'assets/images/Chicken-chilli.jpg' },
    { id: 'ch-05', name: 'Veg Manchurian', price: 140, category: 'Chinese', image: 'assets/images/Veg-Manchurian.jpg' },

    // --- ROLLS ---
    { id: 'rl-01', name: 'Veg Roll', price: 40, category: 'Rolls', image: 'assets/images/Veg-roll.jpg' },
    { id: 'rl-02', name: 'Paneer Roll', price: 70, category: 'Rolls', image: 'assets/images/paneer-roll.jpg' },
    { id: 'rl-03', name: 'Egg Chicken Roll', price: 80, category: 'Rolls', image: 'assets/images/egg-chicken-roll.jpg' },
    { id: 'rl-04', name: 'Double Egg Chicken Roll', price: 100, category: 'Rolls', image: 'assets/images/Double-egg-chicken-roll.jpg' },

    // --- SNACKS ---
    { id: 'sn-01', name: 'Veg Pakoda (8 Pc)', price: 80, category: 'Snacks', image: 'assets/images/Veg-pakoda(8 pc).jpg' }, 
    { id: 'sn-02', name: 'Paneer Pakoda (8 Pc)', price: 150, category: 'Snacks', image: 'assets/images/paneer-pakora.jpg' },
    { id: 'sn-03', name: 'French Fries', price: 70, category: 'Snacks', image: 'assets/images/French-fries.jpg' }
];

console.log("Menu Data Loaded: - data.js:70", products.length, " items found.");

if (typeof module !== 'undefined') {
    module.exports = products;
}