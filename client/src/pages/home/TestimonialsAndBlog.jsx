import React, { useContext } from 'react';
import { ThemeContext } from '../.././context/ThemeProvider'; // adjust path if needed
import { FaQuoteLeft, FaBookOpen } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';

const testimonials = [
  {
    id: 1,
    name: 'Emma Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: "This recipe site changed the way I cook! Easy to follow and delicious results every time.",
  },
  {
    id: 2,
    name: 'Mark Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    quote: "I love the community and how I can find recipes that fit my dietary needs perfectly.",
  },
  {
    id: 3,
    name: 'Sophia Lee',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    quote: "The cooking tips and hacks section saved me so much time in the kitchen!",
  },
];

const blogPosts = [
  {
    id: 1,
    title: '5 Tips to Make Your Pasta Perfect Every Time',
    excerpt: 'Learn how to cook pasta like a pro with these simple, effective tips...',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80',
    date: 'May 20, 2025',
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Baking Bread at Home',
    excerpt: 'Baking bread can seem intimidating, but with this guide, you’ll be a bread master...',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    date: 'May 15, 2025',
  },
  {
    id: 3,
    title: 'Healthy Ingredient Swaps for Everyday Cooking',
    excerpt: 'Discover simple swaps to make your favorite meals healthier without sacrificing flavor.',
    image: 'https://images.unsplash.com/photo-1600289031464-74d374b64991?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVhbHxlbnwwfHwwfHx8MA%3D%3D',
    date: 'May 10, 2025',
  },
];

const TestimonialsAndBlog = () => {
  const { theme } = useContext(ThemeContext);

  // Conditional styles for light/dark mode
  const styles = {
    sectionBg: theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900',
    cardBg: theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300',
    textPrimary: theme === 'dark' ? 'text-gray-100' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-300' : 'text-gray-700',
    btnBg: theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white',
    btnFocusRing: theme === 'dark' ? 'focus:ring-blue-400' : 'focus:ring-blue-500',
    avatarBorder: theme === 'dark' ? 'border-blue-400' : 'border-blue-500',
    headingColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
  };

  return (
    <section
      className={`max-w-7xl mx-auto px-6 py-16 space-y-24 transition-colors duration-300 ${styles.sectionBg}`}
    >
      {/* User Testimonials */}
      <div>
        <Fade triggerOnce>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-10 flex items-center justify-center gap-3 tracking-tight ${styles.headingColor}`}
          >
            <FaQuoteLeft size={30} />
            What Our Users Say
          </h2>
        </Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map(({ id, name, avatar, quote }) => (
            <Fade key={id} cascade damping={0.2} triggerOnce>
              <div
                className={`border shadow-md rounded-xl p-6 flex flex-col items-center text-center
                transition-transform hover:scale-[1.03] hover:shadow-lg
                ${styles.cardBg} border-solid`}
              >
                <img
                  src={avatar}
                  alt={name}
                  className={`w-20 h-20 rounded-full mb-5 object-cover shadow-sm border-2 ${styles.avatarBorder}`}
                  loading="lazy"
                />
                <p className={`italic mb-5 text-base sm:text-lg leading-relaxed ${styles.textSecondary}`}>
                  “{quote}”
                </p>
                <h3 className={`font-semibold text-lg sm:text-xl ${styles.textPrimary}`}>{name}</h3>
              </div>
            </Fade>
          ))}
        </div>
      </div>

      {/* Blog / Tips Section */}
      <div>
        <Fade triggerOnce>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-10 flex items-center justify-center gap-3 tracking-tight ${styles.headingColor}`}
          >
            <FaBookOpen size={30} />
            Cooking Tips & Blog
          </h2>
        </Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogPosts.map(({ id, title, excerpt, image, date }) => (
            <Fade key={id} cascade damping={0.2} triggerOnce>
              <article
                className={`border rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer
                flex flex-col bg-opacity-90
                ${styles.cardBg} border-solid`}
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-48 sm:h-56 md:h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3
                    className={`font-bold text-lg sm:text-xl mb-3 line-clamp-2 ${styles.textPrimary} tracking-wide`}
                    title={title}
                  >
                    {title}
                  </h3>
                  <p
                    className={`mb-4 line-clamp-3 text-base sm:text-lg leading-relaxed ${styles.textSecondary}`}
                  >
                    {excerpt}
                  </p>
                  <time
                    className={`text-sm sm:text-base mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    {date}
                  </time>
                  <button
                    className={`mt-auto inline-block font-semibold px-5 py-3 rounded-lg transition
                      ${styles.btnBg} focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.btnFocusRing} 
                      shadow-md hover:shadow-lg`}
                    aria-label={`Read more about ${title}`}
                    type="button"
                  >
                    Read More
                  </button>
                </div>
              </article>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndBlog;
