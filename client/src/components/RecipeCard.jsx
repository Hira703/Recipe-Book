import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Fade } from 'react-awesome-reveal';
import { FaClock, FaUtensils, FaTags, FaHeart } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeProvider';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const handleSeeDetails = () => {
    navigate(`/recipe/${recipe._id}`);
  };
console.log(recipe)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        rounded-xl shadow-md overflow-hidden transition-transform duration-200
        hover:-translate-y-1 hover:shadow-xl flex flex-col
        ${isDarkMode ? 'bg-gray-900 shadow-gray-700' : 'bg-white shadow-lg'}
      `}
    >
      <div className="p-3">
        <img
          src={recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={recipe.title}
          className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg"
        />
      </div>

      <div className={`px-4 pb-5 pt-2 flex flex-col flex-grow ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <Fade cascade triggerOnce damping={0.1}>
          <h2 className="text-lg font-bold mb-2 line-clamp-2">{recipe.title}</h2>

          <div className="text-sm space-y-2 flex-grow">
            <p className="flex items-center gap-2 flex-wrap">
              <FaUtensils className="text-[var(--primary-color)]" />
              <span className="font-medium">Cuisine:</span> {recipe.cuisineType || 'N/A'}
            </p>
            <p className="flex items-center gap-2 flex-wrap">
              <FaClock className="text-[var(--primary-color)]" />
              <span className="font-medium">Prep Time:</span> {recipe.preparationTime ? `${recipe.preparationTime}` : 'N/A'}
            </p>
            <p className="flex items-center gap-2 flex-wrap">
              <FaTags className="text-[var(--primary-color)]" />
              <span className="font-medium">Categories:</span> {recipe.categories?.length > 0 ? recipe.categories.join(', ') : 'N/A'}
            </p>
          </div>
        </Fade>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-red-500 gap-1">
            <FaHeart />
            <span className={`${isDarkMode ? 'text-white' : 'text-gray-700'} text-sm`}>
              {recipe.likes || 0}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleSeeDetails}
            className={`
             btn py-2 px-4 rounded-md transition shadow-md text-sm sm:text-base
              ${isDarkMode
                ? 'bg-[var(--primary-color)] text-white hover:brightness-110'
                : 'bg-[var(--primary-color-light)] text-gray-900 hover:bg-[var(--primary-color)] hover:text-white'}
            `}
            style={{
              '--primary-color-light': '#a3cef1',
              '--primary-color': '#2563eb',
            }}
          >
            See Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
