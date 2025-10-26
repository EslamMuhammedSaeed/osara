# 🔌 Backend API Requirements for Admin Panel

This document outlines the expected backend API structure for the Admin Panel to work correctly.

---

## 📍 Base URL

```
http://localhost:3000/api
```

---

## 🔐 Authentication

### Headers

All protected endpoints should expect:

```
Authorization: Bearer <JWT_TOKEN>
```

### Token Generation

- Login endpoint should return a JWT token
- Token should be valid for a reasonable duration (e.g., 24 hours)
- Token should include admin user information

---

## 📋 API Endpoints

### 1. Admin Authentication

#### Register Admin

```http
POST /api/admin/register
Content-Type: application/json

Request Body:
{
  "email": "admin@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": 1,
      "email": "admin@example.com",
      "createdAt": "2025-10-25T10:00:00.000Z",
      "updatedAt": "2025-10-25T10:00:00.000Z"
    }
  },
  "message": "Admin registered successfully"
}
```

#### Login

```http
POST /api/admin/login
Content-Type: application/json

Request Body:
{
  "email": "admin@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": 1,
      "email": "admin@example.com",
      "createdAt": "2025-10-25T10:00:00.000Z",
      "updatedAt": "2025-10-25T10:00:00.000Z"
    }
  },
  "message": "Login successful"
}
```

#### Get Profile

```http
GET /api/admin/profile
Authorization: Bearer <TOKEN>

Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    "email": "admin@example.com",
    "createdAt": "2025-10-25T10:00:00.000Z",
    "updatedAt": "2025-10-25T10:00:00.000Z"
  },
  "message": "Profile fetched successfully"
}
```

#### Get Dashboard Stats

```http
GET /api/admin/dashboard/stats
Authorization: Bearer <TOKEN>

Response (200):
{
  "success": true,
  "data": {
    "totalOrders": 150,
    "pendingOrders": 25,
    "totalRevenue": 12500.50,
    "totalProfit": 3750.15,
    "recentOrders": [
      {
        "id": 1,
        "orderNumber": "6548",
        "name": "Joseph Wheeler",
        "email": "joseph@example.com",
        "phone": "+1234567890",
        "total": 654.00,
        "profit": 154.00,
        "status": "pending",
        "items": [
          {
            "id": 1,
            "productId": 1,
            "quantity": 2,
            "size": "M",
            "color": "blue",
            "price": 29.99
          }
        ],
        "createdAt": "2025-10-25T10:00:00.000Z"
      }
    ]
  },
  "message": "Stats fetched successfully"
}
```

---

### 2. Products Management

#### Get All Products

```http
GET /api/products?page=1&limit=10&sortBy=createdAt&sortOrder=desc&category=Clothing&minPrice=10&maxPrice=100&search=shirt
Authorization: Bearer <TOKEN>

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Classic T-Shirt",
      "description": "Comfortable cotton t-shirt",
      "price": 29.99,
      "originalPrice": 39.99,
      "colors": ["red", "blue", "white"],
      "sizes": ["S", "M", "L", "XL"],
      "images": ["image1.jpg", "image2.jpg"],
      "category": "Clothing",
      "subCategory": "T-Shirts",
      "material": "100% Cotton",
      "style": "Casual",
      "fit": "Regular",
      "stock": 100,
      "createdAt": "2025-10-25T10:00:00.000Z",
      "updatedAt": "2025-10-25T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### Get Product by ID

```http
GET /api/products/:id

Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Classic T-Shirt",
    // ... (same as above)
  },
  "message": "Product fetched successfully"
}
```

#### Get Categories

```http
GET /api/products/categories

Response (200):
{
  "success": true,
  "data": ["Clothing", "Accessories", "Shoes"],
  "message": "Categories fetched successfully"
}
```

#### Create Product

```http
POST /api/products
Authorization: Bearer <TOKEN>
Content-Type: application/json

Request Body:
{
  "name": "Classic T-Shirt",
  "description": "Comfortable cotton t-shirt",
  "price": 29.99,
  "originalPrice": 39.99,
  "colors": ["red", "blue", "white"],
  "sizes": ["S", "M", "L", "XL"],
  "images": ["image1.jpg", "image2.jpg"],
  "category": "Clothing",
  "subCategory": "T-Shirts",
  "material": "100% Cotton",
  "style": "Casual",
  "fit": "Regular",
  "stock": 100
}

Response (201):
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Classic T-Shirt",
    // ... (full product object)
  },
  "message": "Product created successfully"
}
```

#### Update Product

```http
PUT /api/products/:id
Authorization: Bearer <TOKEN>
Content-Type: application/json

Request Body:
{
  "price": 24.99,
  "stock": 150
}

Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    // ... (updated product object)
  },
  "message": "Product updated successfully"
}
```

#### Delete Product

```http
DELETE /api/products/:id
Authorization: Bearer <TOKEN>

Response (200):
{
  "success": true,
  "data": null,
  "message": "Product deleted successfully"
}
```

---

### 3. Orders Management

#### Get All Orders

```http
GET /api/orders?page=1&limit=10&sortBy=createdAt&sortOrder=desc&status=pending
Authorization: Bearer <TOKEN>

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "orderNumber": "6548",
      "items": [
        {
          "id": 1,
          "productId": 1,
          "quantity": 2,
          "size": "M",
          "color": "blue",
          "price": 29.99,
          "product": {
            "id": 1,
            "name": "Classic T-Shirt",
            "images": ["image1.jpg"]
          }
        }
      ],
      "name": "Joseph Wheeler",
      "email": "joseph@example.com",
      "phone": "+1234567890",
      "governorate": "Cairo",
      "city": "Nasr City",
      "address": "123 Main Street, Apt 4B",
      "notes": "Please call before delivery",
      "status": "pending",
      "total": 654.00,
      "profit": 154.00,
      "createdAt": "2025-10-25T10:00:00.000Z",
      "updatedAt": "2025-10-25T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "totalPages": 15
  }
}
```

#### Get Order by ID

```http
GET /api/orders/:id
Authorization: Bearer <TOKEN>

Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    // ... (full order object)
  },
  "message": "Order fetched successfully"
}
```

#### Create Order

```http
POST /api/orders
Content-Type: application/json

Request Body:
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "size": "M",
      "color": "blue"
    }
  ],
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "governorate": "Cairo",
  "city": "Nasr City",
  "address": "123 Main Street, Apt 4B",
  "notes": "Please call before delivery"
}

Response (201):
{
  "success": true,
  "data": {
    "id": 1,
    "orderNumber": "6548",
    // ... (full order object)
  },
  "message": "Order created successfully"
}
```

#### Update Order Status

```http
PATCH /api/orders/:id/status
Authorization: Bearer <TOKEN>
Content-Type: application/json

Request Body:
{
  "status": "processing"
}

Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    // ... (updated order object)
  },
  "message": "Order status updated successfully"
}
```

#### Delete Order

```http
DELETE /api/orders/:id
Authorization: Bearer <TOKEN>

Response (200):
{
  "success": true,
  "data": null,
  "message": "Order deleted successfully"
}
```

---

## 🎯 Order Status Values

The following status values are used:

- `pending` - قيد الانتظار
- `confirmed` - مؤكد
- `processing` - قيد التنفيذ
- `picked` - تم التحضير
- `shipped` - تم الشحن
- `delivered` - تم التسليم
- `cancelled` - ملغي

---

## ❌ Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Invalid request data",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 🔒 Security Requirements

1. **Password Hashing**

   - Use bcrypt or similar for password hashing
   - Minimum password length: 8 characters

2. **JWT Tokens**

   - Use a secure secret key
   - Token expiration: 24 hours recommended
   - Include user ID in payload

3. **CORS**

   - Allow origin: `http://localhost:5173` (for development)
   - Allow credentials: true
   - Allowed methods: GET, POST, PUT, PATCH, DELETE

4. **Rate Limiting**

   - Implement rate limiting on authentication endpoints
   - Recommended: 5 attempts per 15 minutes

5. **Input Validation**
   - Validate all input data
   - Sanitize user input
   - Use proper data types

---

## 📊 Database Schema Suggestions

### Admin Table

```sql
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Products Table

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  colors JSON,
  sizes JSON,
  images JSON,
  category VARCHAR(100),
  sub_category VARCHAR(100),
  material VARCHAR(100),
  style VARCHAR(100),
  fit VARCHAR(100),
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Orders Table

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  governorate VARCHAR(100),
  city VARCHAR(100),
  address TEXT NOT NULL,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  total DECIMAL(10, 2) NOT NULL,
  profit DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Order Items Table

```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  size VARCHAR(10),
  color VARCHAR(50),
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🧪 Testing Endpoints

You can use these tools to test the backend:

- **Postman** - Import the provided collection
- **Thunder Client** (VS Code extension)
- **cURL** - Command line testing
- **Insomnia** - REST client

### Example cURL Request:

```bash
# Login
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Get Orders (with token)
curl -X GET http://localhost:3000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📦 Recommended Backend Stack

- **Node.js + Express** - Server framework
- **PostgreSQL** - Database
- **Prisma/TypeORM** - ORM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Joi/Zod** - Validation
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

---

## 🚀 Quick Backend Setup Example (Node.js/Express)

```javascript
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    req.user = user;
    next();
  });
};

// Example route
app.post("/api/admin/login", async (req, res) => {
  // Your login logic here
  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({
    success: true,
    data: { token, admin },
    message: "Login successful",
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

---

## ✅ Checklist for Backend Developer

- [ ] Set up Node.js/Express server
- [ ] Configure database (PostgreSQL recommended)
- [ ] Implement admin authentication endpoints
- [ ] Implement product CRUD endpoints
- [ ] Implement order CRUD endpoints
- [ ] Add JWT middleware for protected routes
- [ ] Configure CORS properly
- [ ] Add input validation
- [ ] Implement error handling
- [ ] Add pagination support
- [ ] Test all endpoints
- [ ] Document API (Swagger/OpenAPI)

---

## 📞 Support

If you have questions about the API structure:

- Review this document
- Check the Postman collection provided
- Contact the frontend team

---

**This document ensures the frontend Admin Panel works seamlessly with your backend API.**

---

© 2025 OSARA Backend API Documentation
