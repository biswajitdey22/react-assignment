import React from 'react';

const Footer = () => {
  return (
    <footer className="portfolio-footer">
      <div className="portfolio-footer-links">
        <a href="#about">About</a>
        <a href="#education">Education</a>
        <a href="#skills">Skills</a>
        <a href="#interests">Interests</a>
        <a href="#contact">Contact</a>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to Top ↑</a>
      </div>
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} Biswajit Dey. Built with React & Pure JSX (Assignment 1).
      </p>
    </footer>
  );
};

export default Footer;
