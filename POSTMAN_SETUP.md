# Postman Collection Setup Guide

This guide will help you set up and use the Postman collection for testing the CICO Backend API with user-based location management.

## 📦 Files Included

1. **`CICO-Backend.postman_collection.json`** - Main API collection
2. **`CICO-Backend.postman_environment.json`** - Environment variables

## 🚀 Quick Setup

### Step 1: Import the Collection

1. Open Postman
2. Click **Import** button
3. Select **Upload Files**
4. Choose `CICO-Backend.postman_collection.json`
5. Click **Import**

### Step 2: Import the Environment

1. In Postman, click **Import** again
2. Select **Upload Files**
3. Choose `CICO-Backend.postman_environment.json`
4. Click **Import**

### Step 3: Select the Environment

1. In the top-right corner of Postman, click the environment dropdown
2. Select **"CICO Backend Environment"**

## 🔧 Environment Variables

The collection uses the following environment variables:

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `baseUrl` | API base URL | `http://localhost:3000` |
| `authToken` | JWT authentication token | (auto-filled after login) |
| `userId` | Current user ID | (auto-filled after login) |
| `username` | Test username | `employee1` |
| `password` | Test password | `password123` |
| `companyId` | Company ID | `1` |
| `locationId` | Location ID | `1` |

## 📋 Available Endpoints

### Health Check
- **GET** `/health` - Check server status

### Authentication
- **POST** `/auth/register` - Register new user (with optional company)
- **POST** `/auth/login` - Login user (auto-saves token and company info)
- **POST** `/auth/assign-company` - Assign user to company

### Company Management
- **POST** `/companies` - Create new company
- **GET** `/companies` - Get all companies
- **GET** `/companies/:id` - Get company by ID
- **PUT** `/companies/:id` - Update company
- **DELETE** `/companies/:id` - Delete company

### Location Management
- **POST** `/locations` - Create new location (requires auth)
- **GET** `/locations` - Get user's locations (requires auth)
- **GET** `/locations/:id` - Get location by ID
- **PUT** `/locations/:id` - Update location
- **PATCH** `/locations/:id/toggle` - Toggle location active status
- **DELETE** `/locations/:id` - Delete location

### Attendance
- **POST** `/attendance/proximity` - Check proximity to user's locations
- **POST** `/attendance` - Create check-in/check-out log
- **GET** `/attendance` - Get user logs
- **GET** `/attendance/today` - Get today's logs

## 🧪 Testing Workflow

### 1. Start Your Server
```bash
npm run dev
```

### 2. Test Health Check
1. Run **"Health Check"** request
2. Should return: `{"status": "OK", "timestamp": "..."}`

### 3. Create a Company
1. Run **"Create Company"** request
2. Note the returned company ID
3. Update the `companyId` environment variable

### 4. Register a User with Company
1. Run **"Register User"** request
2. Include the `companyId` in the request body
3. Should return user details with company information

### 5. Login and Get Token
1. Run **"Login User"** request
2. The response will automatically save the JWT token and company info
3. Check the environment variables - `authToken` and `companyId` should be populated

### 6. Add User's Locations
1. Run **"Create Home Office Location"** request
2. Run **"Create Work Office Location"** request
3. These create locations for the user (not the company)
4. Note the returned location IDs

### 7. Test Proximity Detection
1. Run **"Check Proximity"** request
2. Should return information about nearby user locations

### 8. Test Attendance Endpoints
1. **Clock In at Home Office** - Log a check-in with location
2. **Clock Out at Home Office** - Log a check-out with location
3. **Clock In at Work Office** - Log a check-in at different location
4. **Get All Attendance Logs** - View all logs with location info

### 9. Test Location Management
1. **Get User Locations** - View all user's locations
2. **Update Location** - Modify location details
3. **Toggle Location Status** - Activate/deactivate locations
4. **Delete Location** - Remove locations

## 🔄 Automated Features

The collection includes automated features that:

- **Auto-save JWT token** after successful login
- **Auto-save user details** (ID, username, company ID)
- **Use saved token** for authenticated requests
- **Server-side timestamp generation** - All attendance logs automatically get UTC+7 timestamps
- **Proximity detection** - Automatically links attendance logs to nearest user location

### Login Script (automatically runs)
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set('authToken', response.token);
    pm.environment.set('userId', response.user.id);
    pm.environment.set('username', response.user.username);
    pm.environment.set('companyId', response.user.companyId || '');
    console.log('Token saved:', response.token);
    console.log('Company ID:', response.user.companyId);
}
```

### Server-side Timestamp Generation
The server automatically generates UTC+7 timestamps for all attendance logs. No need to send timestamps in requests.

## 📝 Example Requests

### Create Company
```json
{
  "name": "Acme Corporation"
}
```

### Register User with Company
```json
{
  "username": "john_doe",
  "password": "securepassword123",
  "companyId": 1
}
```

### Create Home Office Location
```json
{
  "name": "My Home Office",
  "latitude": 13.7563,
  "longitude": 100.5018,
  "proximityThreshold": 100
}
```

### Create Work Office Location
```json
{
  "name": "Company Office",
  "latitude": 13.7463,
  "longitude": 100.5118,
  "proximityThreshold": 150
}
```

### Clock In at Home Office
```json
{
  "type": "in",
  "latitude": 13.7563,
  "longitude": 100.5018
}
```

### Check Proximity
```json
{
  "latitude": 13.7563,
  "longitude": 100.5018
}
```

> **Note:** Timestamps are automatically generated on the server in UTC+7 timezone. No need to send timestamp in the request.

## 🔍 Troubleshooting

### Common Issues

1. **"Connection refused"**
   - Make sure your server is running (`npm run dev`)
   - Check if the port is correct in environment variables

2. **"Unauthorized" errors**
   - Run the login request first to get a valid token
   - Check if the token is properly saved in environment variables

3. **"Invalid token" errors**
   - Tokens expire after 24 hours
   - Re-run the login request to get a new token

4. **"No nearby locations found"**
   - Create locations for the user first
   - Check if locations are active
   - Verify coordinates are within proximity threshold

5. **"Validation error"**
   - Check request body format
   - Ensure all required fields are present
   - Verify data types (numbers for coordinates)
   - Timestamps are automatically generated on the server in UTC+7 timezone

### Debugging Tips

1. **Check Environment Variables**
   - Click the eye icon next to environment name
   - Verify `authToken` and `companyId` are populated after login

2. **View Console Logs**
   - Open Postman Console (View → Show Postman Console)
   - Check for any script errors or logs

3. **Test Individual Requests**
   - Use the "Complete Workflow Examples" folder for step-by-step testing
   - Start with "1. Create Company" and follow the sequence

4. **Check Proximity**
   - Use the "Check Proximity" request to verify location detection
   - Ensure coordinates are within the proximity threshold

## 🎯 Best Practices

1. **Always start with health check** to ensure server is running
2. **Use the Complete Workflow Examples** for step-by-step testing
3. **Check environment variables** after login
4. **Create user locations before testing attendance**
5. **Test proximity detection** before clock in/out
6. **Use realistic coordinates** for location testing
7. **Test both home and work office scenarios**

## 📊 Expected Responses

### Successful Login
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "employee1",
    "companyId": 1,
    "company": {
      "id": 1,
      "name": "Acme Corporation"
    }
  }
}
```

### Successful Company Creation
```json
{
  "id": 1,
  "name": "Acme Corporation",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

### Successful Location Creation
```json
{
  "id": 1,
  "name": "My Home Office",
  "userId": 1,
  "latitude": 13.7563,
  "longitude": 100.5018,
  "proximityThreshold": 100,
  "isActive": true,
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

### Successful Attendance Log
```json
{
  "id": 1,
  "userId": 1,
  "locationId": 1,
  "type": "in",
  "latitude": 13.7563,
  "longitude": 100.5018,
  "timestamp": "2024-01-15T17:00:00.000Z",
  "createdAt": "2024-01-15T17:00:00.000Z",
  "location": {
    "id": 1,
    "name": "My Home Office"
  }
}
```

### Proximity Check Response
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

### Error Response
```json
{
  "error": "No nearby locations found"
}
```

## 🧪 Advanced Testing Scenarios

### Scenario 1: Multi-User Setup
1. Create multiple users
2. Each user creates their own locations
3. Test that users can only access their own locations
4. Verify data isolation between users

### Scenario 2: Location Management
1. Create multiple locations for a user
2. Test location activation/deactivation
3. Update location details
4. Delete locations and verify cascade effects

### Scenario 3: Attendance Tracking
1. Test check-in/check-out at different user locations
2. Verify proximity detection accuracy
3. Test attendance logs with and without location association
4. Check today's attendance filtering

### Scenario 4: Edge Cases
1. Test with invalid coordinates
2. Test proximity detection outside threshold
3. Test with inactive locations
4. Test with expired tokens

## 🔗 Additional Resources

- [Postman Documentation](https://learning.postman.com/)
- [JWT Token Debugger](https://jwt.io/)
- [Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula)
- [Geographic Coordinate System](https://en.wikipedia.org/wiki/Geographic_coordinate_system)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Documentation](https://expressjs.com/)

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify your environment setup
3. Review the server logs for detailed error messages
4. Ensure all dependencies are installed correctly

---

**Happy Testing! 🚀** 