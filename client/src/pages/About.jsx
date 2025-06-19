import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeProvider';
import { AuthContext } from '../context/AuthProvider';

import aboutBanner from '../assets/images/about-banner.jpg';
import teamwork from '../assets/images/teamwork.avif';
import healthyFood from '../assets/images/about-food.jpg';
import topFood from '../assets/images/top-recipe.jpg';

const About = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleJoinClick = () => {
    if (user) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div
      className={`transition-colors duration-300 min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      {/* Hero Section */}
      <section className="relative w-full h-64 md:h-[28rem] overflow-hidden">
        <img
          src={aboutBanner}
          alt="Delicious food banner"
          className="w-full h-full object-cover"
          style={{ filter: theme === 'dark' ? 'brightness(0.7)' : 'none' }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1
            className={`text-3xl md:text-5xl font-extrabold text-center animate-fadeUp ${
              theme === 'dark' ? 'text-white' : 'text-blue-800'
            }`}
          >
            Welcome to Our Recipe Book
          </h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:flex md:items-center gap-8">
        <div className="md:w-1/2 mb-6 md:mb-0 animate-slideInLeft">
          <img
            src={teamwork}
            alt="Cooking together"
            className="rounded-xl shadow-md w-full"
            style={{ filter: theme === 'dark' ? 'brightness(0.85)' : 'none' }}
          />
        </div>
        <div className="md:w-1/2 space-y-4 animate-slideInRight">
          <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            Our Mission
          </h2>
          <p>
            At Recipe Book, our goal is to bring the joy of cooking to every home. Whether you're a beginner or a master chef,
            we provide a platform to discover, save, and share recipes that delight and inspire.
          </p>
          <p>
            With community-driven content, detailed instructions, and an easy-to-use interface, we make sure you never run out of ideas
            for your next meal.
          </p>
        </div>
      </section>

      {/* Featured Recipe */}
      <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} py-12`}>
        <div className="max-w-6xl mx-auto px-4 md:flex md:items-center gap-8 flex-row-reverse">
          <div className="md:w-1/2 space-y-4 animate-slideInLeft">
            <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              Featured Recipe
            </h2>
            <p>
              Enjoy our community-favorite recipe – a healthy bowl of goodness made with love, grains, and greens.
            </p>
            <p>
              This top recipe is not only nutritious but also packed with flavor, making it a perfect meal for any time of the day.
            </p>
          </div>
          <div className="md:w-1/2 mb-6 md:mb-0 animate-slideInRight">
            <img
              src={healthyFood}
              alt="Healthy bowl"
              className="rounded-xl shadow-md w-full"
              style={{ filter: theme === 'dark' ? 'brightness(0.85)' : 'none' }}
            />
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className={`py-12 px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto md:flex md:items-center gap-8">
          <div className="md:w-1/2 space-y-4 animate-slideInLeft">
            <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
              Our Community
            </h2>
            <p>
              Recipe Book is more than just a collection of recipes – it's a global community of food lovers sharing ideas, tips, and
              flavors from around the world.
            </p>
            <p>
              Join us to publish your favorite recipes, try new cuisines, or simply get inspired to create magic in your kitchen.
            </p>
          </div>
          <div className="md:w-1/2 animate-slideInRight">
            <img
              src={topFood}
              alt="Dessert"
              className="rounded-xl shadow-md w-full"
              style={{ filter: theme === 'dark' ? 'brightness(0.85)' : 'none' }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`text-center py-12 px-4 animate-fadeIn ${
          theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-800'
        }`}
      >
        <h2 className="text-3xl font-bold mb-4">Start Your Culinary Journey Today</h2>
        <p className="text-lg mb-6">
          Sign up and share your delicious creations with our community.
        </p>
        <button
          onClick={handleJoinClick}
          className={`inline-block font-semibold px-6 py-2 rounded transition ${
            theme === 'dark'
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Join Now
        </button>
      </section>
    </div>
  );
};

export default About;
