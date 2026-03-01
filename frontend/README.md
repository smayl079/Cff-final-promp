# Car Repair Service - Frontend

Modern React-based frontend for the Car Repair Service Management System.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **CSS Modules** - Scoped styling

## Project Structure

```
frontend/
├── src/
│   ├── api/              # API integration
│   ├── components/       # Reusable components
│   ├── context/          # React Context providers
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── assets/           # Static assets
│   ├── routes/           # Routing configuration
│   └── config/           # Configuration files
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running on http://localhost:5000

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:5000/api
```

## Features

### Public Pages
- Home page with services overview
- Services catalog
- About us
- Contact form
- Blog

### Customer Portal
- User registration and login
- Book appointments
- Manage vehicles
- View appointment history
- Leave reviews

### Admin Panel
- Dashboard with analytics
- Appointment management
- Customer management
- Service catalog management
- Staff management
- Reports

## Development

```bash
# Run in development mode with hot reload
npm run dev

# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Integration

All API calls are centralized in the `src/api/services/` directory. The Axios instance is configured with:

- Base URL from environment variables
- Request/response interceptors
- JWT token handling
- Error handling

## State Management

The application uses React Context API for global state:

- **AuthContext** - User authentication state
- **NotificationContext** - Toast notifications
- **ThemeContext** - Theme preferences

## Routing

Protected routes require authentication. Role-based routes check user permissions.

## Deployment

Build the production bundle:

```bash
npm run build
```

Deploy the `dist/` folder to your hosting service (Netlify, Vercel, etc.)
