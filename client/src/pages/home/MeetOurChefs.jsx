import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';
import { motion } from 'framer-motion';

const chefs = [
  {
    name: "Chef Rumi Akter",
    image: "https://cdn-icons-png.flaticon.com/512/2922/2922688.png",
    specialty: "Bangladeshi Traditional Dishes",
    experience: "12 years",
    bio: "Expert in authentic Bangladeshi cuisine with deep-rooted passion for traditional flavors passed down generations.",
  },
  {
    name: "Chef Arman Hossain",
    image: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    specialty: "Continental & Fusion Recipes",
    experience: "9 years",
    bio: "Innovative chef known for blending East and West with bold fusion dishes that surprise and delight.",
  },
  {
    name: "Chef Tanvir Chowdhury",
    image: "https://cdn-icons-png.flaticon.com/512/2922/2922506.png",
    specialty: "Healthy & Vegan Meals",
    experience: "7 years",
    bio: "Health-conscious culinary artist focused on delicious plant-based meals using organic and seasonal ingredients.",
  },
  {
    name: "Chef Nabila Hasan",
    image: "https://cdn-icons-png.flaticon.com/512/2922/2922656.png",
    specialty: "Desserts & Pastries",
    experience: "10 years",
    bio: "Pastry chef specializing in elegant desserts and artisanal pastries, known for her precise technique and creativity.",
  },
];

const MeetOurChefs = () => {
  const { theme } = useContext(ThemeContext);

  const sectionBg = theme === 'dark' ? 'bg-gray-900' : 'bg-orange-50';
  const titleText = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const cardBg = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700';
  const subText = theme === 'dark' ? 'text-gray-300' : 'text-gray-500';
  const shadow = theme === 'dark' ? 'shadow-md' : 'shadow-lg';

  return (
    <section className={`py-16 transition-all duration-300 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-3xl sm:text-4xl font-bold mb-12 ${titleText}`}
        >
          👨‍🍳 Meet Our Chefs
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {chefs.map((chef, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`rounded-xl p-6 ${cardBg} ${shadow} hover:shadow-2xl transition-all`}
            >
              <img
                src={chef.image}
                alt={chef.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-500"
              />
              <h3 className="text-lg font-semibold mb-1">{chef.name}</h3>
              <p className={`text-sm italic mb-2 ${subText}`}>{chef.specialty}</p>
              <p className={`text-sm ${subText}`}>Experience: {chef.experience}</p>
              <p className={`mt-2 text-xs ${subText}`}>{chef.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurChefs;
