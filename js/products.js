/* ===================================
   MAHESHWARI SWEETS - PRODUCT LOGIC
   Feature: Fetch from JSON with Backup
=================================== */

let PRODUCTS = []; // Global variable jo baaki files use karengi

async function loadProducts() {
    try {
        // 1. Koshish karein server se fresh data lene ki
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error("File load nahi hui");
        
        PRODUCTS = await response.json();
        console.log("✅ Live Menu Loaded - products.js:15");

    } catch (error) {
        console.log("Server se connect nahi ho paye, Backup Menu use kar rahe hain. - products.js:18");
        
        // 2. BACKUP MENU (Agar JSON file load na ho toh ye chalega)
        PRODUCTS = [
            {
                id: "ms-101",
                name: "Chhola Bhatura (2 Pc)",
                price: 80,
                category: "Breakfast",
                image: "assets/images/chhola-bhatura.jpg"
            },
            {
                id: "ms-102",
                name: "Samosa (Per Pc)",
                price: 10,
                category: "Snacks",
                image: "assets/images/samosa.jpg"
            },
            {
                id: "ms-301",
                name: "Gulab Jamun",
                price: 15,
                category: "Sweets",
                image: "assets/images/gulab-jamun.jpg"
            },
            {
                id: "ms-401",
                name: "Paneer Cheese Roll",
                price: 90,
                category: "Rolls",
                image: "assets/images/paneer-roll.jpg"
            }
        ];
    }

    // Products load hone ke baad UI dikhao
    renderProducts(PRODUCTS);
    renderCategories();
}

// 3. Products ko HTML mein inject karna
function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = items.map(p => `
        <div class="p-card">
            <div class="p-img-box">
                <img src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/400x300?text=Sweets'">
            </div>
            <div class="p-details">
                <span class="p-category">${p.category}</span>
                <h3 class="p-name">${p.name}</h3>
                <div class="p-price-row">
                    <span class="p-price">₹${p.price}</span>
                    <button class="add-btn" onclick="addToCart('${p.id}')">ADD +</button>
                </div>
            </div>
        </div>
    `).join('');
}

// 4. Categories filter tabs dikhana
function renderCategories() {
    const catContainer = document.getElementById('categoryTabs');
    if (!catContainer) return;

    // config.js se categories uthayega
    catContainer.innerHTML = MS_CONFIG.CATEGORIES.map(cat => `
        <div class="cat-tab ${cat === 'All' ? 'active' : ''}" onclick="filterByCategory('${cat}', this)">
            ${cat}
        </div>
    `).join('');
}

// 5. Category wise Filter logic
function filterByCategory(category, element) {
    // Active class hatana/lagana
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');

    if (category === 'All') {
        renderProducts(PRODUCTS);
    } else {
        const filtered = PRODUCTS.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Page load par products load karein
document.addEventListener('DOMContentLoaded', loadProducts);