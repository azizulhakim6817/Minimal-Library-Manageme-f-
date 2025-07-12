Frontend Live Like : https://minimal-library-manageme-f.vercel.app/books

# 📚 Minimal Library Management System

A simple and minimal **Library Management System** built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

---

## 🚀 Features

✅ User Authentication (JWT)  
✅ Role-Based Access Control (Admin, User)  
✅ Add / Update / Delete Books  
✅ Borrow & Return Books  
✅ View All Users & Books  
✅ Secure Password Hashing (bcryptjs)

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** (Mongoose)
- **JWT** for authentication
- **bcryptjs** for password hashing

---

## 🗂️ Project Structure

src/
├── app/
│ ├── modules/
│ │ ├── auth/
│ │ ├── user/
│ │ ├── book/
│ ├── utils/
│ ├── errorHelpers/
├── server.ts

yaml
Copy
Edit

---

## 🧩 Installation

```bash
# Clone the repository
git clone https://github.com/azizulhakim6817/Minimal-Library-Manageme-f.git

# Go into the project directory
cd Minimal-Library-Manageme-f

# Install dependencies
npm install

# Create a `.env` file
cp .env.example .env
⚙️ Environment Variables
Create a .env file and add the following:

env
Copy
Edit
PORT=5000
MONGODB_URI=mongodb://localhost:27017/minimal-library
JWT_SECRET=your_jwt_secret
🚀 Run the Project
bash
Copy
Edit
# Development
npm run dev

# Production build
npm run build
npm start
🛡️ API Endpoints
Method	Endpoint	Description
POST	/api/v1/auth/login	Login user
POST	/api/v1/users	Create new user
GET	/api/v1/users	Get all users (Admin only)
POST	/api/v1/books	Add new book
GET	/api/v1/books	Get all books
PATCH	/api/v1/books/:id	Update book
DELETE	/api/v1/books/:id	Delete book