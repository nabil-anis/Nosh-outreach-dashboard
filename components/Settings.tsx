
import React from 'react';
import { Database, Cpu, Server, Mail } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="pb-20 pt-10 border-t dark:border-white/5 border-black/5 relative">
      <div className="flex flex-col lg:flex-row gap-16 justify-center items-start max-w-6xl mx-auto px-4">
        
        {/* Left: Tactical Context */}
        <div className="flex-1 space-y-10">
           <div className="space-y-4">
             <h3 className="text-3xl font-extrabold dark:text-white text-slate-900 tracking-tight">Platform <span className="text-purple-400">Intelligence</span></h3>
             <p className="text-slate-500 leading-relaxed text-sm font-medium">
               NOSH AI delivers high-performance 3-touch cold outbound systems. 
               By automating the sequence logic and follow-up "kill-switches", 
               we help businesses scale their personalized outreach with 0% manual overhead.
             </p>
           </div>
           
           <div className="grid grid-cols-2 gap-6">
              <div className="glass p-6 rounded-3xl dark:bg-black/40 bg-white/40">
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-2">Protocol</p>
                 <p className="text-2xl font-extrabold dark:text-white text-slate-900 tracking-tight">SENTINEL-X</p>
              </div>
              <div className="glass p-6 rounded-3xl dark:bg-black/40 bg-white/40">
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-2">Operation</p>
                 <p className="text-2xl font-extrabold dark:text-white text-slate-900 tracking-tight text-emerald-500 uppercase">Active</p>
              </div>
           </div>
        </div>

        {/* Right: Technical Stack */}
        <div className="flex-1 w-full space-y-8">
          <div className="flex items-center gap-4">
             <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] whitespace-nowrap">Core Technology</h3>
             <div className="h-px flex-1 dark:bg-white/10 bg-black/10"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Google Sheets', desc: 'Secure Lead DB', icon: <Database className="w-4 h-4" />, color: 'text-emerald-500' },
              { name: 'n8n Engine', desc: 'Workflow Automator', icon: <Cpu className="w-4 h-4" />, color: 'text-orange-500' },
              { name: 'Cloud Server', desc: 'API Middleware', icon: <Server className="w-4 h-4" />, color: 'text-indigo-500' },
              { name: 'IMAP Protocol', desc: 'Reply Detection', icon: <Mail className="w-4 h-4" />, color: 'text-purple-500' },
            ].map((tech) => (
              <div key={tech.name} className="glass p-5 rounded-2xl flex gap-4 transition-all hover:translate-y-[-2px]">
                 <div className={`w-10 h-10 shrink-0 flex items-center justify-center ${tech.color} dark:bg-white/5 bg-black/5 rounded-xl border dark:border-white/10 border-black/5`}>
                    {tech.icon}
                 </div>
                 <div className="min-w-0">
                    <p className="font-bold dark:text-white text-slate-900 text-sm truncate">{tech.name}</p>
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
