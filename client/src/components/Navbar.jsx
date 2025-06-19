import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { ThemeContext } from '../context/ThemeProvider'; // Import ThemeContext
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from '../components/ThemeToggle';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  console.log("rendered")
  const { user, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Get current theme
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setImgError(false);
  }, [user?.photoURL]);

  const handleLogout = () => {
    logout().then(() => {
      setDropdownOpen(false);
      setMobileMenuOpen(false);
      navigate('/login');
    });
  };

  // Define link styles based on theme
  const activeLink =
    theme === 'dark'
      ? 'text-blue-400 border-b-2 border-blue-400 pb-1'
      : 'text-blue-600 border-b-2 border-blue-600 pb-1';

  const defaultLink =
    theme === 'dark'
      ? 'text-white hover:text-blue-400 transition'
      : 'text-gray-900 hover:text-blue-600 transition';

  return (
    <nav
      className={`${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } px-6 py-4 shadow-md sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className={`w-12 h-12 rounded-full object-cover border-2 ${
              theme === 'dark'
                ? 'border-gray-700 hover:border-blue-400'
                : 'border-gray-300 hover:border-blue-600'
            } transition`}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center text-sm">{(
          <>
            <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
              Home
            </NavLink>
            <NavLink to="/all-recipes" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
              All Recipes
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
              About
            </NavLink>
            {user && (
              <>
                <NavLink to="/add-recipes" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
                  Add Recipe
                </NavLink>
                <NavLink to="/my-recipes" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
                  My Recipes
                </NavLink>
                <NavLink to="/my-profile" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
                  My Profile
                </NavLink>
              </>
            )}
          </>
        )}</div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-2xl">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Auth Buttons or Profile */}
          <div className="relative" ref={dropdownRef}>
            {!user ? (
              <div className="hidden md:flex space-x-3">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded transition ${
                    theme === 'dark'
                      ? 'bg-blue-400 text-gray-900 hover:bg-blue-500'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded transition ${
                    theme === 'dark'
                      ? 'bg-green-400 text-gray-900 hover:bg-green-500'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div>
                {user.photoURL && !imgError ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className={`w-10 h-10 rounded-full border-2 cursor-pointer ${
                      theme === 'dark' ? 'border-blue-400' : 'border-blue-600'
                    }`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    onError={() => setImgError(true)}
                    title={user.displayName || user.email}
                  />
                ) : (
                  <FaUserCircle
                    size={40}
                    className={`cursor-pointer ${
                      theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'
                    }`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    title={user.displayName || user.email}
                  />
                )}
                {dropdownOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded shadow-lg py-2 text-sm z-50 ${
                      theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                    }`}
                  >
                    <p className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 truncate">
                      {user.displayName || user.email}
                    </p>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 transition ${
                        theme === 'dark'
                          ? 'text-red-400 hover:bg-red-900'
                          : 'text-red-600 hover:bg-red-100'
                      }`}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden mt-4 flex flex-col gap-4 text-sm px-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
            Home
          </NavLink>
          <NavLink to="/all-recipes" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
            All Recipes
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
            About
          </NavLink>
          {user && (
            <>
              <NavLink to="/add-recipes" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
                Add Recipe
              </NavLink>
              <NavLink to="/my-recipes" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
                My Recipes
              </NavLink>
              <NavLink to="/my-profile" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
                My Profile
              </NavLink>
            </>
          )}
          {!user && (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/login"
                className={`px-4 py-2 rounded text-center transition ${
                  theme === 'dark'
                    ? 'bg-blue-400 text-gray-900 hover:bg-blue-500'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`px-4 py-2 rounded text-center transition ${
                  theme === 'dark'
                    ? 'bg-green-400 text-gray-900 hover:bg-green-500'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
