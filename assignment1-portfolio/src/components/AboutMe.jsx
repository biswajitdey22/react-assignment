import React from 'react';

const AboutMe = () => {
  return (
    <section id="about" className="portfolio-section">
      <div className="portfolio-section-header">
        <span className="portfolio-section-tag">INTRODUCTION</span>
        <h2 className="portfolio-section-title">👤 About Me</h2>
      </div>
      <div className="portfolio-about-content">
        <div className="portfolio-about-text">
          <p className="portfolio-about-lead">
            Hello! I am <strong>Biswajit Dey</strong>, an undergraduate student currently in my <strong>4th year of BCA at Techno India University (2023–2027)</strong>.
          </p>
          <p>
            I am passionate about computer science and actively learning modern web development technologies like React, JavaScript, and responsive UI design. As an aspiring developer, I am committed to building a solid foundation in core computer applications and programming principles.
          </p>
          <p>
            Outside of academics, I love playing <strong>football</strong> in my free time to stay active and refreshed.
          </p>
          <div className="portfolio-about-stats">
            <div className="portfolio-stat-box">
              <div className="portfolio-stat-icon">🎓</div>
              <div className="portfolio-stat-num">4th</div>
              <div className="portfolio-stat-label">Year of BCA</div>
            </div>
            <div className="portfolio-stat-box">
              <div className="portfolio-stat-icon">🏛️</div>
              <div className="portfolio-stat-num">TIU</div>
              <div className="portfolio-stat-label">Techno India University</div>
            </div>
            <div className="portfolio-stat-box">
              <div className="portfolio-stat-icon">📅</div>
              <div className="portfolio-stat-num">2023-27</div>
              <div className="portfolio-stat-label">Academic Batch</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
