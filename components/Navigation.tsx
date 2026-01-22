import React from 'react';

export const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 bg-offWhite/80 backdrop-blur-md border-b border-themeBase/10 transition-all duration-300">
      <div className="text-2xl font-serif italic text-charcoal tracking-wide">
        Atomic.
      </div>
      <div className="hidden md:flex gap-8 text-sm font-sans tracking-widest text-charcoal/80 uppercase">
        <a href="#concept" className="hover:text-themeBase transition-colors">Philosophy</a>
        <a href="#features" className="hover:text-themeBase transition-colors">Growth</a>
        <a href="#demo" className="hover:text-themeBase transition-colors">Try It</a>
      </div>
      <button className="bg-charcoal text-white px-6 py-2 rounded-full font-sans text-sm hover:bg-themeBase transition-colors duration-300">
        Download
      </button>
    </nav>
  );
};