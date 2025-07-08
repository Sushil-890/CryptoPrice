# 💹 CryptoPulse - Real-Time Crypto Dashboard

CryptoPulse is a full-stack web application that shows real-time cryptocurrency prices with live charts, price history, and downloadable reports. It uses the Binance WebSocket API for instant price updates and REST API for historical data.

🔗 **Live Website**: [https://cryptopulse-mx8e.onrender.com/](https://cryptopulse-mx8e.onrender.com/)

---

## 🚀 Features

- 🔴 **Live Price Dashboard** – View real-time prices of top cryptocurrencies (e.g., BTC, ETH, etc.)
- 🔄 **Binance WebSocket Integration** – Instant updates without refreshing
- 📊 **Live Price Charts** – Recharts used to visualize market trends
- 🕒 **24-Hour Price History** – Historical data shown with REST API
- 📝 **Download Report** – Export data in downloadable format
- 🔐 **Login / Signup Auth System** – Secure authentication with JWT
- 🌓 **Light / Dark Mode** – Theme toggle for better UX

---

## 🛠️ Tech Stack

### 🔷 Frontend
- **React + Vite** – Modern fast build tool
- **Tailwind CSS** – Utility-first styling
- **Recharts** – Charting library for price visualization
- **React Router DOM** – Routing and navigation
- **WebSocket (Binance)** – Real-time price data

### 🔶 Backend
- **Node.js + Express** – API development
- **MongoDB Atlas** – Cloud-based NoSQL database
- **JWT (jsonwebtoken)** – Secure login authentication
- **dotenv** – Environment variable management

---

## 🌐 API Integration

- **WebSocket API**: Binance WebSocket provides live price feed of selected cryptocurrencies.
- **REST API**: Used to fetch 24-hour price history per coin.

---

## 📁 Folder Structure

CryptoPulse/
│
├── client/ # React + Vite Frontend
│ ├── public/
│ └── src/
│ ├── components/
│ └── pages/
│
├── server/ # Node.js Backend
│ ├── Controllers/
│ ├── Models/
│ ├── Routes/
│ └── server.js
│
└── README.md

Made with ❤️ by Sushil Kumar
