import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3500);
    }
  };

  return (
    <section id="contact" className="portfolio-section">
      <div className="portfolio-section-header">
        <span className="portfolio-section-tag">GET IN TOUCH</span>
        <h2 className="portfolio-section-title">📬 Contact Information</h2>
      </div>
      <div className="portfolio-contact-layout">
        <div className="portfolio-contact-cards">
          <a href="mailto:Jitdey629@gmail.com" className="portfolio-contact-card">
            <div className="portfolio-contact-icon">📧</div>
            <div>
              <div className="portfolio-contact-label">Email Address</div>
              <div className="portfolio-contact-val">jitdey629@gmail.com</div>
            </div>
          </a>

          <a href="tel:6297383891" className="portfolio-contact-card">
            <div className="portfolio-contact-icon">📱</div>
            <div>
              <div className="portfolio-contact-label">Phone Number</div>
              <div className="portfolio-contact-val">+91 62973 83891</div>
            </div>
          </a>

          <div className="portfolio-contact-card">
            <div className="portfolio-contact-icon">📍</div>
            <div>
              <div className="portfolio-contact-label">Location</div>
              <div className="portfolio-contact-val">Pursurah, Hooghly, West Bengal</div>
            </div>
          </div>

          <a href="https://github.com/biswajitdey" target="_blank" rel="noreferrer" className="portfolio-contact-card">
            <div className="portfolio-contact-icon">💻</div>
            <div>
              <div className="portfolio-contact-label">GitHub Profile</div>
              <div className="portfolio-contact-val">github.com/biswajitdey</div>
            </div>
          </a>
        </div>

        <form className="portfolio-contact-form" onSubmit={handleSubmit}>
          <div className="portfolio-form-group">
            <label htmlFor="contact-name">Your Name</label>
            <input
              id="contact-name"
              type="text"
              className="portfolio-form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="portfolio-form-group">
            <label htmlFor="contact-email">Your Email</label>
            <input
              id="contact-email"
              type="email"
              className="portfolio-form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="portfolio-form-group">
            <label htmlFor="contact-msg">Your Message</label>
            <textarea
              id="contact-msg"
              rows="4"
              placeholder="Hi Biswajit, feel free to drop a message or connect..."
              className="portfolio-form-textarea"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            ></textarea>
          </div>

          <button type="submit" className="portfolio-btn-primary" style={{ border: 'none', cursor: 'pointer' }}>
            {submitted ? '✓ Message Sent!' : 'Send Message'}
          </button>

          {submitted && (
            <p style={{ color: '#16a34a', fontSize: '0.9rem', margin: 0, fontWeight: 600 }}>
              Thank you! Your message has been received.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
