// src/routes/Routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import AllRecipes from '../pages/AllRecipes';
import AddRecipes from '../pages/AddRecipes';
import MyRecipes from '../pages/MyRecipes';

import RecipeDetails from '../pages/RecipeDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../layouts/ProtectedRoute';
import About from '../pages/About';
import Myprofile from '../pages/Myprofile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/all-recipes', element: <AllRecipes /> },
      {
path:'/about',
element:<About></About>
      },

      {
        path: '/add-recipes',
        element: (
          <ProtectedRoute>
            <AddRecipes />
          </ProtectedRoute>
        ),
      },
      {
        path: '/my-recipes',
        element: (
          <ProtectedRoute>
            <MyRecipes />
          </ProtectedRoute>
        ),
      },
      {
        path: '/my-profile',
        element: (
          <ProtectedRoute>
          <Myprofile></Myprofile>
          </ProtectedRoute>
        ),
      },
      {
        path: '/recipe/:id',
        element: (
          <ProtectedRoute>
            <RecipeDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
