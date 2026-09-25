import React from 'react';

const Header = () => {
  return (
    <header className="portfolio-header">
      <div className="portfolio-hero-glow"></div>
      <div className="portfolio-hero-container">
        <span className="portfolio-hero-badge">
          <span className="portfolio-pulse-dot"></span>
          BCA 4th Year • Techno India University
        </span>
        <h1 className="portfolio-hero-title">Biswajit Dey</h1>
        <p className="portfolio-hero-subtitle">
          Aspiring Software Developer & 4th Year BCA Student at Techno India University, focused on learning modern web technologies and building a strong foundation in computer applications.
        </p>
        <div className="portfolio-cta-group">
          <a href="#about" className="portfolio-btn-primary">Learn About Me</a>
          <a href="#skills" className="portfolio-btn-secondary">Explore Skills</a>
          <a href="#contact" className="portfolio-btn-accent">Get In Touch</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
