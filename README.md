# 🍽️ Recipe Book App

**Live Client:** https://auth-integration-c08e3.web.app/
**Live Server:** https://recipe-book-server-silk.vercel.app

---

## 🚀 Features

- 🔐 Firebase Authentication (Email/Password & Google Login)
- 🧾 Add, View, Update, and Delete Your Own Recipes
- ❤️ Like other users’ recipes (except your own)
- 🌟 Top 6 Recipes Section Based on Likes
- 📃 Wishlist Feature and My Recipes Page (Private)
- 🌐 Responsive Design for Desktop, Tablet & Mobile
- 🌓 Theme Toggle: Light & Dark Mode
- 🎞️ Animated UI using React Animation Libraries
- 🔎 Filter Recipes by Cuisine Type
- 🚫 Custom 404 Page with Food Theme

---

## 🛠️ Tech Stack

### Frontend:
- **React.js**
- **Tailwind CSS** + **DaisyUI**
- **Firebase Authentication**
- **React Router DOM**
- **SweetAlert2** & **React Toastify**
- **Lottie React**
- **React Awesome Reveal**
- **React Simple Typewriter**
- **Environment Variables (.env)**

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB (No Mongoose)**
- **CORS**
- **Dotenv**
- **Body-parser**

---

## 🔧 Getting Started (For Developers)

### Client Setup

```bash
git clone https://github.com/your-username/recipe-book-client.git
cd recipe-book-client
npm install
Create a .env file in the root with your Firebase credentials:

ini
Copy
Edit
VITE_APIKEY=your_api_key
VITE_AUTHDOMAIN=your_auth_domain
VITE_PROJECTID=your_project_id
VITE_STORAGEBUCKET=your_storage_bucket
VITE_MESSAGINGSENDERID=your_messaging_sender_id
VITE_APPID=your_app_id
bash
Copy
Edit
npm run dev
Server Setup
bash
Copy
Edit
git clone https://github.com/your-username/recipe-book-server.git
cd recipe-book-server
npm install
Create a .env file in the root with the following:

ini
Copy
Edit
PORT=5000
MONGODB_URI=your_mongodb_connection_string
bash
Copy
Edit
node index.js

