import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      category: 'Programming & Web Basics',
      icon: '💻',
      skills: ['C', 'Java', 'HTML', 'CSS', 'JavaScript', 'React (Basics)']
    },
    {
      category: 'Development Tools',
      icon: '⚙️',
      skills: ['VS Code', 'Git', 'GitHub']
    }
  ];

  return (
    <section id="skills" className="portfolio-section">
      <div className="portfolio-section-header">
        <span className="portfolio-section-tag">TECHNICAL FOUNDATION</span>
        <h2 className="portfolio-section-title">⚡ Technical Skills</h2>
      </div>
      <div className="portfolio-skills-grid">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="portfolio-skill-group">
            <div className="portfolio-skill-header">
              <span className="portfolio-skill-icon">{cat.icon}</span>
              <h4>{cat.category}</h4>
            </div>
            <div className="portfolio-tag-cloud">
              {cat.skills.map((skill, sIdx) => (
                <span key={sIdx} className="portfolio-skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
