import React from "react";
import { motion } from "framer-motion";
import { FaClock, FaShieldAlt, FaUserFriends } from "react-icons/fa";

const About = () => {
  return (
    <div className="container mx-auto px-6 py-12 space-y-16">
      {/* --- Header Section --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          About <span className="text-sky-500">Prescripto</span>
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Welcome to <span className="font-semibold text-sky-600">Prescripto</span>, your trusted partner in managing healthcare 
          efficiently. We make it easy to book appointments, manage medical records, 
          and stay connected with healthcare providers — all from one place.
        </p>
      </motion.div>

      {/* --- Image + Vision Section --- */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="md:w-1/2 rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?w=800&auto=format&fit=crop&q=60"
            alt="About Prescripto"
            className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="md:w-1/2 space-y-5"
        >
          <h2 className="text-3xl font-semibold text-gray-800">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to make healthcare accessible and stress-free for everyone. 
            By bridging the gap between patients and healthcare providers, we aim to empower 
            individuals with control over their health journey — from consultation to care.
          </p>
        </motion.div>
      </div>

      {/* --- Why Choose Us Section --- */}
      <div className="text-center space-y-10">
        <h2 className="text-3xl font-semibold text-gray-800">Why Choose Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* --- Efficiency --- */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-gradient-to-br from-sky-50 to-white rounded-2xl shadow-lg p-8 text-center space-y-4 hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-5xl text-sky-500 flex justify-center">
              <FaClock />
            </div>
            <p className="font-semibold text-xl text-gray-800">Efficiency</p>
            <p className="text-gray-600">
              Streamlined appointment scheduling that fits seamlessly into your busy lifestyle.
            </p>
          </motion.div>

          {/* --- Reliability --- */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-gradient-to-br from-sky-50 to-white rounded-2xl shadow-lg p-8 text-center space-y-4 hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-5xl text-sky-500 flex justify-center">
              <FaShieldAlt />
            </div>
            <p className="font-semibold text-xl text-gray-800">Reliability</p>
            <p className="text-gray-600">
              Trusted healthcare partners delivering consistent quality you can count on.
            </p>
          </motion.div>

          {/* --- User-Friendly --- */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-gradient-to-br from-sky-50 to-white rounded-2xl shadow-lg p-8 text-center space-y-4 hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-5xl text-sky-500 flex justify-center">
              <FaUserFriends />
            </div>
            <p className="font-semibold text-xl text-gray-800">User-Friendly</p>
            <p className="text-gray-600">
              An intuitive, accessible platform designed for everyone — no tech skills needed.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
