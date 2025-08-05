# Office Hours Feature Example

## Overview
The attendance system now supports office hours for each location. Office hours are stored in the database and included in API responses, but no validation is enforced.

## Database Schema Changes
Added two new fields to the `Location` table:
- `officeHoursStart`: Start time in "HH:MM" format (e.g., "08:00")
- `officeHoursEnd`: End time in "HH:MM" format (e.g., "16:00")

## API Examples

### 1. Create Location with Office Hours

```bash
POST /api/locations
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Main Office",
  "latitude": 13.7563,
  "longitude": 100.5018,
  "proximityThreshold": 100,
  "officeHoursStart": "08:00",
  "officeHoursEnd": "16:00"
}
```

### 2. Check Proximity (includes office hours info)

```bash
POST /api/attendance/check-proximity
Authorization: Bearer <token>
Content-Type: application/json

{
  "latitude": 13.7563,
  "longitude": 100.5018
}
```

**Response when within range:**
```json
{
  "location": {
    "id": 1,
    "name": "Main Office",
    "latitude": 13.7563,
    "longitude": 100.5018,
    "proximityThreshold": 100,
    "officeHoursStart": "08:00",
    "officeHoursEnd": "16:00"
  },
  "distance": 50,
  "isWithinThreshold": true,
  "officeHours": "08:00 - 16:00"
}
```

**Response when outside range:**
```json
{
  "location": {
    "id": 1,
    "name": "Main Office",
    "latitude": 13.7563,
    "longitude": 100.5018,
    "proximityThreshold": 100,
    "officeHoursStart": "08:00",
    "officeHoursEnd": "16:00"
  },
  "distance": 150,
  "isWithinThreshold": false,
  "distanceOutside": 50,
  "officeHours": "08:00 - 16:00",
  "message": "อยู่นอกระยะ 50 เมตร"
}
```

### 3. Create Attendance Log

```bash
POST /api/attendance/log
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "in",
  "latitude": 13.7563,
  "longitude": 100.5018
}
```

**Success Response:**
```json
{
  "id": 1,
  "userId": 1,
  "locationId": 1,
  "type": "in",
  "latitude": 13.7563,
  "longitude": 100.5018,
  "timestamp": "2024-01-15T14:30:00.000Z"
}
```

**Success Response:**
```json
{
  "id": 1,
  "userId": 1,
  "locationId": 1,
  "type": "in",
  "latitude": 13.7563,
  "longitude": 100.5018,
  "timestamp": "2024-01-15T14:30:00.000Z"
}
```

## Time Format
Office hours use "HH:MM" format (24-hour format, e.g., "08:00", "16:00")

## Features
1. Office hours are optional - if not set, `officeHours` will be `null`
2. Office hours are included in proximity check responses
3. No validation is enforced - attendance logs can be created at any time
4. Each location can have different office hours

## Use Cases
- **Regular Office**: 08:00 - 16:00
- **Night Shift**: 22:00 - 06:00 (next day)
- **Flexible Hours**: No office hours set
- **Multiple Locations**: Each location can have different office hours 