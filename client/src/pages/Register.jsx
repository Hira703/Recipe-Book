import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import registerImg from '../assets/images/signupimage.jpg';

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [photoURL, setPhotoURL] = useState('');

  const validatePassword = (password) => {
    const lengthValid = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    return lengthValid && hasUppercase && hasLowercase;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters and contain both uppercase and lowercase letters.');
      return;
    }

    try {
      await createUser(email, password);
      toast.success('Registration successful!');

      const userProfile = { email, name, phone, address, photo };
      const res = await fetch('https://recipe-book-server-silk.vercel.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfile),
      });

      if (!res.ok) throw new Error('Failed to save user profile');

      navigate(from, { replace: true });
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please login.');
        toast.error('Email already in use');
      } else {
        setError(err.message);
        toast.error('Registration failed');
      }
    }
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success('Google login successful!');
        navigate(from, { replace: true });
      })
      .catch(err => {
        setError(err.message);
        toast.error('Google login failed');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 my-10">

        {/* Left Image */}
        <div className="hidden md:flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <img src={registerImg} alt="Signup" className="w-full h-full object-cover" />
        </div>

        {/* Right Form */}
        <div className="flex flex-col justify-center items-center px-6 py-12">
          <form onSubmit={handleRegister} className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-center">Register</h2>

            <div>
              <label className="block mb-1">Full Name</label>
              <input type="text" name="name" required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600" />
            </div>

            <div>
              <label className="block mb-1">Phone Number</label>
              <input type="tel" name="phone" required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600" />
            </div>

            <div>
              <label className="block mb-1">Address</label>
              <input type="text" name="address" required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600" />
            </div>

            <div>
              <label className="block mb-1">Photo URL</label>
              <input type="url" name="photo" required onChange={(e) => setPhotoURL(e.target.value)} className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600" />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input type="email" name="email" required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600" />
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  className="w-full p-2 pr-10 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
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

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition">
              Register
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 py-2 bg-white dark:bg-gray-100 text-gray-800 border border-gray-300 rounded hover:shadow-md transition"
            >
              <FcGoogle className="text-2xl" />
              <span className="font-medium">Continue with Google</span>
            </button>

            <p className="text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
