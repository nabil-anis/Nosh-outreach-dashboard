
import React from 'react';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#030407] text-slate-200 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 mesh-gradient -z-10 pointer-events-none opacity-50" />
      
      {/* Floating Modern Header */}
      <nav className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
        <div className="pointer-events-auto animate-in">
          <div className="glass px-6 py-2 rounded-2xl flex items-center gap-6 border border-white/10 bg-black/40 backdrop-blur-xl">
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                 <i className="fas fa-layer-group text-white text-xs"></i>
               </div>
               <span className="font-extrabold text-sm tracking-tight text-white uppercase">NOSH<span className="text-purple-400">AI</span></span>
             </div>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">System Operational</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
             </div>
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

      <footer className="border-t border-white/5 py-10 text-center text-gray-600 text-[10px] md:text-xs tracking-wider uppercase">
        <p>&copy; 2026 NOSH AI Systems. All sequences operational.</p>
      </footer>
    </div>
  );
};

export default App;
