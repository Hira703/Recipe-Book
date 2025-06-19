import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { motion } from 'framer-motion';
import loginImg from '../assets/images/loginImage.jpg';

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from?.pathname || '/';
  console.log(from)

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success('Login successful!');
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
        toast.error('Login failed');
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success('Google login successful!');
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
        toast.error('Google login failed');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        
        {/* Left: Image */}
        <div className="hidden md:flex items-center justify-center bg-gray-100 dark:bg-gray-700">
          <img
            src={loginImg}
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Form */}
        <div className="flex flex-col justify-center items-center px-6 py-12">
          <motion.form
            onSubmit={handleLogin}
            className="w-full max-w-md space-y-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-3xl font-bold text-center mb-4">Login</h2>

            {/* Email */}
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2.5 text-xl text-gray-500 dark:text-gray-300"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm">
              <Link to="/forgot-password" className="text-blue-600 dark:text-blue-400 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow-md transition"
            >
              Login
            </button>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 py-2 bg-white dark:bg-gray-100 text-gray-800 border border-gray-300 rounded hover:shadow-md transition"
            >
              <FcGoogle className="text-2xl" />
              <span className="font-medium">Continue with Google</span>
            </button>

            {/* Link to Register */}
            <p className="text-center text-sm">
              Don’t have an account?{' '}
              <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
                Register here
              </Link>
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Login;
