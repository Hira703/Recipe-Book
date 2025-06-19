# Recipe Book App - Frontend

Frontend application for the Recipe Book App built with React, Tailwind CSS, and Firebase Authentication.

---

## Features

- View, create, update, delete recipes
- Like and bookmark recipes
- View user bookmarks
- Filter recipes by user email
- User authentication with Firebase Auth (Email/Password, Google, etc.)
- Responsive UI with light/dark mode toggle

---

## Technologies

- React  
- React Router  
- Tailwind CSS  
- React Context API  
- React Toastify  
- Firebase Authentication  
- Firebase Hosting

---

## Environment Variables

Create a `.env` file in the frontend root with your Firebase config and backend API base URL:

VITE_API_BASE_URL=https://recipe-book-server-silk.vercel.app

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

yaml
Copy
Edit

---

## Setup & Run Locally

1. Install dependencies:

```bash
npm install
Run the frontend locally:

bash
Copy
Edit
npm run dev
Frontend runs typically at http://localhost:5173.

Deployment
Deployed on Firebase Hosting.

Use the Firebase CLI to deploy:

bash
Copy
Edit
firebase deploy
Ensure your Firebase Authentication is configured in the Firebase Console.

Make sure to set the environment variables in your local .env file during development.

Author
soniahira48@gmail.com