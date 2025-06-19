import React, { useContext } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeProvider';

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={`py-10 shadow-inner
        ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}
      `}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        
        {/* Left: Brand Info */}
        <div className="text-center md:text-left flex-1">
          <h1
            className={`text-2xl font-bold
              ${theme === 'dark' ? 'text-white' : 'text-[var(--primary-color)]'}
            `}
          >
            ReciPixie
          </h1>
          <p className="text-sm mt-1">
            &copy; {new Date().getFullYear()} ReciPixie. All rights reserved.
          </p>
        </div>

        {/* Center: Contact Info */}
        <div className="text-center flex-1 space-y-1 md:space-y-2">
          <p>
            Contact us:{' '}
            <a
              href="mailto:contact@recipebook.com"
              className={`ml-1 underline ${
                theme === 'dark' ? 'text-[var(--primary-color)]' : 'text-[var(--primary-color)]'
              }`}
            >
              contact@recipebook.com
            </a>
          </p>
          <p>
            Phone:{' '}
            <a
              href="tel:+1234567890"
              className={`ml-1 underline ${
                theme === 'dark' ? 'text-[var(--primary-color)]' : 'text-[var(--primary-color)]'
              }`}
            >
              +1 234 567 890
            </a>
          </p>
        </div>

        {/* Right: Social Media */}
        <div className="flex gap-4 flex-1 justify-center md:justify-end">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="bg-[#3b5998] text-white p-2 rounded-full hover:scale-110 transition transform"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="bg-[#1DA1F2] text-white p-2 rounded-full hover:scale-110 transition transform"
          >
            <FaTwitter size={18} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white p-2 rounded-full hover:scale-110 transition transform"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="bg-[#0077B5] text-white p-2 rounded-full hover:scale-110 transition transform"
          >
            <FaLinkedinIn size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
