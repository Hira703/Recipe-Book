import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { ThemeContext } from '../context/ThemeProvider';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaHeart, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CUISINE_OPTIONS = ['Italian', 'Mexican', 'Indian', 'Chinese', 'Japanese', 'Bangladeshi', 'American', 'Greek', 'Others'];
const CATEGORY_OPTIONS = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan'];

const MyRecipes = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null); // null or recipe obj (for add/edit)
  const [loading, setLoading] = useState(true);
  const [categoriesChecked, setCategoriesChecked] = useState([]); // for form categories

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://recipe-book-server-silk.vercel.app/recipes?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load your recipes');
        setLoading(false);
      });
  }, [user]);

  // For checkboxes toggle in form
  const toggleCategory = (category) => {
    setCategoriesChecked(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  // Open modal for editing or adding new
  const openEditModal = (recipe) => {
    setCurrentRecipe(recipe);
    setCategoriesChecked(recipe?.categories || []);
  };

  const openAddModal = () => {
    setCurrentRecipe({
      image: '',
      title: '',
      ingredients: '',
      instructions: '',
      cuisine: CUISINE_OPTIONS[0],
      prepTime: '',
      categories: [],
      likes: 0,
      email: user.email, // make sure to add user email for new recipe
    });
    setCategoriesChecked([]);
  };

  const closeModal = () => {
    setCurrentRecipe(null);
    setCategoriesChecked([]);
  };

  const handleDelete = id => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    fetch(`https://recipe-book-server-silk.vercel.app/recipes/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        toast.success('Recipe deleted');
        setRecipes(recipes.filter(recipe => recipe._id !== id));
      })
      .catch(() => toast.error('Failed to delete recipe'));
  };

  // Handle submit for both add & update
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;

    const recipeData = {
      image: form.image.value.trim(),
      title: form.title.value.trim(),
      ingredients: form.ingredients.value.trim(),
      instructions: form.instructions.value.trim(),
      cuisine: form.cuisine.value,
      prepTime: Number(form.prepTime.value),
      categories: categoriesChecked,
      likes: currentRecipe.likes || 0,
      email: user.email,
    };

    if (!recipeData.title || !recipeData.ingredients || !recipeData.instructions || !recipeData.cuisine || !recipeData.prepTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (currentRecipe._id) {
      // UPDATE
      fetch(`https://recipe-book-server-silk.vercel.app/recipes/${currentRecipe._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      })
        .then(res => res.json())
        .then(() => {
          toast.success('Recipe updated');
          setRecipes(recipes.map(r => (r._id === currentRecipe._id ? { ...r, ...recipeData } : r)));
          closeModal();
        })
        .catch(() => toast.error('Failed to update recipe'));
    } else {
      // ADD NEW
      fetch(`https://recipe-book-server-silk.vercel.app/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      })
        .then(res => res.json())
        .then(newRecipe => {
          toast.success('Recipe added');
          setRecipes([newRecipe, ...recipes]);
          closeModal();
        })
        .catch(() => toast.error('Failed to add recipe'));
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen p-4 sm:p-6 md:p-10`}>
      <h2
        className={`
          text-center
          font-extrabold
          tracking-wide
          mb-6
          ${
            theme === 'dark'
              ? 'text-green-400 text-3xl sm:text-4xl md:text-5xl'
              : 'text-green-700 text-2xl sm:text-3xl md:text-4xl'
          }
        `}
      >
        My Recipes
      </h2>

      {/* <div className="flex justify-center mb-8">
        <button
          onClick={openAddModal}
          className={`
            flex items-center gap-2 px-5 py-3 rounded font-bold shadow
            transition-colors duration-300
            ${
              theme === 'dark'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }
          `}
          aria-label="Add new recipe"
        >
          <FaPlus />
          Add Recipe
        </button>
      </div> */}

      {recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-12 px-4">
          <p className="text-center text-lg mb-6">You have no recipes yet.</p>
          <Link
            to="/add-recipes"
            className={`
             btn px-6 py-3 rounded font-bold shadow
              transition-colors duration-300
              ${
                theme === 'dark'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }
            `}
          >
            Add Your First Recipe
          </Link>
        </div>
      ) : (
        <div
          className={`
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            px-2 sm:px-4 md:px-6
          `}
        >
          {recipes.map(recipe => (
            <motion.div
              key={recipe._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`
                rounded-xl shadow-md overflow-hidden flex flex-col
                ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-900'
                }
              `}
            >
              <img
                src={recipe.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                alt={recipe.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2 truncate">{recipe.title}</h3>
                <p className="text-sm mb-1"><strong>Ingredients:</strong> {recipe.ingredients}</p>
                <p className="text-sm mb-1"><strong>Instructions:</strong> {recipe.instructions}</p>
                <p className="text-sm mb-1"><strong>Cuisine:</strong> {recipe.cuisine}</p>
                <p className="text-sm mb-1"><strong>Prep Time:</strong> {recipe.prepTime} mins</p>
                <p className="text-sm mb-1"><strong>Categories:</strong> {recipe.categories?.join(', ')}</p>
                <p className="text-sm mb-3 flex items-center gap-2">
                  <FaHeart className="text-red-500" /> <strong>{recipe.likes}</strong> Likes
                </p>

                <div className="mt-auto flex gap-3 flex-wrap sm:flex-nowrap">
                  <button
                    onClick={() => openEditModal(recipe)}
                    className={`
                     btn flex items-center justify-center gap-2 flex-grow sm:flex-grow-0
                      bg-yellow-500 hover:bg-yellow-600 transition rounded py-2 px-4 text-white font-semibold shadow
                      whitespace-nowrap
                    `}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className={`
                     btn flex items-center justify-center gap-2 flex-grow sm:flex-grow-0
                      bg-red-600 hover:bg-red-700 transition rounded py-2 px-4 text-white font-semibold shadow
                      whitespace-nowrap
                    `}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {/* Add/Edit Modal */}
<AnimatePresence>
  {currentRecipe && (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ${
        theme === 'light' ? 'bg-black bg-opacity-60' : 'bg-gray-900 bg-opacity-80'
      }`}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className={`${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto flex flex-col p-6`}
      >
        <h3 className="text-2xl font-bold mb-4">
          {currentRecipe._id ? 'Update Recipe' : 'Add Recipe'}
        </h3>

        {/* Image URL */}
        <input
          name="image"
          defaultValue={currentRecipe.image || ''}
          placeholder="Image URL"
          className={`w-full p-3 rounded border mb-4 transition-colors focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-400'
              : 'bg-gray-100 border-gray-300 text-gray-900 focus:ring-green-600'
          }`}
          type="url"
          required
        />

        {/* Title */}
        <input
          name="title"
          defaultValue={currentRecipe.title || ''}
          placeholder="Title"
          className={`w-full p-3 rounded border mb-4 transition-colors focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-400'
              : 'bg-gray-100 border-gray-300 text-gray-900 focus:ring-green-600'
          }`}
          type="text"
          required
        />

        {/* Cuisine Dropdown */}
        <select
          name="cuisine"
          value={currentRecipe.cuisine || CUISINE_OPTIONS[0]}
          onChange={(e) =>
            setCurrentRecipe({ ...currentRecipe, cuisine: e.target.value })
          }
          className={`w-full p-3 rounded border mb-4 transition-colors focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-400'
              : 'bg-gray-100 border-gray-300 text-gray-900 focus:ring-green-600'
          }`}
          required
        >
          {CUISINE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Preparation Time */}
        <input
          name="prepTime"
          defaultValue={currentRecipe.prepTime || ''}
          placeholder="Preparation Time (minutes)"
          className={`w-full p-3 rounded border mb-4 transition-colors focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-400'
              : 'bg-gray-100 border-gray-300 text-gray-900 focus:ring-green-600'
          }`}
          type="number"
          min="1"
          required
        />

        {/* Categories Checkboxes */}
        <fieldset className="mb-4">
          <legend className="font-semibold mb-2">Categories</legend>
          <div className="flex flex-wrap gap-3">
            {CATEGORY_OPTIONS.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={categoriesChecked.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="cursor-pointer"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Ingredients */}
        <textarea
          name="ingredients"
          defaultValue={currentRecipe.ingredients || ''}
          placeholder="Ingredients"
          rows={3}
          className={`w-full p-3 rounded border mb-4 resize-y transition-colors focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-400'
              : 'bg-gray-100 border-gray-300 text-gray-900 focus:ring-green-600'
          }`}
          required
        />

        {/* Instructions */}
        <textarea
          name="instructions"
          defaultValue={currentRecipe.instructions || ''}
          placeholder="Instructions"
          rows={4}
          className={`w-full p-3 rounded border mb-4 resize-y transition-colors focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-400'
              : 'bg-gray-100 border-gray-300 text-gray-900 focus:ring-green-600'
          }`}
          required
        />

        {/* Likes - read only */}
        <input
          name="likes"
          value={currentRecipe.likes}
          placeholder="Likes"
          className="w-full p-3 rounded border bg-gray-300 text-gray-700 cursor-not-allowed mb-4"
          type="number"
          readOnly
        />

        {/* Buttons Footer */}
        <div className="flex justify-end gap-4 sticky bottom-0 pt-4 mt-auto bg-inherit border-t border-gray-300 dark:border-gray-700">
          <button
            type="button"
            onClick={closeModal}
            className="px-5 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" btn px-5 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
          >
            {currentRecipe._id ? 'Save' : 'Add'}
          </button>
        </div>
      </motion.form>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default MyRecipes;
