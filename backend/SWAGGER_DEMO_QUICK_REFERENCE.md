# Swagger Demo Quick Reference
## Quick Guide for Graduation Project Demo

---

## 🚀 Quick Start

### Access Swagger UI
```
https://localhost:5001/swagger
```

---

## 🔑 Authentication Flow (Demo Script)

### 1. Login to Get Token
**Endpoint:** `POST /api/v1/Auth/login`

**Request:**
```json
{
  "email": "admin@carrepair.com",
  "password": "Admin123!"
}
```

**Response:**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "...",
  "user": {
    "id": "...",
    "email": "admin@carrepair.com",
    "role": "Admin"
  }
}
```

### 2. Authorize in Swagger
1. Click **"Authorize"** 🔓 button (top right)
2. Enter: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. Click **"Authorize"**
4. Click **"Close"**

### 3. Test Protected Endpoint
**Endpoint:** `GET /api/v1/Appointments`
- Should return `200 OK` with appointment list

---

## 📝 Demo Scenario Examples

### Scenario 1: Public Endpoint (No Auth Required)
**Show:** Anyone can view services without login
```
GET /api/v1/Services
Status: 200 OK ✅
```

### Scenario 2: Protected Endpoint Without Auth
**Show:** Accessing protected endpoint without token fails
```
GET /api/v1/Appointments (without token)
Status: 401 Unauthorized ❌
```

### Scenario 3: Protected Endpoint With Auth
**Show:** Same endpoint works after authorization
```
1. Login → Get token
2. Click Authorize → Enter token
3. GET /api/v1/Appointments
Status: 200 OK ✅
```

### Scenario 4: Role-Based Access Control
**Show:** Customer cannot access admin endpoints
```
Login as Customer → Authorize
GET /api/v1/Appointments (Admin only)
Status: 403 Forbidden ❌
```

---

## 🎯 Key Features to Highlight

### 1. Professional Documentation
- ✅ XML comments with examples
- ✅ Request/Response schemas
- ✅ Error status codes documented

### 2. Organized Structure
- ✅ Endpoints grouped by category
- ✅ Clear naming conventions
- ✅ API versioning

### 3. Security
- ✅ JWT authentication
- ✅ Role-based authorization
- ✅ Secure endpoints marked with 🔒

### 4. Developer Experience
- ✅ Try it out directly in browser
- ✅ Request duration display
- ✅ Filter and search endpoints
- ✅ Deep linking support

---

## 🧪 Test Users (Create these in your database)

### Admin User
```json
{
  "email": "admin@carrepair.com",
  "password": "Admin123!",
  "role": "Admin"
}
```
**Can access:** All endpoints

### Customer User
```json
{
  "email": "customer@example.com",
  "password": "Customer123!",
  "role": "Customer"
}
```
**Can access:** Customer-specific endpoints, cannot access admin endpoints

### Mechanic User
```json
{
  "email": "mechanic@carrepair.com",
  "password": "Mechanic123!",
  "role": "Mechanic"
}
```
**Can access:** Mechanic-specific endpoints

---

## 💡 Demo Talking Points

### Introduction (30 seconds)
> "This is our API documentation powered by Swagger/OpenAPI. It provides an interactive interface to explore and test all API endpoints."

### Features (1 minute)
> "Notice how endpoints are organized by category - Authentication, Appointments, Services, etc. Each endpoint has detailed documentation including request examples and possible response codes."

### Security (1 minute)
> "Let me demonstrate the authentication. First, I'll login..."
> [Show login] 
> "Now I have a JWT token. I'll click Authorize and paste the token..."
> [Show authorization]
> "Now all protected endpoints will include this token automatically."

### Testing (2 minutes)
> "Let's test a protected endpoint. Without authentication..."
> [Show 401 error]
> "And now with authentication..."
> [Show 200 success]
> "You can see it works perfectly. The request duration is also displayed."

### Role-Based Access (1 minute)
> "For security, we have role-based access control. If I try to access an admin-only endpoint as a customer..."
> [Show 403 error]
> "Access is denied, ensuring proper authorization throughout the system."

---

## ⚠️ Common Demo Issues & Fixes

### Issue: Forgot to click "Execute"
**Fix:** After entering data, click the blue "Execute" button

### Issue: 401 Error with token
**Fix:** Ensure you included "Bearer " (with space) before the token

### Issue: Token expired during demo
**Fix:** Use refresh token endpoint or login again

### Issue: Swagger UI not loading
**Fix:** Ensure you're running in Development mode or check Program.cs configuration

---

## 📊 Swagger UI Features to Mention

| Feature | What It Does |
|---------|-------------|
| 🔍 Filter Box | Search endpoints by name |
| 🔒 Lock Icons | Shows which endpoints require auth |
| ⏱️ Duration | Shows request execution time |
| 📋 Schemas | Shows all data models |
| ⬇️ Download | Download OpenAPI spec |
| 🌐 Deep Linking | Share direct links to endpoints |

---

## 🎬 Complete Demo Script (5 minutes)

### Minute 1: Introduction
1. Open Swagger UI
2. Show organized endpoint groups
3. Expand one endpoint to show documentation

### Minute 2: Documentation
4. Point out XML comments
5. Show request/response schemas
6. Highlight example requests

### Minute 3: Authentication
7. Test public endpoint (works without auth)
8. Try protected endpoint (fails with 401)
9. Login to get JWT token
10. Click Authorize, enter token

### Minute 4: Testing
11. Retry protected endpoint (now works)
12. Show response data
13. Try different endpoint
14. Show request duration

### Minute 5: Authorization
15. Test admin endpoint with customer token (403)
16. Explain role-based access control
17. Summarize features
18. Take questions

---

## 🔧 Pre-Demo Checklist

- [ ] Database is running and seeded with test users
- [ ] Backend API is running
- [ ] Swagger UI loads at `/swagger`
- [ ] Test login works and returns token
- [ ] Authorization button appears in Swagger
- [ ] At least one public endpoint exists
- [ ] At least one protected endpoint exists
- [ ] At least one admin-only endpoint exists
- [ ] Browser developer tools closed (for cleaner presentation)
- [ ] Zoom/font size appropriate for projection

---

## 📱 Quick Commands

### Start API
```bash
cd backend/CarRepairService.API
dotnet run
```

### Access Swagger
```
https://localhost:5001/swagger
```

### Rebuild (if XML comments not showing)
```bash
dotnet build
```

---

## 🎓 Grading Criteria Coverage

✅ **Functionality** - All CRUD operations work  
✅ **Security** - JWT authentication implemented  
✅ **Authorization** - Role-based access control  
✅ **Documentation** - Comprehensive API docs  
✅ **Testing** - Interactive testing via Swagger  
✅ **Professional** - Clean, organized, production-ready  

---

**Good luck with your demo! 🚀**
