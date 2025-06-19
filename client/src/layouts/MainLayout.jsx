import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from '../context/ThemeProvider';

const MainLayout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen flex flex-col`}>
      {/* React Toastify Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} theme={theme} />

      <Navbar />

      <main className="flex-grow ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
