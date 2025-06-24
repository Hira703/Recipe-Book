# 🍽️ Recipe Book App

A modern, responsive and dynamic recipe management platform where users can add, explore, like, bookmark, and manage their favorite recipes. Built using React, Tailwind CSS, Firebase Authentication, MongoDB, and Express.js, this app is ideal for food lovers who want a personal recipe collection and discover new ideas from others.

## 🔗 Live Website

🌐 [Visit Recipe Book App](https://authenticate-app-c0ea1.web.app/)

---

## ✨ Features

- 🔐 **Authentication System**
  - Firebase Email/Password and Google Sign-In support
  - Protected Routes for authenticated user access only

- 📚 **Recipe Management**
  - Add, update, delete your own recipes
  - Like recipes by others (can’t like own)
  - Bookmark favorite recipes
  - Filter recipes by Cuisine Type
  - View detailed recipe pages with rich content

- 💡 **Theme Toggle**
  - Light/Dark mode support using React Context and Tailwind CSS

- 📈 **Top Recipes Section**
  - Displays the top 6 liked recipes using MongoDB sorting and limiting

- 🏠 **Responsive UI**
  - Fully responsive for mobile, tablet, and desktop

- 💬 **User Feedback**
  - Toast and SweetAlert used for all user actions (no default browser alerts)

- 🎨 **Enhanced UI Interactions**
  - Animated effects using:
    - `Lottie-react` (custom loader/animations)
    - `React-simple-typewriter` (typing effects in banners)
    - `React Awesome Reveal` (fade-in scroll animations)

---

## 🔧 Tech Stack

### Client-side
- React.js
- React Router DOM
- Firebase Auth
- Tailwind CSS + DaisyUI
- React Context API
- SweetAlert2 / React Toastify
- Lottie, React Simple Typewriter, React Awesome Reveal

### Server-side
- Node.js
- Express.js
- MongoDB (No Mongoose)
- CORS and Dotenv
- JWT Authentication for secure data access

---

## 📁 Folder Structure Highlights
```bash
client/
├── src/
│ ├── components/ # Reusable components
│ ├── context/ # ThemeContext and AuthContext
│ ├── pages/ # Route pages (Home, Recipes, Add, etc.)
│ ├── routes/ # PrivateRoute and PublicRoute components
│ ├── assets/ # Static images and Lottie JSONs
│ └── main.jsx # Root file
server/
├── routes/ # API route handlers
├── controllers/ # Controller logic for endpoints
├── config/ # MongoDB connection
├── utils/ # JWT/validation helpers
└── server.js # Express app entry
```

---

## 📌 Environment Variables

This project uses `.env` files to protect sensitive credentials.

### Client `.env`
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
```
### Server `.env`
```bash
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```
> 🔒 Ensure `.env` is listed in `.gitignore` to keep credentials secure.

---

## 🧪 Key Functionalities Breakdown

| Feature                         | Type       | Auth Required | Notes                                     |
| ------------------------------ | ---------- | ------------- | ----------------------------------------- |
| View All Recipes               | Public     | ❌             | Includes filtering by cuisine type        |
| Add Recipe                     | Private    | ✅             | Saves recipe with user info               |
| My Recipes (Update/Delete)     | Private    | ✅             | User can only manage their own recipes    |
| Recipe Details with Likes      | Private    | ✅             | Like count increases, owner can't like own|
| Bookmark Recipes               | Private    | ✅             | Stored in localStorage or DB              |
| Theme Toggle                   | Public     | ❌             | Switch between dark and light modes       |

---

---

## 🧠 Inspiration

The idea was to build a recipe sharing and management application tailored to individual users while offering public discovery features. The app combines personal utility with community interaction—like a digital recipe journal that also promotes others’ creations.

---

## 🚀 Deployment

- **Client:** Netlify / Firebase Hosting
- **Server:** Vercel

---

## 🤝 Contact

📧 Developer: Sonia Akter Hira  
📬 Email: soniahira@gmail.com 
