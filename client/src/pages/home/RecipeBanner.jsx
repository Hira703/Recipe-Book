import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import hero1 from '../../assets/images/her1.avif';
import hero2 from '../../assets/images/hero2.jpg';
import hero3 from '../../assets/images/hero3.jpg';
import hero4 from '../../assets/images/hero4.jpg';

const images = [hero1, hero2, hero3, hero4];

// Variants for fade + slide up animation with staggered delay via custom prop
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.3,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

const RecipeBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full h-72 md:h-[32rem] rounded-xl overflow-hidden shadow-xl
                 bg-gray-50 dark:bg-gray-900 transition-colors duration-700"
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt="Delicious Recipe"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent
                   flex flex-col items-center justify-center text-center px-6 md:px-10 gap-6"
      >
        {/* Animated Heading */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-4xl md:text-6xl font-extrabold font-playfair leading-tight max-w-3xl mx-auto
                     bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
        >
          <Typewriter
            words={['Welcome To ReciPixie','Tiny Pixie, Big Flavour','Taste the Magic', 'Discover New Flavors', 'Bring Joy to Your Kitchen']}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </motion.h1>

        {/* Animated Paragraph */}
        <motion.p
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto font-medium drop-shadow-md tracking-wide"
          style={{ textShadow: '0 0 6px rgba(0,0,0,0.7)' }}
        >
          Discover the flavors of this delicious recipe and bring joy to your kitchen. Let your culinary journey begin here!
        </motion.p>

        {/* Animated Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex justify-center flex-wrap gap-5"
        >
          <button
            className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg font-semibold
                       hover:brightness-110 hover:scale-105 transition duration-300 shadow-lg shadow-[var(--primary-color)]"
            data-tooltip-id="startCookingTip"
          >
            Start Cooking
          </button>

          <button
            className="bg-white dark:bg-gray-800 text-[var(--primary-color)] px-6 py-3 rounded-lg font-semibold
                       flex items-center gap-3 hover:scale-105 transition duration-300 shadow-md"
            data-tooltip-id="addFavoriteTip"
          >
            <FaHeart className="text-[var(--primary-color)]" />
            Add to Favorites
          </button>

          <ReactTooltip id="startCookingTip" place="top" effect="solid" delayShow={300} />
          <ReactTooltip id="addFavoriteTip" place="top" effect="solid" delayShow={300} />
        </motion.div>
      </div>
    </section>
  );
};

export default RecipeBanner;
