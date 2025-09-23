import { Link } from "react-router";
import { motion } from "framer-motion";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4 sm:px-6 lg:px-8"
      >
        {/* Illustration */}
        <img
          src="https://undraw.co/api/illustrations/404.svg"
          alt="Page not found"
          className="mx-auto mb-8 w-64 sm:w-96"
        />

        {/* Error Code */}
        <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-800 mb-4">
          404
        </h1>

        {/* Error Message */}
        <p className="text-xl sm:text-2xl text-gray-600 mb-8">
          Oops! The page you are looking for doesn’t exist.
        </p>

        {/* Return Home Button */}
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
