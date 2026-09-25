import React from 'react';

const Interests = () => {
  return (
    <section id="interests" className="portfolio-section">
      <div className="portfolio-section-header">
        <span className="portfolio-section-tag">PASSIONS & HOBBIES</span>
        <h2 className="portfolio-section-title">⚽ Interests</h2>
      </div>
      <div className="portfolio-interest-simple-card">
        <div className="portfolio-interest-icon">⚽</div>
        <div className="portfolio-interest-content">
          <h3 className="portfolio-interest-title">Playing Football</h3>
          <p className="portfolio-interest-desc">
            I love playing football with friends whenever I get free time. Being on the field keeps me active, fit, and refreshed outside of my studies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Interests;
