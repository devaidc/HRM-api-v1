# CICO Backend Workflow Guide

This guide provides step-by-step workflows for all major use cases in the CICO (Check-In Check-Out) Backend system with user-based location management.

## 🚀 Initial Setup Workflow

### 1. System Setup
```bash
# Clone and install
git clone <repository-url>
cd cico-backend
npm install

# Environment setup
cp env.example .env
# Edit .env with your database credentials

# Database setup
npm run db:generate
npm run db:push

# Start server
npm run dev
```

### 2. Postman Setup
1. Import `CICO-Backend.postman_collection.json`
2. Import `CICO-Backend.postman_environment.json`
3. Select "CICO Backend Environment"
4. Verify `baseUrl` is set to `http://localhost:3000`

## 🏢 Company Onboarding Workflow

### Step 1: Create Company
```http
POST /companies
Content-Type: application/json

{
  "name": "Acme Corporation"
}
```

**Expected Response:**
```json
{
  "id": 1,
  "name": "Acme Corporation",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

### Step 2: Register Company Admin
```http
POST /auth/register
Content-Type: application/json

{
  "username": "admin@acme.com",
  "password": "securepassword123",
  "companyId": 1
}
```

### Step 3: Login and Get Token
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin@acme.com",
  "password": "securepassword123"
}
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin@acme.com",
    "companyId": 1,
    "company": {
      "id": 1,
      "name": "Acme Corporation"
    }
  }
}
```

## 👥 Employee Onboarding Workflow

### Step 1: Register New Employee
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john.doe@acme.com",
  "password": "password123",
  "companyId": 1
}
```

### Step 2: Employee Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "john.doe@acme.com",
  "password": "password123"
}
```

### Step 3: Verify Company Association
Check that the login response includes:
- `companyId`: 1
- `company.name`: "Acme Corporation"

## 📍 User Location Setup Workflow

### Step 1: Add Personal Office Location
```http
POST /locations
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "name": "My Home Office",
  "latitude": 13.7563,
  "longitude": 100.5018,
  "proximityThreshold": 100
}
```

### Step 2: Add Work Location
```http
POST /locations
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "name": "Company Office",
  "latitude": 13.7463,
  "longitude": 100.5118,
  "proximityThreshold": 150
}
```

### Step 3: Add Client Meeting Location
```http
POST /locations
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "name": "Client ABC Office",
  "latitude": 13.7363,
  "longitude": 100.5218,
  "proximityThreshold": 200
}
```

### Step 4: View User's Locations
```http
GET /locations
Authorization: Bearer <user-token>
```

## 🕒 Daily Attendance Workflow

### Morning Check-In

#### Step 1: Check Proximity to User's Locations
```http
POST /attendance/proximity
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "latitude": 13.7563,
  "longitude": 100.5018
}
```

**Expected Response:**
```json
{
  "location": {
    "id": 1,
    "name": "My Home Office",
    "latitude": 13.7563,
    "longitude": 100.5018,
    "proximityThreshold": 100
  },
  "distance": 50.5,
  "isWithinThreshold": true
}
```

#### Step 2: Clock In
```http
POST /attendance
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "type": "in",
  "latitude": 13.7563,
  "longitude": 100.5018
}
```

**Expected Response:**
```json
{
  "id": 1,
  "userId": 2,
  "locationId": 1,
  "type": "in",
  "latitude": 13.7563,
  "longitude": 100.5018,
  "timestamp": "2024-01-15T09:00:00.000Z",
  "createdAt": "2024-01-15T09:00:00.000Z",
  "location": {
    "id": 1,
    "name": "My Home Office"
  }
}
```

### Evening Check-Out

#### Step 1: Clock Out
```http
POST /attendance
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "type": "out",
  "latitude": 13.7563,
  "longitude": 100.5018
}
```

### Step 2: View Today's Attendance
```http
GET /attendance/today
Authorization: Bearer <user-token>
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "userId": 2,
    "locationId": 1,
    "type": "in",
    "latitude": 13.7563,
    "longitude": 100.5018,
    "timestamp": "2024-01-15T09:00:00.000Z",
    "location": {
      "id": 1,
      "name": "My Home Office"
    }
  },
  {
    "id": 2,
    "userId": 2,
    "locationId": 1,
    "type": "out",
    "latitude": 13.7563,
    "longitude": 100.5018,
    "timestamp": "2024-01-15T17:00:00.000Z",
    "location": {
      "id": 1,
      "name": "My Home Office"
    }
  }
]
```

## 🏢 Client Meeting Workflow

### Step 1: Employee Travels to Client Location
Employee travels to client location coordinates.

### Step 2: Check Proximity at Client Location
```http
POST /attendance/proximity
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "latitude": 13.7363,
  "longitude": 100.5218
}
```

### Step 3: Clock In at Client Location
```http
POST /attendance
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "type": "in",
  "latitude": 13.7363,
  "longitude": 100.5218
}
```

### Step 4: Clock Out from Client Location
```http
POST /attendance
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "type": "out",
  "latitude": 13.7363,
  "longitude": 100.5218
}
```

## 📊 Management Workflow

### View User's Locations
```http
GET /locations
Authorization: Bearer <user-token>
```

### View All Attendance Logs
```http
GET /attendance
Authorization: Bearer <user-token>
```

### Update Location Details
```http
PUT /locations/1
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "name": "Updated Home Office",
  "latitude": 13.7563,
  "longitude": 100.5018,
  "proximityThreshold": 120
}
```

### Toggle Location Status
```http
PATCH /locations/1/toggle
Authorization: Bearer <user-token>
```

## 🔄 Multi-User Workflow

### User A Setup
1. Register User A
2. Add User A's locations (home, work, client sites)
3. Test attendance tracking

### User B Setup
1. Register User B
2. Add User B's locations (different home, work, client sites)
3. Test attendance tracking

### Verify Data Isolation
- User A can only access User A's locations
- User B can only access User B's locations
- Attendance logs are isolated by user
- Each user manages their own location set

## 🛠️ Maintenance Workflow

### Database Backup
```bash
# Export database
pg_dump cico_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore database
psql cico_db < backup_file.sql
```

### Update Environment Variables
1. Edit `.env` file
2. Restart server: `npm run dev`

### Database Schema Updates
```bash
# Generate new Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Or run migrations
npm run db:migrate
```

## 🚨 Error Handling Workflow

### Invalid Token
1. Token expired or invalid
2. Re-authenticate user
3. Get new token via login

### User Not Associated with Company
1. Check if user exists
2. Assign user to company via `/auth/assign-company`
3. Verify assignment

### No Nearby Locations
1. Check if user has created any locations
2. Verify location coordinates
3. Check proximity threshold settings
4. Create new location if needed

### Database Connection Issues
1. Check database service status
2. Verify DATABASE_URL in `.env`
3. Check network connectivity
4. Restart database service

## 📱 Mobile App Integration Workflow

### 1. Authentication
```javascript
// Login and store token
const response = await fetch('/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
});
const { token } = await response.json();
localStorage.setItem('authToken', token);
```

### 2. Get Current Location
```javascript
// Get GPS coordinates
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  // Use coordinates for attendance
});
```

### 3. Check Proximity to User's Locations
```javascript
const proximityResponse = await fetch('/attendance/proximity', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ latitude, longitude })
});
```

### 4. Clock In/Out
```javascript
const attendanceResponse = await fetch('/attendance', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    type: 'in', // or 'out'
    latitude,
    longitude
  })
});
```

## 🔒 Security Workflow

### Token Management
1. Tokens expire after 24 hours
2. Implement automatic token refresh
3. Store tokens securely (not in localStorage for production)
4. Implement logout to invalidate tokens

### Password Security
1. Passwords are hashed with bcrypt
2. Implement password strength requirements
3. Regular password updates
4. Account lockout after failed attempts

### Data Privacy
1. User-based location isolation
2. User can only access their own attendance data
3. User can only manage their own locations
4. Audit logging for sensitive operations

## 📈 Analytics Workflow

### Daily Attendance Summary
1. Get today's logs for user
2. Calculate work hours
3. Identify late arrivals/early departures
4. Generate attendance reports

### Location Analytics
1. Most frequented locations
2. Peak usage times
3. Location efficiency metrics
4. Travel time analysis

### User Performance
1. Overall attendance rates
2. Location-wise statistics
3. Remote work patterns
4. Client meeting frequency

## 🎯 Best Practices

### For Users
1. Create locations for all your work environments
2. Set appropriate proximity thresholds
3. Always check proximity before clocking in/out
4. Use accurate GPS coordinates
5. Keep login credentials secure

### For Administrators
1. Monitor user location creation patterns
2. Set company policies for location management
3. Maintain user accounts and permissions
4. Review attendance patterns

### For Developers
1. Implement proper error handling
2. Use environment variables for configuration
3. Follow the established API patterns
4. Test all workflows thoroughly

---

**This workflow guide covers all major use cases and should be updated as new features are added to the system.** 