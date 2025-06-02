# 🌾 Krishi Connect - Crop Dashboard

This is a full-stack project designed for farmers to manage their crop inventory and view real-time market pricing. Built as part of an internship project, the goal was to deliver a responsive and feature-rich web application aimed at empowering farmers with tech-enabled convenience.

---

## 🔗 Live Frontend (Hosted on Vercel)

🌐 [https://krishi-connect-frontend-lemon.vercel.app](https://krishi-connect-frontend-lemon.vercel.app)

## 🔗 Live Backend (Hosted on Render)

🌍 [https://crop-backend.onrender.com](https://crop-backend.onrender.com)

Test endpoint: [https://crop-backend.onrender.com/api/products](https://crop-backend.onrender.com/api/products)

---

## ⚙️ Tech Stack Used

### 🖥️ Frontend:

* React.js (with Vite)
* TailwindCSS
* JavaScript (ES6+)
* Cursor AI for UI optimization and feature generation
* Deployed using Vercel

### 🛠️ Backend:

* Node.js
* Express.js
* JSON as data storage (file-based database)
* CORS + Body-parser
* Hosted on Render

---

## 🔧 Features Implemented

### 🧺 Product Management:

* Add New Product with details: name, type, price (₹), quantity + unit
* View Product List with detailed insights (per unit price, total bulk price)
* Delete Product functionality

### 📈 Smart Price Insights:

* View Market Price vs Your Selling Price
* Price Difference color-coded (Green for profit, Red for loss)
* Percentage-based profit/loss calculation
* ₹ (INR) currency integrated

### 🗂 Categorized Data:

* Crops categorized by type: Vegetables, Grains, Fruits, etc.
* Prefilled options for product name, type, and units

### 🌐 Real-Time Links:

* Each product optionally links to official crop price site (for latest mandi rates)

### 🌍 Languages:

* Hindi and English toggle (i18n-ready UI)

### 📢 Government Yojana Integration:

* Displayed clickable yojana cards with real links:

  * PM Kisan: [https://pmkisan.gov.in/](https://pmkisan.gov.in/)
  * PM Fasal Bima Yojana: [https://pmfby.gov.in/](https://pmfby.gov.in/)
  * eNAM: [https://enam.gov.in/web/](https://enam.gov.in/web/)

### 💬 Farmer-Friendly Home Screen:

* Hindi slogans like “Jai Jawan Jai Kisan”
* Stickers and emojis for crops and agriculture mood

### 📞 Market Contact Directory:

* Local mandi contact (e.g., Uttarakhand numbers)
* Footer: “Made by Saurabh Kumar Jha”

---

## 💻 Frontend ↔ Backend Integration

To ensure Vercel frontend connects with Render backend:

* API calls are pointed to live Render URLs:

```js
const API_BASE = "https://crop-backend.onrender.com/api/products";
```

* CORS is enabled on the backend using:

```js
const cors = require('cors');
app.use(cors());
```

* Frontend fetches, posts, and deletes data using this live API.

---

## 🧠 Smart Functionality with AI Support

This project was built with the help of **ChatGPT (via Cursor AI)** to brainstorm, generate, and improve features.

### ✨ Sample Prompts I Used:

> “How do I show profit/loss percentage between two prices with ₹ unit?”

> “Make product list more professional and Hindi/English switch friendly”

> “Add dropdown to quantity input for unit types like kg, ton, etc.”

> “Connect Vercel frontend to Render backend using proper CORS setup”

> “Fix 404 and live deploy error on Netlify and switch to Vercel”

> “Create a farmer-friendly home page with Hindi slogans and gov links”

All prompts were written in a mix of English and Hinglish, just like how I naturally think while building. Yeh project banaane mein AI ne kaafi smart suggestive help ki — but implementation, testing, and debugging maine khud kiya 💪

---

## 🚀 Backend Overview

* **Framework**: Express.js
* **Endpoints**:

  * `GET /api/products`: Fetch all products
  * `POST /api/products`: Add new product
  * `DELETE /api/products/:id`: Delete product
* **Data Storage**: Flat JSON file (`data/products.json`)
* **Middleware**: `cors`, `body-parser`
* **Host**: Render.com

---

## 🧾 Final Notes

* Frontend runs on Vercel (`vite + tailwind`)
* Backend runs on Render (Express + JSON)
* Product calculations are per unit based and include bulk logic
* Autocomplete inputs + dropdowns + gov links enhance usability
* Entire project built from scratch, no templates used

---

✨ Made with ❤️ by **Saurabh Kumar Jha**

"Smart soch hi asli kranti hai — Jai Kisan 🙌"
