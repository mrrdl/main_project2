---

👜 Scatch Store

**Scatch Store** is a premium bag e-commerce platform built with Node.js, Express, MongoDB, and EJS. It offers a seamless shopping experience with features like user authentication, product browsing, cart management, and order processing.

---

## 🚀 Features

- **User Authentication**: Secure login and registration using JWT.
- **Product Management**: Browse and manage a catalog of premium bags.
- **Shopping Cart**: Add, remove, and adjust product quantities.
- **Order Processing**: Place orders with real-time updates.
- **Admin Panel**: Manage products, categories, and orders.
- **Responsive Design**: Optimized for all devices using Tailwind CSS.

---

## 🛠️ Tech Stack

- **Frontend**: EJS, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Deployment**: Vercel

---

## 📁 Project Structure

```
scatch_store/
├── config/           # Configuration files
├── controllers/      # Route handlers
├── middlewares/      # Custom middleware
├── models/           # Mongoose models
├── public/           # Static assets
├── routes/           # Express routes
├── utils/            # Utility functions
├── views/            # EJS templates
├── app.js            # Main application file
├── package.json      # Project metadata and scripts
└── vercel.json       # Vercel deployment configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) instance running

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mrrdl/scatch_store.git
   cd scatch_store
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application:**

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

---

## 🧪 Scripts

- **Start the server:**

  ```bash
  npm start
  ```

- **Run in development mode with nodemon:**

  ```bash
  npm run dev
  ```

---

## 📦 Deployment

The application is configured for deployment on [Vercel](https://vercel.com/). Ensure that your `vercel.json` is set up correctly and that environment variables are configured in the Vercel dashboard.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
