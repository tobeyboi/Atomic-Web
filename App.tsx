import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { TheMechanism } from './components/TheMechanism';
import { Footer } from './components/Footer';

function App() {
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