"use client";

// components/Slideshow.js
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = [
  "/banner.png",
  "/banner.png",
  "/banner.png",
  "/banner.png",
  "/banner.png",
];

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    handleResize(); // Obtener la altura del encabezado al cargar la página
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 6000); // Cambia de imagen cada 3 segundos

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative overflow-hidden flex justify-center items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ height: "315px" }} // Establece una altura para el contenedor
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0 flex justify-center items-center"
          initial={{ opacity: 0, x: "100%" }} // Empieza desde la derecha
          animate={{ opacity: 1, x: 0 }} // Se mueve hacia la izquierda
          exit={{ opacity: 0, x: "-100%" }} // Sale hacia la izquierda
          transition={{ duration: 1.3 }} // Duración de la transición
          style={{ marginTop: `-${headerHeight}px` }} // Aplica el margen superior negativo
        >
          <div className="mx-auto">
            <Image
              src={images[index]}
              alt={`Image ${index}`}
              width={1310} // Ancho original de la imagen
              height={315} // Alto original de la imagen
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Slideshow;
