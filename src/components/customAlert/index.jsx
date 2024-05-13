import React from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const CustomAlert = ({ message, onClose }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg p-4 max-w-md relative mt-20 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
      >
        <button className="absolute top-2 right-2" onClick={onClose}>
          <FiX />
        </button>
        <p className="text-gray-800 text-xl font-bold mb-2">{message}</p>
      </motion.div>
    </motion.div>
  );
};

export default CustomAlert;
