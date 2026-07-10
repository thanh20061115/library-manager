# 📚 Library Management System

A Library Management System built with **NestJS**, **TypeScript**, **MySQL**, and **TypeORM**. The project provides RESTful APIs for managing books, readers, borrowing records, authentication, and dashboard statistics.

---

## 🚀 Features

### Authentication

* JWT Authentication
* Secure login API
* Protected routes with JWT Guard

### Book Management

* Create, update, delete books
* Search books
* Pagination
* Filter by category and author
* Sort books
* Track available quantity

### Reader Management

* Create, update, delete readers
* Search readers
* Pagination
* View borrowing history

### Borrow Record Management

* Borrow books
* Return books
* Automatic update of available book quantity
* Prevent borrowing when no books are available
* Borrow history
* Prevent deleting books/readers that are currently involved in active borrow records

### Dashboard

* Total books
* Total readers
* Total borrow records
* Books currently borrowed
* Books returned
* Available books

### API Documentation

* Swagger UI

---

## 🛠 Technologies

* NestJS
* TypeScript
* MySQL
* TypeORM
* JWT Authentication
* Passport
* Swagger
* Class Validator

---

## 📁 Project Structure

```text
server/
│
├── src/
│   ├── auth/
│   ├── books/
│   ├── readers/
│   ├── borrow-records/
│   ├── dashboard/
│   ├── app.module.ts
│   └── main.ts
│
├── package.json
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/thanh20061115/library-manager.git
```

Go to the server folder:

```bash
cd library-manager/server
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run start:dev
```

The server will run at:

```text
http://localhost:3000
```

---

## 📖 Swagger Documentation

Swagger UI:

```text
http://localhost:3000/api/docs
```

---

## 🗄 Database Configuration

Configure your MySQL database in `app.module.ts`:

```ts
host: 'localhost',
port: 3306,
username: 'root',
password: 'your_password',
database: 'library_management'
```

Enable synchronization during development:

```ts
synchronize: true
```

---

## 🔐 Authentication

Login endpoint:

```http
POST /api/auth/login
```

Example request:

```json
{
  "username": "admin",
  "password": "123456"
}
```

The API returns a JWT token.

Use the token in the Authorization header:

```text
Bearer <your_token>
```

---

## 📌 Main APIs

### Books

* GET /api/books
* GET /api/books/:id
* POST /api/books
* PUT /api/books/:id
* DELETE /api/books/:id

### Readers

* GET /api/readers
* GET /api/readers/:id
* POST /api/readers
* PUT /api/readers/:id
* DELETE /api/readers/:id

### Borrow Records

* GET /api/borrow-records
* GET /api/borrow-records/:id
* POST /api/borrow-records
* PATCH /api/borrow-records/:id/return
* DELETE /api/borrow-records/:id

### Dashboard

* GET /api/dashboard

---

## 📈 Current Progress

* ✅ Backend completed
* ✅ JWT Authentication
* ✅ CRUD APIs
* ✅ Borrow & Return workflow
* ✅ Dashboard statistics
* ✅ Search & Pagination
* ✅ Swagger Documentation

Frontend development using React + Vite is planned as the next phase.

---

## 👨‍💻 Author

**Thanh**
