import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Actualizar el año actual cada vez que cambia
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 60000); // Actualizar cada minuto para tener en cuenta el cambio de año
    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  const handleSoshizaClick = () => {
    window.open('https://soshiza.com', '_blank');
  };

  return (
    <footer className="bg-gray-800 text-white py-4 px-6">
      <div className="text-center">Bazar Al Sol
        &copy; {currentYear} Desarrollado por 
        <a 
          href="https://soshiza.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={handleSoshizaClick} 
          className="text-blue-500 hover:text-blue-400 ml-1"
        >
          Soshiza
        </a>
      </div>
    </footer>
  );
};

export default Footer;