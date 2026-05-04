import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import VisualEffects from './components/VisualEffects';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import Events from './pages/Events';
import Lineup from './pages/Lineup';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import TermsAndConditions from './pages/TermsAndConditions';
import JoinTeam from './pages/JoinTeam';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen relative">
          <Background3D />
          <VisualEffects />
          <Navigation />
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/lineup" element={<Lineup />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/join-team" element={<JoinTeam />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            </Routes>
            <Footer />
          </div>
          <CookieConsent />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
