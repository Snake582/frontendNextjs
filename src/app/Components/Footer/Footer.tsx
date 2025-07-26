import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-1">
      
      <div className="text-center py-6 border-t border-gray-700">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Shop Time. Tous droits réservés.
        </p>
        <p className="text-xs mt-2">
          Conçu avec ❤️ par <span className="font-semibold">Guelewar Dév</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
