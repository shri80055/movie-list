import React, { useState } from 'react';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="#">MovieHub</a>
      </div>
      <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
        <li><a href="#">Home</a></li>
        <li><a href="#">Movies</a></li>
        <li><a href="#">Genres</a></li>
        <li><a href="#">Top Rated</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
