# 🍬 Sweet Shop — Full Stack Web Application (TDD-Based)

Sweet Shop is a full-stack web application for managing and showcasing sweets.
The project is built with a strong focus on **Test-Driven Development (TDD)**,
clean architecture, and professional Git practices.

This repository contains **both backend and frontend code**, developed
incrementally with meaningful commits and transparent AI usage.

---

## 🚀 Features

### Backend
- User Registration & Login
- JWT-ready Authentication Middleware
- Sweet CRUD APIs (Create, Read, Delete)
- Input Validation
- Clean separation of concerns (controllers, routes, middleware, services)
- Extensive automated tests using TDD

### Frontend
- Authentication flow (Login)
- Sweet listing page
- Protected API usage
- Global auth state using Context API
- Clean and scalable folder structure

---

## 🧰 Tech Stack

### Backend
- Node.js
- Express.js
- Jest & Supertest (Testing)
- JWT (middleware prepared)
- PostgreSQL (DB layer ready / pluggable)

### Frontend
- React.js
- Context API
- Fetch API
- CSS

---

## 🧠 Project Architecture

### Backend Structure:

backend/
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── validators/
│ └── services/
├── tests/
├── app.js
├── server.js
├── jest.config.js
└── package.json


### Frontend Structure:

frontend/
├── public/
├── src/
│ ├── pages/
│ ├── components/
│ ├── context/
│ ├── utils/
│ ├── App.js
│ └── index.js
└── package.json



---

## 🧪 Test-Driven Development (TDD)

The backend was developed using **Red → Green → Refactor** cycles.

### Covered Test Scenarios
- User Registration
- User Login
- Authentication Middleware
- Sweet CRUD APIs
- Validation (missing fields, unauthorized access)

All core backend logic is covered with **automated Jest tests**.

---

## 🔄 Git & Version Control Practices

- Git used throughout development
- Small, frequent, descriptive commits
- Clear commit history showing TDD workflow
- No code dumping
- No `node_modules` or `.env` committed

---

## ▶️ Run the Project Locally

### 1️⃣ Clone the Repository

git clone <your-github-repo-url>
cd sweet-shop-tdd

### 2️⃣ Run Backend
cd backend
npm install
npm test
npm start

Backend runs on:
http://localhost:3000

### 3️⃣ Run Frontend
cd frontend
npm install
npm start

Frontend runs on:
http://localhost:3000


### 🧪 Test Report

Backend:
- Jest test suites for:
- Auth (Register & Login)
- JWT Middleware
- Sweet CRUD APIs
- Validation
✅ All tests passing

Frontend:
- Basic render test
- Context-aware testing using AuthProvider


### 🤖 My AI Usage

AI Tools Used
- ChatGPT
- Claude

How I Used AI
- Generating initial test case scaffolding
- Assisting with TDD flow (Red → Green → Refactor)
- Debugging test failures and runtime issues
- Improving code structure and readability
- Writing clean commit messages and documentation


### Reflection

AI significantly improved productivity by reducing boilerplate and debugging time.
All architectural decisions, refactoring steps, and final implementations were
reviewed and finalized by me. AI acted as a development assistant, not a
replacement for engineering judgment.


### ✅ Final Notes

- Clean, runnable full-stack project
- Strong TDD backend implementation
- Transparent AI usage
- Ready for evaluation and interview discussion


### 📋 Submission Checklist

 - Public Git repository
 - Backend with TDD
 - Clean architecture
 - Frontend integration
 - AI usage documented
 - Tests included


### THANK YOU 
## --Raj Singh
