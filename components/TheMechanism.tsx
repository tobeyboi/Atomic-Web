import React from 'react';

export const TheMechanism: React.FC = () => {
  return (
    <section id="concept" className="py-32 bg-offWhite flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="max-w-5xl space-y-16">
        
        {/* Visual Hero: Atomic Habits Book Cover */}
        <div className="relative group max-w-md mx-auto">
          {/* Atmosphere Background Accents */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-themeBase/10 rounded-full blur-[80px] -z-10 animate-pulse-slow"></div>
          <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-sage/10 rounded-full blur-[100px] -z-10"></div>
          
          <div className="relative z-10 w-full overflow-hidden rounded-[2rem] shadow-[0_60px_120px_rgba(0,0,0,0.12)] border border-themeBase/5 bg-white p-2">
            <img 
              src="/atomic-habits.png" 
              alt="Atomic Habits by James Clear" 
              className="w-full object-contain rounded-[1.5rem] hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.5em] text-themeBase/60 font-sans">The Biological Canvas</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-charcoal leading-tight">
              Backed by <span className="italic">Science.</span>
            </h3>
          </div>
          
          <p className="text-xl md:text-2xl font-sans text-charcoal/50 font-light leading-relaxed">
            Atomic is the digital realization of the neuroplasticity principles explored in James Clear's work. 
            We don't just track your routines; we help you physically <span className="text-themeBase italic">restructure</span> how your brain responds to long-term stress.
          </p>

          <div className="flex items-center justify-center gap-16 pt-8">
            <div className="text-center group cursor-default">
              <p className="text-5xl font-serif text-charcoal group-hover:text-themeBase transition-colors duration-500">21</p>
              <p className="text-[10px] uppercase tracking-widest text-charcoal/30 mt-3 font-medium">Days to Rewire</p>
            </div>
            <div className="w-px h-16 bg-themeBase/10"></div>
            <div className="text-center group cursor-default">
              <p className="text-5xl font-serif text-charcoal group-hover:text-themeBase transition-colors duration-500">0.1%</p>
              <p className="text-[10px] uppercase tracking-widest text-charcoal/30 mt-3 font-medium">Daily Progress</p>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button className="bg-charcoal text-white px-16 py-5 rounded-full font-sans font-medium hover:bg-themeBase transition-all duration-500 shadow-xl hover:shadow-themeBase/20 active:scale-95 transform">
            Explore the Methodology
          </button>
        </div>
      </div>
    </section>
  );
};