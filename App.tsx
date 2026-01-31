import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { TheMechanism } from './components/TheMechanism';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'privacy') {
        setCurrentPage('privacy');
        window.scrollTo(0, 0);
      } else if (hash === '' || hash.startsWith('concept') || hash.startsWith('features') || hash.startsWith('demo')) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'privacy') {
    return <PrivacyPolicy />;
  }

  return (
    <main className="min-h-screen bg-offWhite selection:bg-sage/40 selection:text-charcoal">
      <Navigation />
      <Hero />
      <Features />
      <TheMechanism />
      <Footer />
    </main>
  );
}

export default App;