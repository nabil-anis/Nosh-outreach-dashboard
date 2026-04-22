
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Layers, Circle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 ${theme === 'dark' ? 'bg-[#030407] text-slate-200' : 'bg-[#F8FAFC] text-slate-900'}`}>
      {/* Mesh Gradient Background */}
      <div className={`fixed inset-0 mesh-gradient -z-10 pointer-events-none transition-opacity duration-500 ${theme === 'dark' ? 'opacity-50' : 'opacity-20'}`} />
      
      {/* Floating Modern Header */}
      <nav className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
        <div className="pointer-events-auto animate-in">
          <div className={`glass px-4 md:px-6 py-2 rounded-2xl flex items-center gap-4 md:gap-6 border ${theme === 'dark' ? 'border-white/10 bg-black/40' : 'border-black/5 bg-white/60'} backdrop-blur-xl shadow-xl`}>
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                 <Layers className="text-white w-4 h-4" />
               </div>
               <span className={`font-extrabold text-sm tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'} uppercase`}>NOSH<span className="text-purple-400">AI</span></span>
             </div>
             <div className={`h-4 w-px ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />
             <div className="flex items-center gap-4">
                <span className={`text-[10px] font-bold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} tracking-widest uppercase hidden sm:inline`}>System Operational</span>
                <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
             </div>
             <div className={`h-4 w-px ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />
             <button 
                onClick={toggleTheme}
                className={`p-1.5 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-black/5 text-slate-600'}`}
                aria-label="Toggle Theme"
             >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content Stream */}
      <main className="pt-32 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6">
        
        <section id="telemetry" className="max-w-7xl mx-auto px-4 md:px-6 scroll-mt-32">
          <Dashboard />
        </section>

        {/* Section 4: Tech Stack / Footer */}
        <section id="about" className="max-w-7xl mx-auto px-4 md:px-6">
          <Settings />
        </section>

      </main>

      <footer className={`border-t ${theme === 'dark' ? 'border-white/5 text-gray-600' : 'border-black/5 text-gray-400'} py-10 text-center text-[10px] md:text-xs tracking-wider uppercase`}>
        <p>&copy; 2026 NOSH AI Systems. All sequences operational.</p>
      </footer>
    </div>
  );
};

export default App;
