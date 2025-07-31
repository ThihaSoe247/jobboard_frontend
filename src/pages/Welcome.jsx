import React from "react";
import { Link } from "react-router-dom";
import jobImage from "../assets/job.jpg"; // Make sure this is correct
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center px-6 py-10">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="md:w-1/2">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight"
          >
            Welcome to <span className="text-blue-600">Job Board</span>
          </motion.h1>

          <motion.p
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-600 mt-4 text-lg"
          >
            Our mission is to connect talent with opportunity. Whether you're
            looking for your dream job or the perfect candidate, Job Board is
            your gateway.
          </motion.p>

          {/* Stats + Button */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 flex items-center gap-5 flex-wrap"
          >
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <span className="text-gray-500 text-sm">
              20k+ daily active users
            </span>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="md:w-1/2"
        >
          <img
            src={jobImage}
            alt="Job search"
            className="rounded-xl shadow-lg max-h-[400px] w-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}
