import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-offWhite py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center space-y-10">

        <div className="text-3xl font-serif italic tracking-wider">
          Atomic.
        </div>

        <div className="h-px w-20 bg-sage/30"></div>

        <blockquote className="max-w-md font-serif text-lg md:text-xl text-sage/80 leading-relaxed">
          "Nothing lasts, nothing is finished, and nothing is perfect."
        </blockquote>

        <div className="flex gap-8 text-sm font-sans tracking-widest text-offWhite/40 uppercase">
          <a href="#privacy" className="hover:text-sage transition-colors">Privacy</a>
          <a href="#" className="hover:text-sage transition-colors">Terms</a>
          <a href="#" className="hover:text-sage transition-colors">Contact</a>
        </div>

        <p className="text-xs text-offWhite/20 font-sans mt-8">
          © {new Date().getFullYear()} Atomic App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};