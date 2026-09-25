import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import Skills from './components/Skills';
import Interests from './components/Interests';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="portfolio-container" id="top">
      <Navbar />
      <Header />
      <main className="portfolio-main">
        <AboutMe />
        <Education />
        <Skills />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
