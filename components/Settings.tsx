
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="animate-in pb-20 pt-10 border-t border-white/5 relative">
      <div className="flex flex-col lg:flex-row gap-16 justify-center items-start max-w-6xl mx-auto px-4">
        
        {/* Left: Tactical Context */}
        <div className="flex-1 space-y-10">
           <div className="space-y-4">
             <h3 className="text-3xl font-extrabold text-white tracking-tight">Platform <span className="text-purple-400">Intelligence</span></h3>
             <p className="text-slate-400 leading-relaxed text-sm font-medium">
               NOSH AI delivers high-performance 3-touch cold outbound systems. 
               By automating the sequence logic and follow-up "kill-switches", 
               we help businesses scale their personalized outreach with 0% manual overhead.
             </p>
           </div>
           
           <div className="grid grid-cols-2 gap-6">
              <div className="glass p-6 rounded-3xl border border-white/5 bg-black/40">
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-2">Protocol</p>
                 <p className="text-2xl font-extrabold text-white tracking-tight">SENTINEL-X</p>
              </div>
              <div className="glass p-6 rounded-3xl border border-white/5 bg-black/40">
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-2">Operation</p>
                 <p className="text-2xl font-extrabold text-white tracking-tight text-emerald-400 uppercase">Active</p>
              </div>
           </div>
        </div>

        {/* Right: Technical Stack */}
        <div className="flex-1 w-full space-y-8">
          <div className="flex items-center gap-4">
             <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] whitespace-nowrap">Core Technology</h3>
             <div className="h-px flex-1 bg-white/10"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Google Sheets', desc: 'Secure Lead DB', icon: 'fa-table', color: 'text-emerald-400' },
              { name: 'n8n Engine', desc: 'Workflow Automator', icon: 'fa-microchip', color: 'text-orange-400' },
              { name: 'Cloud Server', desc: 'API Middleware', icon: 'fa-server', color: 'text-purple-400' },
              { name: 'IMAP Protocol', desc: 'Reply Detection', icon: 'fa-paper-plane', color: 'text-purple-400' },
            ].map((tech) => (
              <div key={tech.name} className="glass p-5 rounded-2xl border border-white/5 flex gap-4 transition-all hover:translate-y-[-2px]">
                 <div className={`w-10 h-10 shrink-0 flex items-center justify-center ${tech.color} bg-white/5 rounded-xl border border-white/10`}>
                    <i className={`fas ${tech.icon} text-sm`}></i>
                 </div>
                 <div className="min-w-0">
                    <p className="font-bold text-white text-sm truncate">{tech.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium truncate uppercase tracking-wider">{tech.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
