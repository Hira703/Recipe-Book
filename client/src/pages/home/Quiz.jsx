import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';
import { FaSmile, FaClock, FaUtensils } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Quiz = () => {
  const { theme } = useContext(ThemeContext);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ mood: '', time: '', ingredients: '' });

  const questions = [
    {
      question: 'What’s your mood today?',
      icon: <FaSmile className="inline mr-2" />,
      options: ['Comfort Food', 'Healthy', 'Adventurous'],
      key: 'mood',
    },
    {
      question: 'How much time do you have?',
      icon: <FaClock className="inline mr-2" />,
      options: ['15 minutes', '30 minutes', '1 hour or more'],
      key: 'time',
    },
    {
      question: 'What ingredients do you have?',
      icon: <FaUtensils className="inline mr-2" />,
      options: ['Pasta/Rice', 'Vegetables', 'Meat'],
      key: 'ingredients',
    },
  ];

  const results = {
    'Comfort Food|15 minutes|Pasta/Rice': 'Creamy Garlic Pasta',
    'Comfort Food|30 minutes|Pasta/Rice': 'Mac & Cheese',
    'Comfort Food|1 hour or more|Meat': 'Slow-Cooked Beef Stew',
    'Comfort Food|30 minutes|Meat': 'Chicken Alfredo',
    'Comfort Food|15 minutes|Vegetables': 'Grilled Cheese & Tomato Soup',
    'Comfort Food|1 hour or more|Pasta/Rice': 'Baked Ziti',

    'Healthy|15 minutes|Vegetables': 'Fresh Garden Salad with Lemon Dressing',
    'Healthy|30 minutes|Vegetables': 'Grilled Veggie Buddha Bowl',
    'Healthy|1 hour or more|Vegetables': 'Stuffed Bell Peppers',
    'Healthy|30 minutes|Pasta/Rice': 'Quinoa Salad with Feta and Chickpeas',
    'Healthy|1 hour or more|Meat': 'Baked Lemon Herb Chicken',
    'Healthy|15 minutes|Pasta/Rice': 'Avocado Toast with Egg',
    'Healthy|15 minutes|Meat': 'Turkey Lettuce Wraps',

    'Adventurous|15 minutes|Meat': 'Spicy Chicken Tacos',
    'Adventurous|30 minutes|Pasta/Rice': 'Thai Peanut Noodles',
    'Adventurous|1 hour or more|Meat': 'Korean BBQ Chicken',
    'Adventurous|30 minutes|Vegetables': 'Vegetarian Sushi Rolls',
    'Adventurous|1 hour or more|Pasta/Rice': 'Homemade Lasagna',
    'Adventurous|15 minutes|Vegetables': 'Miso Soup with Tofu',
    'Adventurous|30 minutes|Meat': 'Butter Chicken with Naan',
  };

  const current = questions[step];

  const sectionStyle = {
    backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
    color: theme === 'dark' ? '#f9fafb' : '#111827',
  };

  const buttonStyle = {
    backgroundColor: '#2563eb',
    color: '#fff',
  };

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [current.key]: value });
    setStep((prev) => prev + 1);
  };

  const getResult = () => {
    const key = `${answers.mood}|${answers.time}|${answers.ingredients}`;
    return results[key] || 'Try something simple like scrambled eggs!';
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({ mood: '', time: '', ingredients: '' });
  };

  return (
    <section
      style={sectionStyle}
      className="py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-extrabold mb-10"
        >
          🍳 What Should You Cook Today?
        </motion.h1>

        {step < questions.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center justify-center">
              {current.icon}
              <span>{current.question}</span>
            </h2>
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-5">
              {current.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  style={buttonStyle}
                  className="px-6 py-3 rounded-md font-semibold text-lg sm:text-base transition duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2 ring-blue-500 min-w-[150px]"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold">🎉 You should try:</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600">
              {getResult()}
            </p>
            <button
              onClick={resetQuiz}
              style={buttonStyle}
              className="px-6 py-3 rounded-md font-semibold text-lg sm:text-base transition duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 ring-blue-500"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Quiz;
