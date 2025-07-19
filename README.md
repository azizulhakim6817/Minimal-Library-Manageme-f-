Frontend Live Like : https://minimal-library-manageme-f.vercel.app/books

# Minimal Library Management System 📚

A **Minimal Library Management System** that enables users to manage books, borrow them, and view a borrow summary. The project is built using **React**, **Redux Toolkit Query (RTK Query)**, and **TypeScript**. The goal is to provide a clean and functional client-side application that interacts with a backend RESTful API for book and borrow management.

## Project Overview

This system allows users to:

- View a list of books
- Perform CRUD (Create, Read, Update, Delete) operations on books
- Borrow books and track borrow details
- View a simple borrow summary of all borrowed books

**Key Features**:

- No user authentication
- Book and borrow management functionalities
- Simple and responsive UI design using **Tailwind CSS**
- Full CRUD operations for books and borrow management
- Real-time updates and feedback with toast notifications

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Landing Page Components](#landing-page-components)
- [UI/UX Design](#uiux-design)
- [Bonus Features](#bonus-features)
- [Backend Requirements](#backend-requirements)
- [Frontend + API Integration](#frontend--api-integration)
- [Installation Instructions](#installation-instructions)
- [Usage Instructions](#usage-instructions)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

### 1. Public Routes 🚀

All pages are accessible without login or authentication, focusing on book and borrowing functionalities.

### 2. Book Management 🛠️

- **Book List Table**: Display all books with columns like title, author, genre, ISBN, copies, availability, and actions.
- **Actions**:
  - **Edit Book**: Open a form to edit book details. On submit, updates via API and reflects instantly in UI.
  - **Delete Book**: Open a confirmation dialog before deleting the book.
  - **Borrow Book**: Opens a simple form to borrow a book with fields for quantity and due date.
  - **Add New Book**: Button to create new books with fields for title, author, genre, ISBN, description, copies, and availability.

### 3. Borrow Book

- **Borrow Book Form**: Form that allows users to borrow a book by selecting quantity and due date.
- **Business Logic**:
  - Quantity cannot exceed available copies.
  - Books with 0 available copies are marked as unavailable.

### 4. Borrow Summary

Displays a list of borrowed books with the total quantity borrowed for each book.

---

## Landing Page Components

1. **Navbar**: Simple navigation bar with links:

   - All Books
   - Add Book
   - Borrow Summary

2. **Book Table/List/Grid**: Displays the list of books with actions such as view, edit, delete, and borrow.

3. **Footer**: Standard footer with site information or credits.

---

## UI/UX Design

### Minimalist UI:

- Clean and featureful UI designed with **Tailwind CSS** or plain CSS.

### Responsive Design:

- Fully responsive layout for mobile, tablet, and desktop devices.

---

## Bonus Features (Optional)

| Feature               | Bonus Points |
| --------------------- | ------------ |
| Optimistic UI Updates | +2           |
| Toast Notifications   | +2           |
| Responsive Layout     | +4           |
| Type-Safe Forms       | +2           |

---

## Backend Requirements (Modular/MVC Pattern)

- **Database**: MongoDB with Mongoose
- **Collections**:
  - **Books**: Title, Author, Genre, ISBN, Description, Copies, Available
  - **Borrows**: Linked to book, quantity, due date

### Book Management:

- Implement CRUD operations for books.

### Borrow Management:

- Ensure borrow operations check availability of copies.

### Error Handling:

- Provide consistent error messages for API calls.

---

## Frontend + API Integration

### 1. API Integration

- Consume backend API via **RTK Query** in the frontend.

### 2. State Management

- **Redux Toolkit** with **RTK Query** for managing states related to books and borrows.

### 3. Technology Stack

| Layer          | Technology                         |
| -------------- | ---------------------------------- |
| **Frontend**   | React, TypeScript                  |
| **State Mgmt** | Redux Toolkit, RTK Query           |
| **Backend**    | Node.js, Express.js                |
| **Database**   | MongoDB, Mongoose                  |
| **Styling**    | Tailwind CSS / Basic CSS Framework |

---

## Installation Instructions

### 1. Clone the repository

To get started, clone the repository:

```bash
git clone https://github.com/azizulhakim6817/Minimal-Library-Manageme-f-.git
cd Minimal-Library-Manageme-f-
2. Install dependencies
Run the following command to install all dependencies:

bash
Copy
Edit
npm install
3. Set up environment variables
Create a .env file and add the following environment variables:

bash
Copy
Edit
DB_URI=mongodb://localhost:27017/library
PORT=5000
4. Run the project
To start the server in development mode:

bash
Copy
Edit
npm run dev
For production:

bash
Copy
Edit
npm start
Usage Instructions
Frontend: Open the app in your browser at http://localhost:3000/.

Backend API: You can test the API via Postman at http://localhost:5000/api/.

Contributing
If you'd like to contribute to this project, please follow these steps:

Fork the repository.

Clone the repository to your local machine:

bash
Copy
Edit
git clone https://github.com/yourusername/Minimal-Library-Manageme-f-.git
Create a new branch for your changes:

bash
Copy
Edit
git checkout -b feature/your-feature-name
Make your changes and commit them:

bash
Copy
Edit
git commit -m "Added feature or fixed bug"
Push your changes to your fork:

bash
Copy
Edit
git push origin feature/your-feature-name
Open a pull request to the main repository.
```
