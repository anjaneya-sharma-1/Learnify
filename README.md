# Learnify

## Overview

An advanced education platform built using the MERN (MongoDB, Express.js, React, Node.js) stack with Redux for state management. The platform provides a comprehensive learning experience with features like quizzes, notes, video lectures, live classes, paid packages, and secure payment processing via Razorpay. WebSockets and WebRTC are implemented for real-time communication and video interactions. AWS S3 is used for storing notes and video lectures.

## Features

- **User Authentication**: Secure login/signup with JWT authentication.
- **Quizzes**: Interactive quizzes with results and analytics.
- **Notes Management**: Upload, organize, and access study notes.
- **Video Lectures**: Pre-recorded lectures with a user-friendly interface.
- **Live Classes**: Real-time video classes using WebRTC.
- **Payment Integration**: Razorpay API for handling paid packages.
- **WebSockets**: Real-time updates for quizzes and live classes.
- **Redux**: Global state management for seamless data flow.
- **AWS S3 Storage**: Secure storage for notes and video lectures.

## Tech Stack

### Frontend

- React.js
- Redux Toolkit
- WebRTC
- WebSockets
- Tailwind CSS / Material-UI

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- WebSockets with Socket.io
- Razorpay API Integration
- AWS S3 for storage

## Installation

### Prerequisites

Ensure you have Node.js, MongoDB, and a Razorpay account configured.

### Steps to Run

1. Clone the repository:
2. Install dependencies for both frontend and backend:
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `server` directory and configure:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     RAZORPAY_KEY_ID=your_razorpay_key
     RAZORPAY_KEY_SECRET=your_razorpay_secret
     AWS_ACCESS_KEY=your_aws_access_key
     AWS_SECRET_KEY=your_aws_secret_key
     AWS_S3_BUCKET_NAME=your_s3_bucket_name
     ```
4. Start the backend server:
   ```sh
   cd server
   npm start
   ```
5. Start the frontend:
   ```sh
   cd client
   npm start
   ```
6. Open the browser and navigate to `http://localhost:3000`

