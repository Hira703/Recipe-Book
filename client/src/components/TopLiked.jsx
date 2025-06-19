import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const TopLikedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://recipe-book-server-silk.vercel.app/recipes/top/liked') // Adjust if needed
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching top liked recipes', err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Top Liked Recipes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length > 0 ? (
          recipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)
        ) : (
          <p className="text-center text-gray-500">No recipes found.</p>
        )}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => window.location.assign('/all-recipes')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
        >
          See All Recipes
        </button>
      </div>
    </div>
  );
};

export default TopLikedRecipes;
