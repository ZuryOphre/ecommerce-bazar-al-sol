"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import "@/app/globals.css";

const SlideInfo = () => {
  return (
    <div className="flex justify-center mt-4">
      <motion.div
        className="w-64 h-60 bg-white rounded-lg shadow-md p-2 m-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ x: 0, opacity: 3 }}
        initial={{ x: 200, opacity: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="mb-4 flex justify-center items-center">
          <Image
            src="/tienda-retiro.webp"
            alt="Image 1"
            width={80}
            height={45} // Ajusta este valor según la relación de aspecto de tu imagen
            strategy="constrained"
          />
        </div>
        <h2 className="text-black text-xl font-bold">Retiro en Local</h2>
        <p className="text-gray-500">
          Puedes comprar por aca y retirar en el local verificando que tenemos
          nuestros productos en stock
        </p>
      </motion.div>

      <motion.div
        className="w-64 h-60 bg-white rounded-lg shadow-md p-2 m-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ x: 0, opacity: 3 }}
        initial={{ x: 200, opacity: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="mb-4 flex justify-center items-center">
          <Image
            src="/productos-naturales.webp"
            alt="Image 1"
            width={80}
            height={60}
          />
        </div>
        <h2 className="text-black text-xl font-bold">Productos Naturales</h2>
        <p className="text-gray-500">
          trabajamos con una gran variedad de productos naturales
        </p>
      </motion.div>

      <motion.div
        className="w-64 h-60 bg-white rounded-lg shadow-md p-2 m-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ x: 0, opacity: 3 }}
        initial={{ x: 200, opacity: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="mb-4 flex justify-center items-center">
          <Image
            src="/variedad-productos.webp"
            alt="Image 1"
            width={80}
            height={60}
          />
        </div>
        <h2 className="text-black text-xl font-bold">Variedad en Productos</h2>
        <p className="text-gray-500">
          contamos con una gran variedad de productos, muchas cosas de las que
          buscas, aca podras encontrar
        </p>
      </motion.div>
    </div>
  );
};

export default SlideInfo;
