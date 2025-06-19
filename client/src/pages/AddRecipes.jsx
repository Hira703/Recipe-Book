import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthProvider";
import bg from "../assets/images/add.avif";

const AddRecipes = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    ingredients: "",
    instructions: "",
    cuisineType: "",
    preparationTime: "",
    categories: {
      Breakfast: false,
      Lunch: false,
      Dinner: false,
      Dessert: false,
      Vegan: false,
    },
    likes: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        categories: { ...prev.categories, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.image ||
      !formData.title ||
      !formData.ingredients ||
      !formData.instructions ||
      !formData.cuisineType ||
      !formData.preparationTime
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const selectedCategories = Object.entries(formData.categories)
      .filter(([_, val]) => val)
      .map(([key]) => key);

    const newRecipe = {
      image: formData.image,
      title: formData.title,
      ingredients: formData.ingredients.split(",").map((ing) => ing.trim()),
      instructions: formData.instructions,
      cuisineType: formData.cuisineType,
      preparationTime: Number(formData.preparationTime),
      categories: selectedCategories,
      likes: 0,
      createdBy: user?.email || "Anonymous",
      
      
    };
console.log(newRecipe.preparationTime)
    try {
      const res = await fetch("https://recipe-book-server-silk.vercel.app/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      if (res.ok) {
        toast.success("Recipe added successfully!");
        setFormData({
          image: "",
          title: "",
          ingredients: "",
          instructions: "",
          cuisineType: "",
          preparationTime: "",
          categories: {
            Breakfast: false,
            Lunch: false,
            Dinner: false,
            Dessert: false,
            Vegan: false,
          },
          likes: 0,
        });
      } else {
        toast.error("Failed to add recipe.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding recipe.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-16 px-4 backdrop-brightness-110 backdrop-contrast-125"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {user ? (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 dark:text-gray-100 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
            Add New Recipe
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image */}
            <div>
              <label className="block mb-2 font-semibold dark:text-gray-300">
                Image URL *
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter image URL"
                required
              />
            </div>

            {/* Title */}
            <div>
              <label className="block mb-2 font-semibold dark:text-gray-300">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Recipe title"
                required
              />
            </div>

            {/* Ingredients */}
            <div>
              <label className="block mb-2 font-semibold dark:text-gray-300">
                Ingredients * (comma separated)
              </label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="E.g., 1 cup flour, 2 eggs, salt"
                required
              ></textarea>
            </div>

            {/* Instructions */}
            <div>
              <label className="block mb-2 font-semibold dark:text-gray-300">
                Instructions *
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Describe how to prepare the recipe"
                required
              ></textarea>
            </div>

            {/* Cuisine Type */}
            <div>
              <label className="block mb-2 font-semibold dark:text-gray-300">
                Cuisine Type *
              </label>
              <select
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select cuisine</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Preparation Time */}
            <div>
              <label className="block mb-2 font-semibold dark:text-gray-300">
                Preparation Time (minutes) *
              </label>
              <input
                type="number"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. 30"
                min="1"
                required
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block mb-3 font-semibold dark:text-gray-300">
                Categories
              </label>
              <div className="flex flex-wrap gap-6">
                {Object.keys(formData.categories).map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      name={cat}
                      checked={formData.categories[cat]}
                      onChange={handleChange}
                      className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-green-500 focus:ring-green-400"
                    />
                    <span className="dark:text-gray-300">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className=" btn w-full py-4 bg-green-600 hover:bg-green-700 transition text-white font-bold rounded-md shadow-md"
            >
              Add Recipe
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center mt-24 bg-white dark:bg-gray-900 max-w-xl mx-auto p-10 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-red-600 dark:text-red-400">
            Access Denied
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            You must be logged in to add a new recipe. Please login first.
          </p>
        </div>
      )}
    </div>
  );
};

export default AddRecipes;
