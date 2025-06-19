import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Oops! Recipe not found</h2>
        <p className="text-gray-600 mb-6">
          Looks like the page you're looking for got burnt 🍳 or doesn't exist.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/5787/5787086.png"
          alt="Food Not Found"
          className="mx-auto w-48 h-48 mb-6"
        />
        <Link to="/" className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
