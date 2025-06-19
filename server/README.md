# Recipe Book App - Backend

Backend REST API for the Recipe Book App built with Node.js, Express, and MongoDB.

---

## Features

- CRUD operations for recipes
- Like recipes
- Bookmark recipes and manage user bookmarks
- Retrieve top liked recipes
- Query recipes by creator email

---

## Technologies

- Node.js  
- Express.js  
- MongoDB (native driver)  
- dotenv for environment variables  
- CORS  
- Deployed on Vercel

---

## Environment Variables

Create a `.env` file in the backend root with:

PORT=3000
MONGODB_URI=your_mongodb_connection_string

yaml
Copy
Edit

**Note:** When deploying to Vercel, add these environment variables in your Vercel dashboard for your project (Settings > Environment Variables).

---

## Setup & Run Locally

1. Install dependencies:

```bash
npm install
Start the development server:

bash
Copy
Edit
npm run dev
By default, the server runs on http://localhost:3000.

API Endpoints
Method	Endpoint	Description
GET	/recipes	Get all recipes or filter by email (query param)
GET	/recipes/:id	Get a recipe by ID
POST	/recipes	Create a new recipe
PUT	/recipes/:id	Update a recipe by ID
PATCH	/recipes/:id/like	Like a recipe
DELETE	/recipes/:id	Delete a recipe by ID
GET	/recipes/top/liked	Get top 6 most liked recipes
POST	/recipes/bookmarks	Bookmark a recipe
GET	/recipes/bookmarks/check	Check if a recipe is bookmarked (query params user, recipeId)
GET	/recipes/bookmarks	Get all bookmarks for a user (query param email)

Deployment on Vercel
Your entry point is server.js.

Vercel config (vercel.json) routes all API calls correctly.

Remember to set environment variables in Vercel (e.g., MONGODB_URI, PORT).

The API base URL will look like: https://recipe-book-server-silk.vercel.app/

Author
Your Name — your.email@example.com

License
This project is licensed under the MIT License.