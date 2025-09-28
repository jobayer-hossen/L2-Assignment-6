import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const ErrorPage: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const glowVariants: Variants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear" as const,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear" as const,
          }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number */}
        <motion.div
          className="relative"
          variants={floatingVariants}
          animate="animate"
        >
          <motion.h1
            className="text-9xl md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 select-none"
            variants={itemVariants}
          >
            404
          </motion.h1>

          {/* Glow effect behind 404 */}
          <motion.div
            className="absolute inset-0 text-9xl md:text-[200px] font-bold text-purple-500 blur-3xl opacity-50 -z-10"
            variants={glowVariants}
            animate="animate"
          >
            404
          </motion.div>
        </motion.div>

        {/* Error message */}
        <motion.div variants={itemVariants} className="mt-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-md mx-auto">
            The page you're looking for seems to have vanished into the digital
            void.
          </p>
        </motion.div>

        {/* Animated icon */}
        {/* <motion.div variants={itemVariants} className="mt-8">
          <motion.div
            className="inline-block"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
          >
            <svg
              className="w-24 h-24 mx-auto text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>
        </motion.div> */}

        <div className="w-full justify-items-center py-8">
          <Link
            to="/"
            className="text-2xl flex items-center gap-3 font-bold text-primary dark:text-primary-light hover:text-primary/90 transition group relative"
          >
            <motion.div
              className="relative"
              animate={{
                x: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.img
                src="https://cdn-icons-png.freepik.com/512/10028/10028767.png?ga=GA1.1.1697682617.1758554927"
                alt="logo"
                className="w-[40px]"
                animate={{
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.15,
                  transition: { duration: 0.2 },
                }}
              />
            </motion.div>
            <span className=" transition-all duration-300">LoopRide</span>
          </Link>
        </div>

        {/* Action buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-primary/75 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go Home
            </Link>
          </motion.div>
        </motion.div>

        {/* Fun fact */}
        <motion.p
          variants={itemVariants}
          className="mt-12 text-sm text-gray-400"
        >
          Fun fact: 404 is the HTTP status code for "Not Found"
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
