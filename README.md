# CICO Backend

A Node.js backend with Express and Prisma ORM using PostgreSQL, following Clean Architecture principles with user-based location management for attendance tracking.

## 🏗️ Architecture

The project follows Clean Architecture principles with clear separation of concerns:

- **routes/** - Presentation layer (HTTP endpoints)
- **controllers/** - Handle logic flow and HTTP request/response
- **services/** - Business logic layer
- **repositories/** - Data access layer via Prisma
- **middlewares/** - Express middlewares
- **utils/** - Utility functions
- **prisma/** - Database schema and migrations

## 📁 Project Structure

```
cico-backend/
├── src/
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── attendanceRoutes.ts
│   │   ├── companyRoutes.ts
│   │   └── locationRoutes.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── attendanceController.ts
│   │   ├── companyController.ts
│   │   └── locationController.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── attendanceService.ts
│   │   ├── companyService.ts
│   │   └── locationService.ts
│   ├── repositories/
│   │   ├── userRepository.ts
│   │   ├── logRepository.ts
│   │   ├── companyRepository.ts
│   │   └── locationRepository.ts
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   │   └── errorMiddleware.ts
│   ├── utils/
│   │   ├── database.ts
│   │   ├── jwt.ts
│   │   ├── bcrypt.ts
│   │   └── geoUtils.ts
│   ├── types/
│   │   └── index.ts
│   └── server.ts
├── prisma/
│   └── schema.prisma
├── package.json
├── tsconfig.json
├── nodemon.json
├── env.example
├── README.md
├── POSTMAN_SETUP.md
├── WORKFLOW.md
├── CICO-Backend.postman_collection.json
└── CICO-Backend.postman_environment.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd cico-backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your database credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/cico_db"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   PORT=3000
   NODE_ENV=development
   ```

3. **Set up the database:**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database (creates tables)
   npm run db:push
   
   # Or run migrations (recommended for production)
   npm run db:migrate
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`

## 🔐 Authentication Flow

### Register a new user
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123",
  "companyId": 1
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "companyId": 1,
    "company": {
      "id": 1,
      "name": "Acme Corporation"
    }
  }
}
```

### Assign user to company
```http
POST /auth/assign-company
Content-Type: application/json

{
  "userId": 1,
  "companyId": 1
}
```

## 🏢 Company Management

### Create company
```http
POST /companies
Content-Type: application/json

{
  "name": "Acme Corporation"
}
```

### Get all companies
```http
GET /companies
```

### Get company by ID
```http
GET /companies/:id
```

### Update company
```http
PUT /companies/:id
Content-Type: application/json

{
  "name": "Updated Company Name"
}
```

### Delete company
```http
DELETE /companies/:id
```

## 📍 Location Management

### Create location (requires auth)
```http
POST /locations
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "My Office",
  "latitude": 13.7563,
  "longitude": 100.5018,
  "proximityThreshold": 100
}
```

### Get user's locations (requires auth)
```http
GET /locations
Authorization: Bearer <your-jwt-token>
```

### Get location by ID
```http
GET /locations/:id
```

### Update location
```http
PUT /locations/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Updated Location Name",
  "latitude": 13.7563,
  "longitude": 100.5018,
  "proximityThreshold": 150
}
```

### Toggle location active status
```http
PATCH /locations/:id/toggle
Authorization: Bearer <your-jwt-token>
```

### Delete location
```http
DELETE /locations/:id
Authorization: Bearer <your-jwt-token>
```

## 🕒 Attendance Flow

### Check proximity to user's locations
```http
POST /attendance/proximity
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

### Create attendance log
```http
POST /attendance
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "type": "in",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

> **Note:** Timestamps are automatically generated on the server in UTC+7 timezone

### Get user's attendance logs
```http
GET /attendance
Authorization: Bearer <your-jwt-token>
```

### Get today's attendance logs
```http
GET /attendance/today
Authorization: Bearer <your-jwt-token>
```

## 🗃️ Database Schema

### User Model
```prisma
model User {
  id       Int      @id @default(autoincrement())
  username String   @unique
  password String
  companyId Int?
  company   Company? @relation(fields: [companyId], references: [id])
  logs     Log[]
  locations Location[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Company Model
```prisma
model Company {
  id        Int      @id @default(autoincrement())
  name      String
  users     User[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Location Model
```prisma
model Location {
  id                  Int      @id @default(autoincrement())
  name                String
  userId              Int
  user                User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  latitude            Float
  longitude           Float
  proximityThreshold  Float    @default(100)
  isActive            Boolean  @default(true)
  logs                Log[]
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}
```

### Log Model
```prisma
model Log {
  id         Int      @id @default(autoincrement())
  userId     Int
  locationId Int?
  type       String   // "in" or "out"
  latitude   Float
  longitude  Float
  timestamp  DateTime
  createdAt  DateTime @default(now())

  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  location Location? @relation(fields: [locationId], references: [id])
}
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## 🔧 Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt for secure password storage
- **Company Management** - Multi-tenant company support
- **User-Based Location Management** - Each user manages their own locations
- **Proximity Detection** - Automatic location detection based on GPS coordinates
- **Input Validation** - Comprehensive request validation
- **Error Handling** - Centralized error handling middleware
- **TypeScript** - Full type safety
- **Clean Architecture** - Separation of concerns
- **Prisma ORM** - Type-safe database operations
- **CORS Support** - Cross-origin resource sharing
- **Environment Configuration** - Flexible configuration management
- **Geographic Utilities** - Distance calculation and proximity detection

## 🧪 Testing the API

### Using curl:

1. **Create a company:**
   ```bash
   curl -X POST http://localhost:3000/companies \
     -H "Content-Type: application/json" \
     -d '{"name": "Acme Corporation"}'
   ```

2. **Register a user:**
   ```bash
   curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "password123", "companyId": 1}'
   ```

3. **Login:**
   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "password123"}'
   ```

4. **Create a location:**
   ```bash
   curl -X POST http://localhost:3000/locations \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{
       "name": "My Office",
       "latitude": 13.7563,
       "longitude": 100.5018,
       "proximityThreshold": 100
     }'
   ```

5. **Check proximity:**
   ```bash
   curl -X POST http://localhost:3000/attendance/proximity \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{
       "latitude": 13.7563,
       "longitude": 100.5018
     }'
   ```

6. **Create attendance log:**
   ```bash
   curl -X POST http://localhost:3000/attendance \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{
       "type": "in",
       "latitude": 13.7563,
       "longitude": 100.5018
     }'
   ```

7. **Get attendance logs:**
   ```bash
   curl -X GET http://localhost:3000/attendance \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## 📋 Postman Collection

For easier API testing, use the included Postman collection:

1. Import `CICO-Backend.postman_collection.json`
2. Import `CICO-Backend.postman_environment.json`
3. Select the "CICO Backend Environment"
4. Follow the testing workflow in `POSTMAN_SETUP.md`

## 🔒 Security Features

- JWT tokens with expiration
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Environment variable management
- Error handling without exposing sensitive information
- User-based access control for locations

## 📝 License

ISC
