import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { ThemeContext } from '../context/ThemeProvider';
import {
  FaClock, FaHeart, FaUtensils, FaTags, FaUser, FaBookmark,
} from 'react-icons/fa';
import { MdCategory, MdOutlinePlaylistAddCheck } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://recipe-book-server-silk.vercel.app/recipes/${id}`);
        const data = await res.json();
        setRecipe(data);
      } catch {
        toast.error('Failed to fetch recipe');
      } finally {
        setLoading(false);
      }
    };

    const checkBookmark = async () => {
      try {
        const res = await fetch(`https://recipe-book-server-silk.vercel.app/recipes/bookmarks/check?user=${user.email}&recipeId=${id}
        `);
        const data = await res.json();
        setBookmarked(data.bookmarked === true);
      } catch {
        console.error('Bookmark check failed');
      }
    };

    fetchRecipe();
    checkBookmark();
  }, [id, user, navigate]);

  const handleLike = async () => {
    if (!user || !recipe) return;

    if (user.email === recipe.createdBy) {
      toast.warn("You can't like your own recipe.");
      return;
    }

    setRecipe(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));

    try {
      const res = await fetch(`https://recipe-book-server-silk.vercel.app/recipes/${id}/like`, { method: 'PATCH' });
      const data = await res.json();
      if (data.success || data.modifiedCount > 0) {
        toast.success('Liked!');
      }
    } catch {
      toast.error('Failed to update like');
    }
  };

  const handleBookmark = async () => {
    if (!user || !recipe) return;

    if (user.email === recipe.createdBy) {
      toast.warn("You can't bookmark your own recipe.");
      return;
    }

    if (bookmarked) {
      toast.info("You already bookmarked this recipe.");
      return;
    }

    const bookmarkData = {
      recipeId: id,
      userEmail: user.email,
      image: recipe.image,
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      cuisineType: recipe.cuisineType,
      preparationTime: recipe.preparationTime,
      categories: recipe.categories,
      likes: recipe.likes,
      createdBy: recipe.createdBy,
    };

    try {
      const res = await fetch('https://recipe-book-server-silk.vercel.app/recipes/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookmarkData),
      });
      const data = await res.json();
      if (data.insertedId || data.success) {
        toast.success('Recipe bookmarked!');
        setBookmarked(true);
      } else {
        toast.error('Bookmark failed');
      }
    } catch {
      toast.error('Server error during bookmark');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <ClipLoader color="#22c55e" size={50} />
      </div>
    );
  }

  if (!recipe) {
    return <p className="text-center text-red-500 mt-10">Recipe not found.</p>;
  }

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 rounded-2xl shadow-lg transition-colors duration-300 
      ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>

      <p className="text-lg sm:text-xl font-semibold text-green-600 dark:text-green-300 mb-4">
        {recipe.likes || 0} people interested in this recipe
      </p>

      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{recipe.title}</h1>

      <img
        src={recipe.image || 'https://via.placeholder.com/600x400?text=No+Image'}
        alt={recipe.title || 'Recipe Image'}
        className="w-full max-h-[300px] object-cover rounded-xl mb-6 border border-gray-200 dark:border-gray-700"
      />

      <div className="space-y-4 text-base sm:text-lg leading-relaxed">
        <p className="flex items-center gap-2"><FaUser className="text-green-600" /><strong>Created By:</strong> {recipe.createdBy}</p>
        <p className="flex items-center gap-2"><FaUtensils className="text-green-600" /><strong>Cuisine Type:</strong> {recipe.cuisineType || 'N/A'}</p>
        <p className="flex items-center gap-2"><FaClock className="text-green-600" /><strong>Preparation Time:</strong> {recipe.preparationTime || 'N/A'}</p>
        <p className="flex items-start gap-2">
          <MdOutlinePlaylistAddCheck className="text-green-600 mt-1" />
          <strong>Instructions:</strong> <span className="whitespace-pre-line">{recipe.instructions}</span>
        </p>
        <p className="flex items-center gap-2"><FaTags className="text-green-600" /><strong>Ingredients:</strong> {recipe.ingredients?.join(', ') || 'N/A'}</p>
        <p className="flex items-center gap-2"><MdCategory className="text-green-600" /><strong>Categories:</strong> {recipe.categories?.join(', ') || 'N/A'}</p>
        <p className="flex items-center gap-2"><FaHeart className="text-red-500" /><strong>Likes:</strong> {recipe.likes || 0}</p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <motion.button
          onClick={handleLike}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition duration-200 font-medium"
        >
          <FaHeart className="text-white" />
          Like
        </motion.button>

        <motion.button
          onClick={handleBookmark}
          whileTap={{ scale: 0.95 }}
          disabled={bookmarked}
          className={`inline-flex items-center gap-2 px-5 py-3 ${
            bookmarked ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
          } text-white rounded-xl shadow-md transition duration-200 font-medium`}
        >
          <FaBookmark />
          {bookmarked ? 'Bookmarked' : 'Bookmark'}
        </motion.button>
      </div>
    </div>
  );
};

export default RecipeDetails;
