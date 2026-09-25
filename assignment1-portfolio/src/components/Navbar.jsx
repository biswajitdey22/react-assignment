import React from 'react';

const Navbar = () => {
  return (
    <nav className="portfolio-navbar">
      <div className="portfolio-nav-brand">
        <span className="portfolio-brand-symbol">⚡</span> Biswajit Dey
      </div>
      <ul className="portfolio-nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#education">Education</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#interests">Interests</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
