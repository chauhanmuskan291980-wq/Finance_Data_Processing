# 💰 Finance Data Processing & Access Control Backend

A robust backend system built using **Node.js, Express.js, Prisma ORM**, and **PostgreSQL/SQLite**, designed to manage financial records with role-based access control and provide dashboard analytics.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Roles:
  - **Admin** – Full access
  - **Analyst** – Read + analytics
  - **Viewer** – Read-only

---

### 👤 User Management
- Register & login users
- Assign roles (Admin / Analyst / Viewer)
- Update user role & status
- Get current logged-in user

---

### 💳 Financial Records Management
- Create, update, delete records
- View all records
- Filter records by:
  - Type (Income / Expense)
  - Category
  - Date
- Pagination support
- Search functionality

---

### 📊 Dashboard APIs
- Total Income
- Total Expenses
- Net Balance
- Category-wise totals
- Recent activity
- Monthly trends

---

### 🛡️ Security & Enhancements
- JWT authentication middleware
- Role-based route protection
- Input validation & error handling
- Rate limiting
- Soft delete support

---

### 📄 API Documentation
- Swagger UI integrated
- Interactive API testing

---

### 🧪 Testing
- API testing using **Jest** and **Supertest**
- Covers:
  - Authentication
  - Protected routes
  - Records API

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL / SQLite  
- **ORM:** Prisma  
- **Authentication:** JWT  
- **Testing:** Jest, Supertest  
- **Documentation:** Swagger  

---

## 📁 Project Structure

```
src/
 ├── controller/
 ├── routes/
 ├── middleware/
 ├── tests/
 ├── app.js
 └── server.js

prisma/
 └── schema.prisma
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```
git clone https://github.com/your-username/finance-data-processing.git
cd finance-data-processing
```

---

### 2️⃣ Install dependencies
```
npm install
```

---

### 3️⃣ Setup environment variables

Create a `.env` file:

```
DATABASE_URL="file:./dev.db"   # or PostgreSQL URL
JWT_SECRET="your_secret_key"
PORT=3000
```

---

### 4️⃣ Setup database
```
npx prisma migrate dev --name init
npx prisma generate
```

---

### 5️⃣ Run the server
```
npm run dev
```

Server will run on:
```
http://localhost:3000
```

---

## 📘 API Documentation (Swagger)

Access Swagger UI at:
```
http://localhost:3000/api-docs
```

---

## 🔑 API Endpoints Overview

### Auth
- `POST /users/register`
- `POST /users/login`

### Users
- `GET /users/me`
- `GET /users` (Admin)
- `PATCH /users/:id` (Admin)

### Records
- `POST /records`
- `GET /records/all`
- `PATCH /records/:id`
- `DELETE /records/:id`

### Dashboard
- `GET /dashboard/summary`
- `GET /dashboard/categories`
- `GET /dashboard/recent`
- `GET /dashboard/trends`

---

## 🧪 Running Tests
```
npm test
```

---

## 📌 Assumptions
- Role-based permissions enforced at backend level
- JWT used for authentication
- Database schema designed for scalability
- Soft delete implemented instead of hard delete

---

## 💡 Future Improvements
- Refresh tokens
- Advanced analytics (yearly trends)
- Frontend dashboard (React)
- Docker deployment

---

## 👨‍💻 Author
**Muskan Chauhan**

---

## 📜 License
This project is for assessment purposes only.