# 🛍️ E-commerce Backend API

A robust, production-ready RESTful API for an E-commerce platform. Built with Node.js, Express, and MongoDB, featuring secure authentication, role-based access control (RBAC), and complex data relationships.

**Live Demo:** https://ecommerce-api-c0c8.onrender.com

---

## 🚀 Key Features & Architecture

This project goes beyond basic CRUD to implement professional backend patterns:

* **🔐 Secure Authentication:** Implements **JWT (JSON Web Tokens)** for stateless authentication and **BCrypt** for password hashing.
* **🛡️ Role-Based Access Control (RBAC):** Custom middleware ("Bouncers") that strictly enforces permissions. Only **Admins** can manage inventory, while **Customers** can shop.
* **🛒 Smart Data Modeling:**
    * **Embedded Schemas:** The Shopping Cart is *embedded* directly inside the User document for high-performance read/write operations.
    * **Referencing:** Orders are stored in a separate collection but reference Users and Products to maintain data integrity.
    * **Mongoose Population:** Utilized to dynamically fetch full product details from the `cart` array when viewing.
* **💰 Server-Side Logic:** Prices are calculated securely on the server during checkout to prevent client-side manipulation.
* **⚠️ Centralized Error Handling:** A dedicated error middleware captures all exceptions, ensuring consistent JSON error responses and hiding stack traces in production.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas (Cloud NoSQL)
* **ODM:** Mongoose
* **Dev Tools:** Nodemon, Postman, Git/GitHub
* **Deployment:** Render

---

## 📂 Project Structure

```text
ecommerce-api/
├── middleware/
│   ├── authMiddleware.js   # Checks JWT tokens & Admin privileges
│   └── errorMiddleware.js  # Centralized error handling logic
├── models/
│   ├── userModel.js        # User Schema + Embedded Cart Schema
│   ├── productModel.js     # Product Inventory Blueprint
│   └── orderModel.js       # Order/Receipt Blueprint
├── routes/
│   ├── authRoutes.js       # Register, Login, Profile
│   ├── productRoutes.js    # Inventory management
│   ├── cartRoutes.js       # Add/Remove items logic
│   └── orderRoutes.js      # Checkout & Payment logic
├── index.js                # Server entry point
└── .env                    # Environment variables (Ignored by Git)
--- '```text

## 🔌 API Endpoints Reference

### 1. Authentication

| Method | Endpoint | Description | Auth? |
| :--- | :--- | :--- | :--- |
| POST | /api/auth/register | Create a new account | No |
| POST | /api/auth/login | Login to receive JWT Token | No |
| GET | /api/auth/me | Get current user profile | Yes |

### 2. Products

| Method | Endpoint | Description | Auth? |
| :--- | :--- | :--- | :--- |
| GET | /api/products | View full inventory | No |
| POST | /api/products | Add new product | Admin |

### 3. Shopping Cart

| Method | Endpoint | Description | Auth? |
| :--- | :--- | :--- | :--- |
| GET | /api/cart | View cart (Populated with Product details) | Yes |
| POST | /api/cart/add | Add item / Update quantity | Yes |
| DELETE | /api/cart/remove/:productId | Remove specific item | Yes |

### 4. Orders (Checkout)

| Method | Endpoint | Description | Auth? |
| :--- | :--- | :--- | :--- |
| POST | /api/orders/checkout | Convert Cart to Order, Calculate Total, Clear Cart | Yes |

---

## 🧪 How to Run Locally

1.  **Clone the Repository:**
    git clone https://github.com/007rahulM/ecommerce-api.git
    cd ecommerce-api

2.  **Install Dependencies:**
    npm install

3.  **Environment Setup:**
    Create a .env file in the root directory:
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    NODE_ENV=development

4.  **Start the Server:**
    npm run dev

---

## 🧠 Concepts Demonstrated

This project demonstrates mastery of the following core backend concepts:
* **RESTful API Design**
* **Stateless Authentication (JWT)**
* **Database Schema Design (One-to-Many Relationships)**
* **Middleware Pattern in Express**
* **Production Deployment & Environment Management**