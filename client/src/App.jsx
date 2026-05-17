import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';
import SpiderWebIntro from './components/SpiderWebIntro';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <ThemeProvider>
      {/* Spider-Man web intro animation */}
      {!introComplete && <SpiderWebIntro onComplete={() => setIntroComplete(true)} />}

      {/* Main content - renders after intro */}
      {introComplete && (
        <>
          <ParticleBackground />
          <Navbar />
          <main className="relative z-10">
            <HeroSection />
            <div className="web-divider" />
            <AboutSection />
            <div className="web-divider" />
            <SkillsSection />
            <div className="web-divider" />
            <ProjectsSection />
            <div className="web-divider" />
            <AchievementsSection />
            <div className="web-divider" />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        toastStyle={{
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
        }}
      />
    </ThemeProvider>
  );
}

export default App;
