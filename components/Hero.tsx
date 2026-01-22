import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-offWhite pt-20">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-themeBase/10 rounded-full blur-[120px] -z-10 animate-float-subtle pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

      <div className="max-w-4xl space-y-10 animate-fade-in relative z-10">
        {/* Minimalist Brand Accent */}
        <div className="flex justify-center mb-6 opacity-60">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-themeBase">
            <path d="M20 35V15M20 15C20 15 22 10 28 10M20 15C20 15 18 10 12 10M28 10C28 10 32 10 32 14C32 18 28 20 20 20M12 10C12 10 8 10 8 14C8 18 12 20 20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-serif text-charcoal leading-[1.1] tracking-tight">
            Unlearn the habit <br /> 
            <span className="italic text-themeBase">of anxiety.</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-sans text-charcoal/60 font-light leading-relaxed max-w-2xl mx-auto">
            For the mind that has lived in survival mode for too long. 
            Rewire your nervous system and reclaim your peace, one tiny habit at a time.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
          <button className="bg-charcoal text-white px-10 py-4 rounded-full font-sans font-medium hover:bg-themeBase transition-all duration-500 shadow-xl hover:shadow-themeBase/20 flex items-center justify-center gap-3 group">
            Begin Your Journey
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <a href="#demo" className="bg-white border border-charcoal/10 text-charcoal px-10 py-4 rounded-full font-sans font-medium hover:bg-charcoal hover:text-white transition-all duration-500 flex items-center justify-center">
            Find Your First Habit
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 flex flex-col items-center gap-4 animate-pulse-slow">
        <span className="text-[10px] uppercase tracking-[0.4em] text-charcoal/30">Scroll to explore</span>
        <div className="w-px h-12 bg-charcoal/10"></div>
      </div>
    </section>
  );
};