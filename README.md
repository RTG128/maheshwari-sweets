# 🍬 Maheshwari Sweets Ulatu - Pro Edition

Maheshwari Sweets ek professional digital ordering system hai jo **Ulatu** ke liye khas banaya gaya hai. Yeh system customer se order leta hai, use local backend (JSON) mein save karta hai, aur professional format mein WhatsApp par bhejta hai.

## 🚀 Features
- **Premium UI:** Maroon aur Gold theme jo mithai dukan ko suit kare.
- **Dynamic Cart:** Real-time quantity update aur ₹10 fix delivery charge calculation.
- **Professional WhatsApp Billing:** Itemized bill format ke saath.
- **Admin Dashboard:** Orders track karne aur status (Delivered/Pending) badalne ke liye.
- **Password Protected:** Admin panel secure hai (`ulatu7833`).

---

## 📂 Folder Structure
- `/backend`: Node.js server, routes aur orders.json (Database).
- `/js`: Frontend logic (Cart, WhatsApp, Utils, Admin).
- `/css`: Premium styling files.
- `/assets`: Product images aur logos.

---

## 🛠️ Installation & Setup (For Developer)

Is project ko chalane ke liye aapke system mein **Node.js** hona zaroori hai.

1. **Dependencies Install karein:**
   Project ke main folder mein terminal kholein aur ye command chalayein:
   ```bash
   npm init -y
   npm install express cors