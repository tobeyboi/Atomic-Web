import React from 'react';

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 md:px-24 max-w-7xl mx-auto space-y-32">
      {/* Growth Profile Section */}
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 space-y-8 order-2 md:order-1">
          <h2 className="text-sm uppercase tracking-[0.4em] text-themeBase/60 font-sans">Visualizing Balance</h2>
          <h3 className="text-4xl md:text-5xl font-serif italic text-charcoal leading-tight">Your Growth Profile.</h3>
          <p className="text-charcoal/70 leading-relaxed font-sans font-light text-xl">
            See how your energy flows across different areas of life. Our radar chart tracks six essential pillars: Health, Focus, Wellness, Creativity, Career Growth, and Discipline.
          </p>
          <div className="space-y-4 pt-4">
            {['Health', 'Focus', 'Wellness'].map((item) => (
              <div key={item} className="flex justify-between items-center p-4 bg-white border border-charcoal/5 rounded-2xl">
                <span className="flex items-center gap-3 text-charcoal/70 font-sans">
                  <span className="w-2 h-2 rounded-full bg-themeBase"></span>
                  {item}
                </span>
                <span className="font-serif italic text-charcoal/40">0 🌿</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center p-8 bg-white rounded-[3rem] shadow-sm border border-charcoal/5">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] tracking-widest uppercase text-charcoal/30 font-sans">Balance</div>
            {/* Hexagon Chart Simulation */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-charcoal/10">
              <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <polygon points="50,25 75,40 75,60 50,75 25,60 25,40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
              <line x1="15" y1="30" x2="85" y2="70" stroke="currentColor" strokeWidth="0.5" />
              <line x1="15" y1="70" x2="85" y2="30" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="2" fill="currentColor" />
            </svg>
            <div className="absolute top-2 text-[10px] uppercase tracking-tighter text-charcoal/40 font-medium">Health</div>
            <div className="absolute top-1/4 right-0 text-[10px] uppercase tracking-tighter text-charcoal/40 font-medium">Focus</div>
            <div className="absolute bottom-1/4 right-0 text-[10px] uppercase tracking-tighter text-charcoal/40 font-medium">Wellness</div>
            <div className="absolute bottom-2 text-[10px] uppercase tracking-tighter text-charcoal/40 font-medium">Creativity</div>
            <div className="absolute bottom-1/4 left-0 text-[10px] uppercase tracking-tighter text-charcoal/40 font-medium text-center">Career<br/>Growth</div>
            <div className="absolute top-1/4 left-0 text-[10px] uppercase tracking-tighter text-charcoal/40 font-medium">Discipline</div>
          </div>
        </div>
      </div>

      {/* The Anchor Section */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-16">
        <div className="w-full md:w-1/2 space-y-8">
          <h2 className="text-sm uppercase tracking-[0.4em] text-themeBase/60 font-sans">Core Mechanics</h2>
          <h3 className="text-4xl md:text-5xl font-serif italic text-charcoal leading-tight">The Anchor System.</h3>
          <p className="text-charcoal/70 leading-relaxed font-sans font-light text-xl">
            Atomic rituals aren't just habits; they are your anchors. Each morning, we select one "Anchor" habit to center your day, helping you reclaim peace one moment at a time.
          </p>
        </div>
        <div className="w-full md:w-1/2">
           <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-charcoal/5 max-w-sm mx-auto space-y-8">
              <div className="flex items-center gap-4 border-b border-charcoal/5 pb-4">
                <div className="w-6 h-6 rounded-full bg-themeBase/40 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-themeBase"></div>
                </div>
                <span className="text-charcoal font-serif text-lg">The Anchor</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl font-serif italic text-charcoal">Speak 3 Kind Words</h4>
                <p className="text-charcoal/40 text-sm font-sans">Today's focal point for inner peace.</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};