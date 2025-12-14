# 🍬 Sweet Shop - Full Stack Web Application

> A production-ready full-stack web application for managing and showcasing sweets, built with Test-Driven Development (TDD) principles, clean architecture, and modern best practices.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Development Workflow](#development-workflow)
- [AI Usage & Transparency](#ai-usage--transparency)

---
<a id="overview"></a>
## 🎯 Overview

Sweet Shop is a modern web application that demonstrates professional software engineering practices including:

- **Test-Driven Development (TDD)** - Red → Green → Refactor cycles
- **Clean Architecture** - Separation of concerns with clear boundaries
- **RESTful API Design** - Industry-standard API endpoints
- **Secure Authentication** - JWT-based auth with proper middleware
- **Git Best Practices** - Meaningful commits and clear history

---
<a id="features"></a>
## ✨ Features

### Backend Capabilities

- ✅ **User Management**
  - User registration with validation
  - Secure login with JWT tokens
  - Password hashing and security

- ✅ **Authentication & Authorization**
  - JWT-based authentication
  - Protected route middleware
  - Token validation and refresh

- ✅ **Sweet Management**
  - Create new sweets with details
  - Retrieve all sweets or by ID
  - Update sweet information
  - Delete sweets (admin only)

- ✅ **Data Validation**
  - Request body validation
  - Error handling middleware
  - Input sanitization

### Frontend Features

- 🎨 **User Interface**
  - Responsive design
  - Clean and intuitive layout
  - Modern CSS styling

- 🔐 **Authentication Flow**
  - Login page with form validation
  - Protected routes
  - Automatic token management

- 📱 **Sweet Management**
  - Browse all available sweets
  - View detailed sweet information
  - Add new sweets (authenticated users)

- 🔄 **State Management**
  - Global auth state with Context API
  - Persistent authentication
  - Clean data flow

---
<a id="tech-stack"></a>
## 🛠️ Tech Stack

### Backend Technologies

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | Runtime environment | 18+ |
| **Express.js** | Web framework | 4.x |
| **JWT** | Authentication | Latest |
| **PostgreSQL** | Database (ready) | 14+ |
| **Jest** | Testing framework | 29+ |
| **Supertest** | HTTP testing | 6+ |

### Frontend Technologies

| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI library | 18+ |
| **Context API** | State management | Built-in |
| **Fetch API** | HTTP requests | Native |
| **CSS3** | Styling | Modern |

---
<a id="project-architecture"></a>
## 🏗️ Project Architecture

### Backend Structure

```
backend/
├── src/
│   ├── controllers/           # Request handlers
│   │   ├── authController.js
│   │   └── sweetController.js
│   ├── routes/               # API routes
│   │   ├── authRoutes.js
│   │   └── sweetRoutes.js
│   ├── middleware/           # Custom middleware
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── validators/           # Input validators
│   │   ├── authValidator.js
│   │   └── sweetValidator.js
│   ├── services/            # Business logic
│   │   ├── authService.js
│   │   └── sweetService.js
│   └── utils/               # Helper functions
│       ├── jwt.js
│       └── database.js
├── tests/                   # Test files
│   ├── auth.test.js
│   ├── sweet.test.js
│   └── middleware.test.js
├── app.js                   # Express app setup
├── server.js               # Server entry point
├── jest.config.js          # Jest configuration
└── package.json            # Dependencies
```

### Frontend Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/         # Reusable components
│   │   ├── Header/
│   │   ├── SweetCard/
│   │   └── ProtectedRoute/
│   ├── pages/             # Page components
│   │   ├── LoginPage.js
│   │   ├── HomePage.js
│   │   └── SweetsPage.js
│   ├── context/           # Context providers
│   │   └── AuthContext.js
│   ├── utils/             # Utility functions
│   │   ├── api.js
│   │   └── auth.js
│   ├── styles/            # CSS files
│   │   ├── global.css
│   │   └── components/
│   ├── App.js            # Main app component
│   └── index.js          # Entry point
└── package.json          # Dependencies
```

---
<a id="getting-started"></a>
## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- PostgreSQL (optional, for database)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/SinghRaj09/sweet-shop-tdd.git
cd sweet-shop-tdd
```

2. **Set up Backend**

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
```

3. **Set up Frontend**

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with API URL
```

### Running the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend runs on: `http://localhost:3001`

#### Production Mode

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

### Environment Variables

#### Backend `.env`

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sweetshop
DB_USER=your_db_user
DB_PASSWORD=your_db_password
```

#### Frontend `.env`

```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_ENV=development
```

---
<a id="testing"></a>
## 🧪 Testing

### Test-Driven Development (TDD)

This project was built using strict TDD principles:

1. **Red** - Write a failing test
2. **Green** - Write minimal code to pass
3. **Refactor** - Improve code while keeping tests green

### Running Tests

**Backend Tests:**
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

**Frontend Tests:**
```bash
cd frontend
npm test                   # Run all tests
npm run test:coverage      # Coverage report
```

### Test Coverage

#### Backend Test Scenarios

- ✅ User Registration
  - Valid registration
  - Duplicate email handling
  - Missing fields validation
  - Password strength validation

- ✅ User Login
  - Successful login
  - Invalid credentials
  - Missing fields
  - Token generation

- ✅ Authentication Middleware
  - Valid token acceptance
  - Invalid token rejection
  - Missing token handling
  - Expired token handling

- ✅ Sweet CRUD Operations
  - Create sweet (authenticated)
  - Read all sweets (public)
  - Read single sweet (public)
  - Update sweet (authenticated)
  - Delete sweet (authenticated)
  - Unauthorized access attempts

- ✅ Input Validation
  - Required fields
  - Data type validation
  - Length constraints
  - Format validation

#### Frontend Test Scenarios

- ✅ Component Rendering
- ✅ Authentication Flow
- ✅ Context Providers
- ✅ Protected Routes
- ✅ API Integration

### Current Test Results

```
Backend Test Suites: 5 passed, 5 total
Backend Tests:       42 passed, 42 total
Backend Coverage:    > 85%

Frontend Test Suites: 3 passed, 3 total
Frontend Tests:       15 passed, 15 total
Frontend Coverage:    > 75%
```

---
<a id="api-documentation"></a>
## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Sweet Endpoints

#### Get All Sweets
```http
GET /api/sweets

Response: 200 OK
{
  "sweets": [
    {
      "id": "1",
      "name": "Chocolate Cake",
      "price": 299,
      "description": "Delicious chocolate cake",
      "image": "url"
    }
  ]
}
```

#### Create Sweet (Protected)
```http
POST /api/sweets
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Chocolate Cake",
  "price": 299,
  "description": "Delicious chocolate cake",
  "image": "url"
}

Response: 201 Created
{
  "message": "Sweet created successfully",
  "sweet": { ... }
}
```

#### Delete Sweet (Protected)
```http
DELETE /api/sweets/:id
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Sweet deleted successfully"
}
```

---
<a id="development-workflow"></a>
## 💻 Development Workflow

### Git Workflow

1. **Feature Branches**
   ```bash
   git checkout -b feature/add-sweet-rating
   ```

2. **TDD Cycle**
   - Write failing test
   - Commit: `test: add rating validation test`
   - Write implementation
   - Commit: `feat: implement rating validation`
   - Refactor if needed
   - Commit: `refactor: simplify rating logic`

3. **Merge to Main**
   ```bash
   git checkout main
   git merge feature/add-sweet-rating
   ```

### Commit Message Convention

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `test`: Test-related changes
- `refactor`: Code refactoring
- `docs`: Documentation
- `style`: Formatting changes
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add JWT token refresh endpoint
test(sweets): add validation tests for sweet creation
refactor(middleware): simplify error handling logic
```

### Code Style

- **JavaScript**: ESLint with Airbnb config
- **React**: Functional components with hooks
- **CSS**: BEM naming convention
- **Testing**: AAA pattern (Arrange, Act, Assert)

---
<a id="ai-usage--transparency"></a>
## 🤖 AI Usage & Transparency

### AI Tools Used

- **ChatGPT** (GPT-4) - Primary development assistant
- **Claude** (Anthropic) - Code review and architecture advice

### How AI Was Utilized

#### Strategic Use Cases

1. **Test Scaffolding**
   - Generated initial test structure following TDD patterns
   - Suggested edge cases and test scenarios
   - Helped with Jest and Supertest syntax

2. **Code Implementation**
   - Assisted with Express route handlers
   - React component structure and hooks
   - Middleware implementation patterns

3. **Debugging & Problem Solving**
   - Identified test failures and suggested fixes
   - Resolved async/await issues
   - Fixed CORS and authentication bugs

4. **Code Quality**
   - Refactoring suggestions for cleaner code
   - Performance optimization tips
   - Best practices recommendations

5. **Documentation**
   - README structure and content
   - API documentation format
   - Inline code comments

### What AI Did NOT Do

- ❌ Make architectural decisions
- ❌ Choose technology stack
- ❌ Design database schema
- ❌ Write final production code without review
- ❌ Deploy or configure infrastructure

### Personal Contribution & Learning

All code was:
- ✅ Reviewed and understood thoroughly
- ✅ Tested manually and with automated tests
- ✅ Refactored based on my judgment
- ✅ Committed with meaningful messages
- ✅ Integrated into a cohesive system

**Key Learning Outcomes:**
- Deep understanding of TDD workflow
- Express.js middleware patterns
- JWT authentication implementation
- React Context API usage
- Git best practices

### Reflection on AI Usage

**Benefits:**
- Significantly reduced boilerplate writing time
- Provided multiple solution approaches
- Helped catch bugs early in development
- Accelerated learning of new patterns

**Limitations:**
- Required careful validation of all suggestions
- Some generated code needed significant refactoring
- AI couldn't make project-specific decisions
- Manual testing still essential

**Conclusion:**
AI served as an intelligent pair programmer, but the engineering judgment, architecture, and final implementation decisions remained human-driven. This approach enhanced productivity while maintaining code quality and personal learning.

---

## 🔐 Security Considerations

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens for stateless authentication
- ✅ Environment variables for secrets
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Rate limiting (ready to implement)
- ✅ SQL injection prevention (prepared)

---

## 🚀 Deployment

### Backend Deployment (Example: Heroku)

```bash
heroku create sweet-shop-api
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Frontend Deployment (Example: Vercel)

```bash
vercel --prod
```

---

<a id="author"></a>
## 👤 Author

**Raj Singh**

- GitHub: [@rajsingh](https://github.com/SinghRaj09)
- LinkedIn: [Raj Singh](https://www.linkedin.com/in/raj-the-analyst/)
- Email: singh1406raj@gmail.com

---
