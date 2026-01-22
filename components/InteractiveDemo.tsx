import React, { useState } from 'react';
import { generateHabitPlan } from '../services/geminiService';
import { GeneratedHabit } from '../types';

export const InteractiveDemo: React.FC = () => {
  const [identity, setIdentity] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedHabit | null>(null);

  const handleGenerate = async () => {
    if (!identity.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const plan = await generateHabitPlan(identity);
      setResult(plan);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-24 px-6 bg-stone-100/50 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-charcoal italic">Your First Seed.</h2>
          <p className="text-charcoal/50 font-sans mt-4 max-w-md mx-auto">Input your focus to visualize your internal garden.</p>
        </div>

        {/* Mobile View Mockup Frame */}
        <div className="max-w-sm mx-auto bg-white rounded-[3.5rem] p-8 shadow-2xl border border-charcoal/5 relative overflow-hidden min-h-[700px] flex flex-col">
          {/* Status Bar */}
          <div className="flex justify-between items-center mb-8 px-2">
            <span className="text-xs font-sans text-charcoal/40">20:42</span>
            <div className="flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-charcoal/40"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-charcoal/40"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-charcoal/40"></div>
              <div className="w-4 h-2 rounded-sm border border-charcoal/40 flex items-center p-[1px]">
                <div className="w-2/3 h-full bg-themeBase"></div>
              </div>
            </div>
          </div>

          <div className="text-center flex-1 flex flex-col items-center justify-between pb-12">
            <div className="space-y-1">
              <h3 className="text-2xl font-serif text-charcoal">Today</h3>
              <p className="text-[10px] uppercase tracking-widest text-charcoal/30 font-sans">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            {/* Hand-drawn Sprout Asset Simulation */}
            <div className="py-12 relative group cursor-pointer" onClick={() => !loading && handleGenerate()}>
              <svg width="180" height="200" viewBox="0 0 100 120" className={`text-themeBase/60 transition-all duration-1000 ${loading ? 'animate-pulse scale-95' : 'hover:scale-105'}`}>
                <path d="M50 110 Q50 60 50 30" stroke="#8C7355" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M50 40 Q60 20 75 25 Q80 35 50 40" fill="currentColor" opacity="0.8" />
                <path d="M50 40 Q40 20 25 25 Q20 35 50 40" fill="currentColor" opacity="0.8" />
                <path d="M30 110 Q50 105 70 110 Q55 115 30 110" fill="#8C7355" opacity="0.3" />
              </svg>
              {loading && <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-full text-xs font-serif italic text-charcoal">Growing...</div>}
            </div>

            <div className="space-y-6 w-full">
              {!result && (
                <div className="px-6 space-y-4">
                  <input
                    type="text"
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    placeholder="Enter your focus..."
                    className="w-full bg-offWhite border-b border-charcoal/10 py-2 text-center text-sm font-sans focus:outline-none focus:border-themeBase transition-colors"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                  <p className="text-[10px] italic text-charcoal/30 font-serif leading-relaxed px-4">
                    "Your journey begins with a single act of care. Today, you plant a seed for your future self."
                  </p>
                </div>
              )}

              {result && (
                <div className="animate-fade-in space-y-6">
                  <div className="bg-stone-50 p-6 rounded-[2rem] border border-charcoal/5 shadow-sm text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-4 h-4 rounded-full bg-themeBase/20 flex items-center justify-center">
                         <div className="w-1.5 h-1.5 rounded-full bg-themeBase"></div>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-charcoal/40 font-medium font-sans">The Anchor</span>
                    </div>
                    <p className="text-lg font-serif italic text-charcoal leading-tight">
                      {result.habits[0]}
                    </p>
                  </div>
                  <p className="text-[10px] italic text-charcoal/40 font-serif leading-relaxed px-4">
                    {result.treeDescription}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Tab Bar Mockup */}
          <div className="flex justify-around items-center border-t border-charcoal/5 pt-4 pb-2">
            {[
              { label: 'Tracker', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { label: 'Awards', icon: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z' },
              { label: 'History', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
              { label: 'Help', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
            ].map((tab) => (
              <div key={tab.label} className="flex flex-col items-center gap-1 cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={tab.label === 'Tracker' ? 'text-themeBase' : 'text-charcoal/20'}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                </svg>
                <span className={`text-[8px] uppercase tracking-tighter font-sans ${tab.label === 'Tracker' ? 'text-themeBase font-medium' : 'text-charcoal/30'}`}>{tab.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};