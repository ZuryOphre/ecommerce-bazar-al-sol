'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const { scrollY } = useScroll();
  const [showBackground, setShowBackground] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      if (y > 0) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    });

    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMenu);

    return () => {
      unsubscribe();
      unsubscribeAuth();
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [scrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.header
      className={`header bg-verde-esperanza text-white py-4 fixed top-0 z-10 w-full ${
        showBackground ? "bg-opacity-100" : "bg-opacity-0"
      }`}
      style={{ backdropFilter: showBackground ? "blur(10px)" : "none" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center mx-auto w-full">
        <div className="flex items-center ml-10">
          {/* Logo */}
          <motion.img
            src="/sol.webp"
            alt="Logo"
            className="h-10 mr-4"
            whileHover={{ scale: 1.1 }}
          />
          {/* Nombre de la empresa */}
          <h1 className="text-xl font-bold hidden md:block">Bazar al Sol</h1>
        </div>
        <nav className="md:flex md:items-center mr-10">
          <ul className="flex items-center space-x-6">
            {/* Secciones visibles en dispositivos de escritorio */}
            <NavItem href="/about" hiddenMobile>
              Acerca de
            </NavItem>
            <NavItem href="/products" hiddenMobile>
              Productos
            </NavItem>
            {user && (
              <NavItem href="/profile" hiddenMobile>
                Perfil
              </NavItem>
            )}
            {user ? (
              <motion.li whileHover={{ scale: 1.1 }} className="py-2 hidden md:block">
                <button className="hover:text-gray-300" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </motion.li>
            ) : (
              <NavItem href="/login" hiddenMobile>
                Login
              </NavItem>
            )}
          </ul>
        </nav>
        {/* Contenedor para el icono de menú */}
        <div className="md:hidden flex justify-end w-full">
          <div className="mr-3" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* Menú desplegable para dispositivos móviles */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 right-0 h-screen w-64 bg-gray-900 text-white flex flex-col justify-center items-center"
          style={{ transform: isMenuOpen ? "translateX(0)" : "translateX(100%)" }}
        >
          <NavItem href="/about">Acerca de</NavItem>
          <NavItem href="/products">Productos</NavItem>
          {user && (
            <NavItem href="/profile">Perfil</NavItem>
          )}
          {user && (
            <motion.li whileHover={{ scale: 1.1 }} className="py-2">
              <button className="hover:text-gray-300" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </motion.li>
          )}
          <button className="text-white" onClick={toggleMenu}>
            Cerrar
          </button>
        </div>
      )}
    </motion.header>
  );
};

// Componente para los elementos de navegación
const NavItem = ({ href, children, hiddenMobile, extraClasses }) => {
  return (
    <motion.li whileHover={{ scale: 1.1 }} className={`py-2 ${hiddenMobile ? "hidden md:block" : ""} ${extraClasses}`}>
      <a href={href} className="hover:text-gray-300">
        {children}
      </a>
    </motion.li>
  );
};

export default Header;
