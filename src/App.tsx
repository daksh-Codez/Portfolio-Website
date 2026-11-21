import React from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Scene3D } from './components/Scene3D/Scene3D';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
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
import { TerminalPrompt } from './components/TerminalPrompt/TerminalPrompt';

export const App: React.FC = () => {
  // Initialize Lenis smooth scroll
  useSmoothScroll();

  return (
    <>
      {/* Keyboard Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Persistent Hairline Scroll Progress Bar */}
      <ScrollProgress />

      {/* Editorial Custom Precision Cursor */}
      <CustomCursor />

      {/* Signature 3D Spatial Canvas */}
      <Scene3D />

      {/* Global Minimal Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main id="main-content" role="main">
        <Hero />
        <div className="hairline-separator" />
        <About />
        <div className="hairline-separator" />
        <Skills />
        <div className="hairline-separator" />
        <Projects />
        <div className="hairline-separator" />
        <Education />
        <div className="hairline-separator" />
        <CurrentFocus />
        <div className="hairline-separator" />
        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Interactive Developer CLI Prompt */}
      <TerminalPrompt />
    </>
  );
};

export default App;
