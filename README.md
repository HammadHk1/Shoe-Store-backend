# Shoe Store Backend API

A simple RESTful API for managing a shoe store inventory built with Node.js, Express, and PostgreSQL.

## Project Structure
```
shoe-store-backend/
├── config/
│   └── database.js       # Database configuration
├── controllers/
│   └── shoeController.js # Business logic
├── models/
│   └── shoeModel.js      # Database queries
├── routes/
│   └── shoeRoutes.js     # API routes
├── database/
│   └── schema.sql        # Database schema
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
├── package.json         # Dependencies
├── server.js            # Entry point
└── README.md            # Documentation

## Setup Instructions

### 1. Clone and Install
```bash
npm install
```

### 2. Setup PostgreSQL Database
```bash
psql -U postgres -f database/schema.sql
```

### 3. Configure Environment Variables
Create a `.env` file and update with your credentials:
```
PORT=3000
DB_USER=your_username
DB_HOST=localhost
DB_NAME=shoe_store
DB_PASSWORD=your_password
DB_PORT=5432
```

### 4. Run the Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/shoes | Get all shoes |
| GET | /api/shoes/:id | Get shoe by ID |
| POST | /api/shoes | Create new shoe |
| PUT | /api/shoes/:id | Update shoe |
| DELETE | /api/shoes/:id | Delete shoe |

## Example Request

**Create a shoe:**
```bash
curl -X POST http://localhost:3000/api/shoes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Air Jordan 1",
    "brand": "Nike",
    "size": "10",
    "color": "Chicago",
    "price": 170.00,
    "stock": 5
  }'
```

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- dotenv