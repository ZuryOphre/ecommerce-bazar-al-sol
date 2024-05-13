import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SocialButtons = () => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center ml-6 z-40 my-10">
        <SocialButton
          href="#"
          icon="/facebook.png"
          label="Facebook"
        />
        <SocialButton
          href="#"
          icon="/instagram.png"
          label="Instagram"
        />
        <SocialButton
          href="https://wa.me/56997117064"
          icon="/whatsapp.png"
          label="WhatsApp"
        />
      </div>
    </div>
  );
};

const SocialButton = ({ href, icon, label }) => {
  return (
    <Link legacyBehavior href={href}>
      <a
        target="_blank"
        className="flex items-center justify-center h-10 w-10 rounded-full bg-white mx-3 hover:scale-110 transition-transform duration-300 relative"
        aria-label={`Enlace a ${label}`}
      >
        <Image src={icon} alt={label} width={40} height={40} />
        <span
          className="absolute bg-gray-800 text-white px-2 py-1 rounded-md text-xs bottom-full left-1/2 transform -translate-x-1/2 opacity-0 pointer-events-none transition-opacity duration-300"
        >
          {label}
        </span>
      </a>
    </Link>
  );
};

export default SocialButtons;
