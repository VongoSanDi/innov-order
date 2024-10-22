# Innov Order Project

## Description
Innov Order is a fullstack web application with user authentication and food data management. It is built using React/Vite for the frontend and NestJS/MongoDB for the backend.

## Technologies Used

### Frontend
- React with Vite
- TypeScript
- Material-UI for user interface
- React Router for navigation
- Context management for global state

### Backend
- NestJS
- MongoDB with Mongoose
- JWT for authentication
- PassportJS
- BCrypt for password hashing
- Zod for the schema validation

## Project Structure

```
innov-order/
├── client/                    # React/Vite Frontend
│   ├── src/
│   │   ├── apis/            # API clients and services
│   │   ├── components/      # Reusable React components
│   │   ├── context/         # React contexts (ex: AuthContext)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── i18n/            # Ready for internationalization
│   │   ├── pages/           # Pages
│   │   ├── router/          # Route setup
│   │   └── types/           # Types
│   ├── Dockerfile
│   └── package.json
│
├── server/                    # NestJS Backend
│   ├── src/
│   │   ├── auth/            # Authentication module
│   │   ├── common/          # Shared elements
│   │   ├── foodFacts/       # Food facts module
│   │   ├── interfaces/      # TypeScript interfaces
│   │   ├── mappers/         # Data mappers (DTO <-> Entity)
│   │   ├── mongo/           # MongoDB configuration and connection
│   │   ├── users/           # User  module
│   │   └── utils/           # Utilities and helpers
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml         # Docker Compose configuration
```

## Prerequisites

- Docker and Docker Compose
- Node.js
- npm or yarn
- MongoDB (for local development without Docker)

## Installation and Setup

### With Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/VongoSanDi/innov-order.git
cd innov-order
```

2. Start the containers:
```bash
docker-compose up --build
```

The application will be accessible at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Swagger: http://localhost:3000/api
- MongoDB: mongodb://localhost:27017

### Local Development (Without Docker)

1. Start MongoDB locally and create Users database

2. Frontend Setup:
```bash
cd client
npm install
npm run vite
```

3. Backend Setup:
```bash
cd server
npm install
npm run start:dev
```

## Configuration

### Environment Variables

The .env file is already created you can edit it directly or do it from the docker-compose.yml file

```env
MONGODB_URI=mongodb://mongodb:27017/Users
JWT_SECRET=your_jwt_secret
FOODFACTS_ENDPOINT="https://world.openfoodfacts.org"
```

## Main Features

### Frontend
- User authentication (login/register)
- Secure routing system
- Global state management with Context
- Material-UI components
- Reusable custom hooks

### Backend
- RESTful API
- JWT authentication
- Schema validation with Zod
- DTO/Entity mapping
- Secure password management
- MongoDB with Mongoose

## API Endpoints

### Authentication
- `POST /auth/login`: User login

### Users
- `PATCH /users/:login`: Update user informations
- `POST /auth/register`: User registration

### FoodFacts
[FoodFacts endpoints documentation]

## Testing

### Backend
```bash
cd server
npm run test        # Unit tests
```

## Docker

The project uses three Docker services:
- `client`: React/Vite application
- `server`: NestJS API
- `mongodb`: Database

### Useful Docker Commands
```bash
docker-compose up --build    # Build and start all services
docker-compose down         # Stop all services
docker-compose logs client  # View client logs
docker-compose logs server  # View server logs
```
