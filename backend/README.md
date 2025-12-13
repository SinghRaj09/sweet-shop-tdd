# 🍬 Sweet Shop Backend - Complete Setup Guide

## 📋 Overview

This is a complete, production-ready backend API for the Sweet Shop Management System built with:
- **Node.js & Express** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

This will install:
- express (Web framework)
- pg (PostgreSQL client)
- bcrypt (Password hashing)
- jsonwebtoken (JWT auth)
- cors (Cross-origin requests)
- dotenv (Environment variables)
- express-validator (Input validation)
- nodemon (Development server)
- jest & supertest (Testing)

### 2. Setup PostgreSQL Database

#### Option A: Using PostgreSQL Locally

**Install PostgreSQL:**
- **Ubuntu/Debian:** `sudo apt-get install postgresql postgresql-contrib`
- **macOS:** `brew install postgresql`
- **Windows:** Download from [postgresql.org](https://www.postgresql.org/download/)

**Create Database:**
```bash
# Access PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE sweet_shop;

# Create user (optional, or use default postgres user)
CREATE USER sweet_shop_user WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE sweet_shop TO sweet_shop_user;

# Exit
\q
```

#### Option B: Using Docker

```bash
docker run --name sweet-shop-postgres \
  -e POSTGRES_DB=sweet_shop \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:15
```

### 3. Configure Environment Variables

Create `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=sweet_shop

# JWT Configuration (IMPORTANT: Change this!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_minimum_32_characters
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

**⚠️ IMPORTANT:** Change `JWT_SECRET` to a random, secure string in production!

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
==================================================
🍬 Sweet Shop API Server
==================================================
✅ Server is running on http://localhost:3000
✅ Environment: development
✅ Database: sweet_shop
✅ Connected to PostgreSQL database
✅ Database tables initialized successfully
✅ Default admin user created
   Email: admin@sweetshop.com
   Password: Admin@123
==================================================
```

### 5. Test the API

**Health Check:**
```bash
curl http://localhost:3000/health
```

**Register a User:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "SecurePass@123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass@123"
  }'
```

**Get All Sweets:**
```bash
curl http://localhost:3000/api/sweets
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── AuthController.js
│   │   └── SweetController.js
│   ├── services/            # Business logic
│   │   ├── AuthService.js
│   │   └── SweetService.js
│   ├── models/              # Database models
│   │   ├── User.js
│   │   └── Sweet.js
│   ├── middleware/          # Custom middleware
│   │   ├── authenticate.js
│   │   └── authorizeAdmin.js
│   ├── routes/              # API routes
│   │   ├── auth.routes.js
│   │   └── sweet.routes.js
│   └── database/            # Database config
│       └── db.js
├── tests/                   # Test files
├── .env                     # Environment variables
├── .env.example            # Environment template
├── app.js                  # Express app setup
├── server.js               # Server entry point
└── package.json            # Dependencies
```

## 🔐 API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
Register a new user

**Request:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### POST /api/auth/login
Login user

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### GET /api/auth/me
Get current user (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Sweet Endpoints

#### GET /api/sweets
Get all sweets (public)

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Chocolate Truffle",
    "category": "Chocolate",
    "price": 70,
    "quantity": 50,
    "description": "Rich dark chocolate truffle",
    "imageUrl": "https://example.com/image.jpg",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /api/sweets/search
Search sweets (public)

**Query Parameters:**
- `name` - Search by name (partial match)
- `category` - Filter by category
- `minPrice` - Minimum price
- `maxPrice` - Maximum price

**Example:**
```
GET /api/sweets/search?name=chocolate&minPrice=50&maxPrice=100
```

#### GET /api/sweets/:id
Get sweet by ID (public)

#### GET /api/sweets/categories
Get all categories (public)

**Response (200):**
```json
["Chocolate", "Indian", "Bakery", "Candy"]
```

#### POST /api/sweets
Create new sweet (admin only)

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request:**
```json
{
  "name": "Chocolate Truffle",
  "category": "Chocolate",
  "price": 70,
  "quantity": 50,
  "description": "Rich dark chocolate truffle",
  "imageUrl": "https://example.com/image.jpg"
}
```

#### PUT /api/sweets/:id
Update sweet (admin only)

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request:**
```json
{
  "name": "Updated Name",
  "price": 80
}
```

#### DELETE /api/sweets/:id
Delete sweet (admin only)

**Headers:**
```
Authorization: Bearer <admin-token>
```

#### POST /api/sweets/:id/purchase
Purchase sweet (authenticated users)

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "quantity": 2
}
```

**Response (200):**
```json
{
  "message": "Purchase successful",
  "sweet": {
    "id": 1,
    "name": "Chocolate Truffle",
    "quantity": 48
  }
}
```

#### POST /api/sweets/:id/restock
Restock sweet (admin only)

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request:**
```json
{
  "quantity": 20
}
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sweets Table
```sql
CREATE TABLE sweets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Purchases Table
```sql
CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  sweet_id INTEGER REFERENCES sweets(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  total_price DECIMAL(10, 2) NOT NULL,
  purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Security Features

- ✅ **Password Hashing** - Bcrypt with salt rounds
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Input Validation** - Express-validator
- ✅ **SQL Injection Protection** - Parameterized queries
- ✅ **CORS Configuration** - Controlled origin access
- ✅ **Role-Based Access Control** - Admin vs User permissions
- ✅ **Error Handling** - Proper error responses

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## 🔍 Troubleshooting

### Cannot connect to database
**Problem:** Connection refused or authentication failed

**Solution:**
1. Check PostgreSQL is running: `sudo systemctl status postgresql`
2. Verify credentials in `.env`
3. Ensure database exists: `psql -U postgres -l`
4. Check firewall/network settings

### Port already in use
**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port in .env
PORT=3001
```

### JWT errors
**Problem:** "Invalid token" or "Token expired"

**Solution:**
1. Ensure JWT_SECRET is set in `.env`
2. Check token is being sent correctly in headers
3. Verify token hasn't expired (24h default)

### Database tables not created
**Problem:** Tables don't exist

**Solution:**
Server automatically creates tables on startup. If issues persist:
```bash
# Connect to database
psql -U postgres -d sweet_shop

# Check tables
\dt

# If missing, restart server
npm run dev
```

## 📊 Default Data

The server automatically creates:

**Admin User:**
- Email: admin@sweetshop.com
- Password: Admin@123
- Role: admin

**Sample Sweets:** 10 sample sweets across different categories

## 🚢 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
DB_NAME=sweet_shop
JWT_SECRET=very-long-random-secure-string-at-least-32-characters
CORS_ORIGIN=https://your-frontend-domain.com
```

### Deployment Platforms

**Heroku:**
```bash
heroku create sweet-shop-api
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

**Railway:**
```bash
railway init
railway add postgresql
railway up
```

**DigitalOcean/AWS/GCP:**
- Use PM2 for process management
- Setup Nginx as reverse proxy
- Use managed PostgreSQL service

## 📝 API Response Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (no/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate email)
- `500` - Internal Server Error

## 💡 Best Practices

- Always use environment variables for sensitive data
- Never commit `.env` file to git
- Use strong JWT secrets (minimum 32 characters)
- Implement rate limiting in production
- Use HTTPS in production
- Regular database backups
- Monitor error logs
- Keep dependencies updated

## 🎯 Next Steps

1. ✅ Backend is running
2. ✅ Database is connected
3. ✅ API endpoints tested
4. 👉 Connect frontend to backend
5. 👉 Test authentication flow
6. 👉 Test CRUD operations
7. 👉 Deploy to production

---

**Need help?** Check server logs for detailed error messages!
