import React from 'react';

const Education = () => {
  const educations = [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Techno India University',
      year: '2023 - 2027'
    },
    {
      degree: 'Higher Secondary (Class XII) - Arts',
      institution: 'Tarakeswar Mahavidyalaya',
      year: '2021 - 2023'
    },
    {
      degree: 'Secondary School (Class X)',
      institution: 'Pursurah High School',
      year: '2015 - 2021'
    }
  ];

  return (
    <section id="education" className="portfolio-section">
      <div className="portfolio-section-header">
        <span className="portfolio-section-tag">ACADEMIC JOURNEY</span>
        <h2 className="portfolio-section-title">🎓 Education</h2>
      </div>
      <div className="portfolio-timeline">
        {educations.map((item, index) => (
          <div key={index} className="portfolio-timeline-item">
            <div className="portfolio-timeline-dot"></div>
            <div className="portfolio-timeline-card">
              <div className="portfolio-timeline-header">
                <div>
                  <h3 className="portfolio-timeline-degree">{item.degree}</h3>
                  <div className="portfolio-timeline-inst">{item.institution}</div>
                </div>
                <div className="portfolio-timeline-badges">
                  <span className="portfolio-year-badge">📅 {item.year}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
