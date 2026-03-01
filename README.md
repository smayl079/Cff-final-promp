# Car Repair Service Website

A modern full-stack car repair service management system built with React and .NET Core.

## 🚀 Project Structure

```
cff-final-promp/
├── frontend/          # React application
└── backend/           # .NET Core Web API
```

## 🎯 Features

### Customer Features
- User registration and authentication
- Book appointments for car services
- Manage vehicles
- View service history
- Track appointment status

### Service Features
- Oil changes, tire services, brake repair
- Engine diagnostics and repair
- Battery and electrical services
- AC/heating repair

### Admin Features (Coming Soon)
- Manage appointments
- Assign mechanics
- Generate invoices
- View analytics

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router 6** - Navigation
- **Axios** - HTTP client
- **CSS Modules** - Styling
- **Context API** - State management

### Backend
- **.NET 8.0** - Framework
- **ASP.NET Core Web API** - REST API
- **Entity Framework Core** - ORM
- **SQL Server** - Database
- **JWT** - Authentication
- **Clean Architecture** - Design pattern

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- .NET 8.0 SDK
- SQL Server (LocalDB or full version)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd backend
dotnet restore
dotnet ef database update --project CarRepairService.Infrastructure --startup-project CarRepairService.API
dotnet run --project CarRepairService.API
```

The API will run on `https://localhost:7001`

## 🏗️ Backend Architecture

The backend follows **Clean Architecture** with 4 layers:

### 1. Domain Layer (`CarRepairService.Domain`)
- Entities (Customer, Vehicle, Appointment, Service, etc.)
- Enums (AppointmentStatus, UserRole, etc.)
- Domain logic

### 2. Application Layer (`CarRepairService.Application`)
- DTOs (Data Transfer Objects)
- Service interfaces
- Business logic
- AutoMapper profiles

### 3. Infrastructure Layer (`CarRepairService.Infrastructure`)
- Entity Framework DbContext
- Repository implementations
- Database configurations
- External service integrations

### 4. API Layer (`CarRepairService.API`)
- Controllers
- Middleware
- Dependency injection
- API configuration

## 🎨 Frontend Structure

```
frontend/src/
├── api/              # API configuration and services
├── components/       # Reusable React components
│   ├── common/      # Common UI components (Button, Input, Card, etc.)
│   └── layout/      # Layout components (Header, Footer)
├── context/         # React Context providers
├── pages/           # Page components
│   ├── auth/       # Login, Register
│   ├── customer/   # Dashboard, Booking, Appointments
│   └── public/     # Home, Services, About, Contact
└── routes/          # Route configuration

```

## 🔐 Authentication

The system uses **JWT Bearer tokens** for authentication:
- Access token (15-minute expiry)
- Refresh token (7-day expiry)
- Automatic token refresh via Axios interceptors
- Role-based authorization (Customer, Mechanic, Admin, Manager)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh access token

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/{id}` - Update appointment
- `DELETE /api/appointments/{id}` - Cancel appointment

### Services
- `GET /api/services` - Get available services
- `GET /api/services/{id}` - Get service details

## 🗄️ Database Schema

### Main Entities
- **User** - System users with roles
- **Customer** - Customer profiles
- **Vehicle** - Customer vehicles
- **Service** - Service catalog
- **Appointment** - Service bookings
- **Mechanic** - Mechanic profiles
- **Invoice** - Billing information
- **Review** - Service reviews

## 🚧 Development Status

### ✅ Completed
- Backend project structure (4 layers)
- Domain entities and relationships
- API controllers and endpoints
- Frontend project setup
- React routing configuration
- Authentication pages
- Customer portal pages
- Reusable UI components
- API integration layer

### 🔄 In Progress
- Backend service implementations
- Database migrations
- Admin panel pages

### ⏳ Planned
- Email notifications
- Payment integration
- Real-time notifications
- Mobile responsiveness improvements
- Unit and integration tests

## 🧪 Testing

### Frontend
```bash
npm run test
```

### Backend
```bash
dotnet test
```

## 📱 Responsive Design

The application is designed to be responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🔧 Configuration

### Frontend (.env)
```env
VITE_API_URL=https://localhost:7001/api
```

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=CarRepairServiceDb;Trusted_Connection=true"
  },
  "JwtSettings": {
    "Secret": "your-secret-key-min-32-characters",
    "Issuer": "CarRepairServiceAPI",
    "Audience": "CarRepairServiceClient",
    "ExpiryMinutes": 15,
    "RefreshTokenExpiryDays": 7
  }
}
```

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@carrepairservice.com or open an issue in the repository.
