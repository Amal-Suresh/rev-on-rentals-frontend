Here’s an updated **README** with icons and a more visually appealing format using Markdown. I’ve used **emoji icons** to represent various sections and make it more engaging:

---

# **Rev-On Rental - Bike Rental Platform** 🏍️

Rev-On Rental is a **full-stack bike rental platform** built with **MERN stack** (MongoDB, Express.js, React, Node.js). It allows users to rent bikes for specific times and dates. Partners can list their bikes, track bookings, and manage revenue. The platform also provides an **admin dashboard** for managing users, partners, and offers features like coupons and online payments.

---

## **Table of Contents** 📚

1. [Introduction](#introduction) 
2. [Features](#features) 
3. [Screenshots](#screenshots) 
4. [Technologies Used](#technologies-used) 
5. [Installation](#installation) 
6. [Contributing](#contributing) (Optional) 
7. [License](#license) (Optional) 

---

## **Introduction** 📖

Rev-On Rental is a platform that offers easy **bike rentals** for users. It connects users with partners who can list their bikes on the platform. The project provides features like **online payment**, **partner revenue tracking**, an **admin dashboard**, and a **real-time chat system** for user support.

---

## **Features** 🛠️

### **User Features:**
- **🚶 Register** and log in using **OTP**.
- **🚴 Browse** available bikes based on location and availability.
- **📅 Rent bikes** for specific dates and times.
- **🔒 Upload driving license** for verification.
- **💳 Make payments** through **Razorpay**.
- **📝 View rental history**.

### **Partner Features:**
- **🏍️ Sign up** to rent bikes on the platform.
- **📊 Track bike bookings**.
- **💰 View earnings and revenue**.
- **🔧 Manage bike listings**, availability, and pricing.
- **📈 View performance** on the dashboard.

### **Admin Features:**
- **👩‍💼 Manage users and partners**.
- **📊 Monitor bike rentals and payments**.
- **🎫 Create and manage discount coupons**.
- **📑 Track all activities** on the platform.
- **📉 View statistics** for platform usage.

### **Real-Time Chat:**
- **💬 Users** can contact admins for queries through the **real-time chat feature**.
- **👨‍💼 Admins** can respond to user queries promptly.
- Real-time communication is powered by **Socket.io**.

---

## **Screenshots** 📸

![User Dashboard](./screenshots/user-dashboard.png)  
*User Dashboard showing available bikes and booking options.*

![Admin Dashboard](./screenshots/admin-dashboard.png)  
*Admin Dashboard showing user and partner management.*

![Partner Dashboard](./screenshots/partner-dashboard.png)  
*Partner Dashboard showing bookings and revenue.*

---

## **Technologies Used** ⚙️

- **Frontend:**
  - React.js ⚛️
  - Redux (for state management) 🛠️
  - Socket.io-client (for real-time chat) 💬
  - Tailwind CSS (for styling) 🌟
  
- **Backend:**
  - Node.js (Express.js) 🚀
  - MongoDB (database) 🗄️
  - Mongoose (ODM) 🐱
  - Socket.io (for real-time communication) 💻
  - JWT (JSON Web Tokens for authentication) 🔑
  - Razorpay (for online payments) 💳

---

## **Installation** ⚡

### **1. Clone the repository**

Clone both the frontend and backend repositories to your local machine:

```bash
git clone https://github.com/yourusername/rev-on-rental-frontend.git
git clone https://github.com/yourusername/rev-on-rental-backend.git
```

### **2. Set up the Backend**

1. Navigate to the backend folder:
   ```bash
   cd rev-on-rental-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set environment variables in `.env` file:

   ```
   KEY_ID=your_razorpay_key_id
   KEY_SECRET=your_razorpay_key_secret
   DATABASE=mongodb_connection_url
   EMAIL_USER=your_email_user
   EMAIL_PASSWORD=your_email_password
   JWT_SECRET_KEY=your_jwt_secret_key
   ```

4. Run the backend server:
   ```bash
   npm start
   ```

### **3. Set up the Frontend**

1. Navigate to the frontend folder:
   ```bash
   cd rev-on-rentals-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set environment variables in `.env` file:

   ```
   # Razorpay API Keys
KEY_ID='rzp_your_key_id_here'
KEY_SECRET='your_key_secret_here'

# Database Connection URL
DATABASE='your_mongo_connection_string_here'

# Email Configuration
EMAIL_USER='your_email@example.com'
EMAIL_PASSWORD='your_email_password_here'

# Cloudinary Configuration (for file storage)
CLOUD_NAME='your_cloud_name_here'
CLOUD_API_KEY='your_cloud_api_key_here'
CLOUD_API_SECRET='your_cloud_api_secret_here'

# JWT Secret Key
JWT_SECRET_KEY='your_jwt_secret_key_here'

   ```

4. Run the frontend server:
   ```bash
   npm start
   ```

---