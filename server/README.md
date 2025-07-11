# Learnify Backend API

A Node.js/Express backend API for the Learnify learning platform.

## Features

- User authentication with JWT
- CRUD operations for quizzes, notes, lectures, and packages
- MongoDB integration
- Payment processing with Razorpay
- YouTube video integration for lectures
- reCAPTCHA verification

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret

# reCAPTCHA Configuration
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# CORS Configuration
FRONTEND_URL=your_frontend_url
```

## Installation

```bash
npm install
```

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server health status
- `GET /` - API information

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `GET /user` - Get user data (protected)

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quiz/:quizId` - Get specific quiz

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:noteId` - Get specific note

### Lectures
- `GET /api/lectures` - Get all lectures
- `GET /api/lecture/:lectureId` - Get specific lecture

### Packages
- `GET /api/packages` - Get all packages
- `GET /api/packages/:packageId` - Get specific package

### Payments
- `POST /api/create-order` - Create Razorpay order
- `POST /api/verify-payment` - Verify payment

## Deployment

This application is ready for deployment on platforms like Render, Heroku, or any Node.js hosting service.

### Required Environment Variables for Production:
- All variables listed above
- Ensure `NODE_ENV=production`
- Update `FRONTEND_URL` to your deployed frontend URL
- Use production MongoDB URI
- Use secure JWT secret
