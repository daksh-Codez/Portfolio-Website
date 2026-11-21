import React from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Scene3D } from './components/Scene3D/Scene3D';
import { ScrollProgress } from './components/ScrollProgress/ScrollProgress';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { Projects } from './components/Projects/Projects';
import { Education } from './components/Education/Education';
import { CurrentFocus } from './components/CurrentFocus/CurrentFocus';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  // Lenis smooth inertial scrolling
  useSmoothScroll();

  return (
    <>
      {/* Keyboard Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Hairline Scroll Progress */}
      <ScrollProgress />

      {/* Architectural Kinetic 3D Installation */}
      <Scene3D />

      {/* Publication Navigation */}
      <Navbar />

      {/* Editorial Content Landmark */}
      <main id="main-content" role="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <CurrentFocus />
        <Contact />
      </main>

      {/* Colophon & Footer */}
      <Footer />
    </>
  );
};

export default App;
