import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { ThemeContext } from '../context/ThemeProvider'; 
import { Link } from 'react-router-dom';

import { FiUser, FiBookmark, FiArrowRight, FiClock, FiHeart, FiTag, FiBookOpen, FiList, FiPhone } from 'react-icons/fi';


const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [userInfo, setUserInfo] = useState(null);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user info
        const userRes = await fetch(`https://recipe-book-server-silk.vercel.app/users?email=${user.email}`);
        const userData = await userRes.json();
        setUserInfo(userData);
        console.log(userData)

        // Fetch bookmarks
        const bookmarksRes = await fetch(`https://recipe-book-server-silk.vercel.app/recipes/bookmarks?email=${user.email}`);
        const bookmarksData = await bookmarksRes.json();
        setBookmarkedRecipes(bookmarksData);

      } catch (error) {
        console.error('Error loading profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  if (loading) return <p className="text-center mt-10">Loading your profile...</p>;
  if (!userInfo) return <p className="text-center mt-10">User info not found.</p>;

  // Theme-based colors
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
  const buttonBg = theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600';

  return (
    <div className={`max-w-4xl mx-auto px-4 py-8 transition-colors duration-500 ${bgColor} ${textColor} rounded-md shadow-md`}>
<h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-3 opacity-0 animate-fadeIn">
  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
    <FiUser size={24} />
  </div>
  Welcome, {userInfo.name || user.email} 👋
</h1>

<section
  className={`mb-8 p-6 rounded-lg shadow-md ${cardBg} transition-colors duration-500 opacity-0 animate-fadeIn delay-100`}
>
  <div className="flex items-center gap-4 mb-6">
    {userInfo.photo ? (
      <img
        src={userInfo.photo}
        alt={userInfo.name || userInfo.email}
        className="w-16 h-16 rounded-full object-cover shadow-md"
      />
    ) : (
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl shadow-md">
        <FiUser size={28} />
      </div>
    )}
    <div>
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <FiUser /> Profile Information
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-300">Your personal details</p>
    </div>
  </div>

  <div className="grid sm:grid-cols-2 gap-4 text-sm">
    <p className="flex items-center gap-2">
      <FiUser className="text-blue-500" /> <strong>Name:</strong> {userInfo.name || user.email}
    </p>
    <p className="flex items-center gap-2">
      <FiBookOpen className="text-purple-500" /> <strong>Email:</strong> {user.email}
    </p>
    {userInfo.phone && (
      <p className="flex items-center gap-2">
        <FiPhone className="text-green-500" /> <strong>Phone:</strong> {userInfo.phone}
      </p>
    )}
    {userInfo.address && (
      <p className="flex items-center gap-2">
        <FiTag className="text-yellow-500" /> <strong>Address:</strong> {userInfo.address}
      </p>
    )}
    {userInfo.bio && (
      <p className="sm:col-span-2 flex items-center gap-2">
        <FiList className="text-pink-500" /> <strong>Bio:</strong> {userInfo.bio}
      </p>
    )}
  </div>
</section>




      <div className="mb-10 text-center opacity-0 animate-fadeIn delay-200">
        <Link
          to="/my-recipes"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-md text-white font-semibold shadow-lg transition-colors duration-300 ${buttonBg}`}
        >
          View My Recipes <FiArrowRight size={20} />
        </Link>
      </div>

      <section className="opacity-0 animate-fadeIn delay-300">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <FiBookmark size={26} /> Bookmarked Recipes
        </h2>

        {bookmarkedRecipes.length > 0 ? (
          <div className="flex flex-col gap-8">
            {bookmarkedRecipes.map((recipe, idx) => (
              <article
                key={recipe._id}
                className={`rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] ${cardBg} opacity-0 animate-fadeIn p-6 flex flex-col md:flex-row gap-6`}
                style={{ animationDelay: `${0.1 * idx}s` }}
              >
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full md:w-56 h-56 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold mb-3">{recipe.title}</h3>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-300 mb-4">
                    {recipe.cuisineType && (
                      <span className="flex items-center gap-1 bg-blue-200 dark:bg-blue-800 rounded-full px-3 py-1">
                        <FiTag /> {recipe.cuisineType}
                      </span>
                    )}
                    {recipe.categories && recipe.categories.length > 0 && (
                      <span className="flex items-center gap-1 bg-green-200 dark:bg-green-800 rounded-full px-3 py-1">
                        <FiList /> {recipe.categories.join(', ')}
                      </span>
                    )}
                    {recipe.preparationTime && (
                      <span className="flex items-center gap-1 bg-yellow-200 dark:bg-yellow-800 rounded-full px-3 py-1">
                        <FiClock /> {recipe.preparationTime} mins
                      </span>
                    )}
                    <span className="flex items-center gap-1 bg-red-200 dark:bg-red-800 rounded-full px-3 py-1">
                      <FiHeart /> {recipe.likes || 0} likes
                    </span>
                  </div>

                  <p className="mb-4">
                    <strong>Ingredients:</strong> {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients}
                  </p>

                  <p className="mb-4 line-clamp-4">
                    <strong>Instructions:</strong> {recipe.instructions}
                  </p>

                  <p className="text-sm italic text-gray-600 dark:text-gray-400 mt-auto">
                    Created by: {recipe.createdBy || 'Unknown'}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>You haven’t bookmarked any recipes yet.</p>
        )}
      </section>

      {/* Fade-in animation CSS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease forwards;
          }
          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default MyProfile;
