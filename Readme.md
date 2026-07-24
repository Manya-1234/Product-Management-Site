# Product Management System

A full-stack **Product Management System** built using **React.js, Node.js, Express.js, and MongoDB**. The application allows users to perform complete CRUD operations on products, upload images, search products by name, and filter them by category through a clean and user-friendly interface.

---
## Live Demo

- **Frontend:** https://product-management-site-gold.vercel.app
- **Backend API:** https://product-management-site.onrender.com

## Features

- Add new products with image upload
- View all products
- Edit existing products
- Update product image (optional while editing)
- Delete products
- Search products by name
- Filter products by category
- Toast notifications for success and error messages
- Loading state during API requests

---

## Tech Stack

### Frontend
- React.js
- Axios
- CSS3
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Cloudinary

---

## Project Structure

```
Product-Management-System
│
├── backend
│   ├── public
│   ├── src
│   │   ├── controllers
│   │   ├── db
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   ├── app.js
│   │   ├── constants.js
│   │   └── index.js
│   ├── .env.sample
│   ├── .gitignore
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── App.js
│   │   └── index.js
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Fetch all products |
| POST | `/api/products` | Add a new product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
```

---

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

CORS_ORIGIN=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`frontend/.env`)

```env
REACT_APP_API_URL=http://localhost:8000/api/products
```

---

## Running the Project

### Start the Backend

```bash
cd backend
npm run dev
```

### Start the Frontend

```bash
cd frontend
npm start
```

The frontend will run at:

```
http://localhost:3000
```

The backend will run at:

```
http://localhost:8000
```