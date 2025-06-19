import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { ThemeContext } from "../context/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Fade } from "react-awesome-reveal";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setLoading(true);
    fetch("https://recipe-book-server-silk.vercel.app/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, []);

  const cuisineTypes = ["All", ...new Set(recipes.map(r => r.cuisineType).filter(Boolean))];

  useEffect(() => {
    if (cuisineFilter === "All") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(recipes.filter(r => r.cuisineType === cuisineFilter));
    }
  }, [cuisineFilter, recipes]);

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        All Recipes
      </h1>

      {/* Filter Dropdown */}
      <Fade triggerOnce>
        <div className="mb-8 flex justify-center">
          <select
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
            className={`w-full max-w-xs sm:max-w-sm md:max-w-md border rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition
              ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
          >
            {cuisineTypes.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>
      </Fade>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-[var(--primary-color)] border-t-transparent rounded-full"
            aria-label="Loading"
          />
        </div>
      ) : filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-500">
          No recipes found for this cuisine.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredRecipes.map((recipe) => (
              <motion.div
                key={recipe._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RecipeCard
                  recipe={recipe}
                  onSeeDetails={(id) => navigate(`/recipe/${id}`)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AllRecipes;
