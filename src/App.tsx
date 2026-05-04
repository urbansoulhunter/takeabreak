import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

const Background3D = lazy(() => import('./components/Background3D'));
const VisualEffects = lazy(() => import('./components/VisualEffects'));
const Home = lazy(() => import('./pages/Home'));
const Events = lazy(() => import('./pages/Events'));
const Lineup = lazy(() => import('./pages/Lineup'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Terms = lazy(() => import('./pages/Terms'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const JoinTeam = lazy(() => import('./pages/JoinTeam'));

function RouteFallback() {
  return (
    <div
      className="min-h-screen bg-[#1a1a1a] flex items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <div className="w-12 h-12 border-4 border-[#00f0ff]/30 border-t-[#00f0ff] rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen relative">
          <Suspense fallback={null}>
            <Background3D />
            <VisualEffects />
          </Suspense>
          <Navigation />
          <div className="relative z-10">
            <Suspense fallback={<RouteFallback />}>
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
            </Suspense>
            <Footer />
          </div>
          <CookieConsent />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
