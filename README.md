# Blog Platform - Mitt Arv Assignment

A modern, full-stack blog platform built with React, Node.js, and Firebase, featuring user authentication, post creation, and real-time updates. This project was developed as part of the Mitt Arv Software Engineering Internship assignment.

## 🚀 Project Overview

This blog platform is a full-stack web application that allows users to create, read, update, and delete blog posts. It features user authentication, profile management, and a responsive design that works across all devices. The platform is built with modern web technologies and follows best practices for security and performance.

## ✨ Features Implemented

### Authentication & User Management
- User registration and login using Firebase Authentication
- Google OAuth integration
- Profile management with customizable display name and bio
- Secure session management with JWT
- Protected routes and authentication state management

### Blog Post Management
- Create, read, update, and delete blog posts
- Rich text content support
- Post timestamps and author information
- Post preview with content truncation
- Tag-based categorization
- Image upload support

### User Interface
- Responsive design using Tailwind CSS and SCSS
- Modern and clean user interface
- Loading states and error handling
- Navigation between different sections
- Mobile-first approach

## 🛠️ Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS and SCSS for styling
- React Router for navigation
- Context API for state management
- Firebase SDK for authentication

### Backend
- Node.js with Express.js
- Firebase Admin SDK
- RESTful API architecture
- JWT for authentication
- Middleware for request validation

## 🚀 How to Run

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account and configuration

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file with your Firebase configuration:

   ```
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY=your-private-key
   FIREBASE_CLIENT_EMAIL=your-client-email
   ```
4. Start the server:

   ```bash
   npm start
   ```

   The backend server will run on port 5000.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install --legacy-peer-deps
   ```
3. Create a `.env` file with your Firebase configuration:

   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```
4. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at [http://localhost:5173](http://localhost:5173).

## 🤖 AI Tools Used

* **Cursor**: Used as the primary IDE for code completion and suggestions.
* **ChatGPT**: Assisted in debugging and implementing complex features.
* **GitHub Copilot**: Helped with boilerplate code and best practices.

## 🎯 Challenges Faced

1. **Firebase Timestamp Handling**

   * Challenge: Converting Firebase Timestamp objects to JavaScript Date objects.
   * Solution: Implemented proper serialization and deserialization of timestamp data.

2. **Authentication Flow**

   * Challenge: Managing user sessions and protected routes.
   * Solution: Implemented a robust authentication context and route protection.

3. **Real-time Updates**

   * Challenge: Ensuring data consistency across components.
   * Solution: Implemented proper state management using Context API.

4. **Error Handling**

   * Challenge: Managing various types of errors (network, authentication, validation).
   * Solution: Created a comprehensive error handling system with user-friendly messages.

## 📝 Future Improvements

* Add image upload support for blog posts.
* Implement comment system.
* Add search functionality.
* Implement pagination for posts.
* Add social sharing features.
* Implement SEO optimization.
* Add rich text editor integration.
* Implement AI content suggestions.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is part of the Mitt Arv Software Engineering Internship assignment.
