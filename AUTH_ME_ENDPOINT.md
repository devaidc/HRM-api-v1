# `/auth/me` Endpoint Documentation

## Overview
The `/auth/me` endpoint allows clients to check the current user's login status and retrieve fresh user data from the database. This is particularly useful for mobile applications that need to verify if a stored token is still valid.

## Endpoint Details

- **URL**: `GET /auth/me`
- **Authentication**: Required (Bearer token)
- **Content-Type**: `application/json`

## Request

### Headers
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

### Example Request
```bash
curl -X GET \
  http://localhost:3000/auth/me \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'Content-Type: application/json'
```

## Response

### Success Response (200 OK)
```json
{
  "id": 1,
  "username": "john_doe",
  "companyId": 1,
  "company": {
    "id": 1,
    "name": "Acme Corporation"
  }
}
```

### Error Responses

#### 401 Unauthorized - No Token
```json
{
  "error": "Access token required"
}
```

#### 401 Unauthorized - Invalid Token
```json
{
  "error": "Invalid or expired token"
}
```

#### 401 Unauthorized - User Not Found
```json
{
  "error": "User not found"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Use Cases

### 1. Login Status Check
Mobile applications can use this endpoint to verify if a stored token is still valid:

```dart
Future<void> checkLoginStatus() async {
  final token = _storage.read('access_token');
  
  if (token != null) {
    try {
      final response = await ApiClient().dio.get('/auth/me');
      // Token is valid, user is logged in
      currentUser.value = UserModel.fromJson(response.data);
      isLoggedIn.value = true;
    } catch (e) {
      // Token is invalid, clear stored data
      _storage.remove('access_token');
      _storage.remove('user_data');
      isLoggedIn.value = false;
      currentUser.value = null;
    }
  }
}
```

### 2. Fresh User Data
Get the latest user information from the database, including any updates to company assignments:

```javascript
// Get fresh user data
const response = await fetch('/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

if (response.ok) {
  const userData = await response.json();
  // Update local user state with fresh data
  updateUserState(userData);
}
```

### 3. Token Validation
Validate that a token is still valid and the user still exists:

```python
import requests

def validate_token(token):
    response = requests.get(
        'http://localhost:3000/auth/me',
        headers={'Authorization': f'Bearer {token}'}
    )
    
    if response.status_code == 200:
        return True, response.json()
    else:
        return False, None
```

## Security Features

1. **Token Validation**: The endpoint validates the JWT token and extracts user information
2. **Database Verification**: Checks that the user still exists in the database
3. **Fresh Data**: Returns current user data from the database, not from the token
4. **Error Handling**: Proper error responses for various failure scenarios

## Implementation Details

### Authentication Middleware
The endpoint uses the `authenticateToken` middleware to:
- Extract the Bearer token from the Authorization header
- Verify the token's validity and expiration
- Attach user information to the request object

### Service Layer
The `AuthService.getCurrentUser()` method:
- Retrieves fresh user data from the database
- Includes company information if available
- Returns null if the user doesn't exist

### Controller
The `AuthController.getCurrentUser()` method:
- Handles the authenticated request
- Calls the service layer to get user data
- Returns appropriate HTTP status codes and error messages

## Testing

### Postman Collection
The endpoint is included in the Postman collection as "Get Current User" under the Authentication folder.

### Test Cases
1. **Valid Token**: Should return user data
2. **Invalid Token**: Should return 401 error
3. **Expired Token**: Should return 401 error
4. **No Token**: Should return 401 error
5. **Deleted User**: Should return 401 error (user not found)

## Integration with Flutter App

This endpoint perfectly matches your Flutter app's `checkLoginStatus()` method:

```dart
// Your Flutter code
final response = await ApiClient().dio.get('/auth/me');
currentUser.value = UserModel.fromJson(response.data);
isLoggedIn.value = true;
```

The endpoint will:
- ✅ Validate the stored token
- ✅ Return fresh user data
- ✅ Include company information
- ✅ Handle all error cases properly 