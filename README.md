# 🛒 E-commerce Product Price Tracker

A full-stack MERN application that allows users to monitor product prices from e-commerce websites and receive alerts whenever the product price drops below a user-defined target price.

The system automatically tracks prices at scheduled intervals, stores historical price data, and displays price trends through interactive charts.

---

## 🚀 Features

- User Authentication (Register/Login)
- Add products using product URL
- Set custom target price
- Automatic price tracking
- Price drop notifications
- Historical price tracking
- Interactive price history charts
- Dashboard for managing tracked products
- MongoDB database for storing users and product information

---

## 🛠 Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- Axios
- Chart.js

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Web Scraping
- Axios
- Cheerio

### Other Tools
- Git & GitHub
- Postman
- Cron Jobs

---

## 📂 Project Structure

```
frontend/
backend/
 ├── models/
 ├── routes/
 ├── controllers/
 ├── middleware/
 ├── utils/
 └── server.js
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/Manasa-katikala/Ecommerce-product-price-tracker.git
```

### Install Dependencies

Frontend

```bash
cd frontend
npm install
npm start
```

Backend

```bash
cd backend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Workflow

1. User registers/login.
2. Add product URL.
3. Set target price.
4. Background scheduler checks prices.
5. Product prices are stored in MongoDB.
6. Alert generated when price falls below target.
7. Dashboard displays updated prices and price history.

---

## Future Enhancements

- Email Notifications
- SMS Alerts
- Telegram Notifications
- Multi-vendor Price Comparison
- Wishlist Support
- AI Price Prediction
- Mobile Responsive UI
- Browser Extension

---

## Learning Outcomes

- MERN Stack Development
- REST APIs
- MongoDB Integration
- Authentication
- Web Scraping using Cheerio
- Cron Jobs
- Data Visualization
- Full Stack Deployment

---

## Author

**Manasa Katikala**

GitHub:
https://github.com/Manasa-katikala

LinkedIn:
https://www.linkedin.com/in/manasa-katikala-a61b09385/        


---

# 📸 Project Screenshots

## Landing Page

![Landing Page](images/page%201.jpeg)

---

## Login Page

![Login Page](images/page%202.jpeg)

---

## Dashboard

![Dashboard](images/page%203.jpeg)

---

## Add Product

![Add Product](images/page%204.jpeg)

---

## Alerts

![Alerts](images/page%205.jpeg)

---

## Price History

![Price History](images/page%206.jpeg)
