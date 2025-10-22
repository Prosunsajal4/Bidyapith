// ErrorComponent.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white rounded-2xl shadow-2xl p-12 max-w-md text-center animate-fadeIn">
        {/* Big 404 */}
        <h1 className="text-8xl font-extrabold text-red-500 mb-4 animate-pulse">404</h1>
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-2">Oops! Page Not Found</h2>
        {/* Description */}
        <p className="text-gray-300 mb-6">
          Sorry, the page you are looking for does not exist. It might have been moved or deleted.
        </p>
        {/* Go Home Button */}
        <Link
          to="/"
          className="btn bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition-transform transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorComponent;
