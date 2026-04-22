
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { fetchSheetData, DashboardMetrics } from '../services/sheetService';
import { RotateCcw, Activity, ShieldCheck, Database, ArrowRight, CheckCircle2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    const data = await fetchSheetData();
    setMetrics(data);
    setLoading(false);
    if (isManual) {
      setTimeout(() => setRefreshing(false), 800);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => loadData(false), 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !metrics) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full"
        />
        <motion.p 
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm font-medium text-slate-400"
        >
          Syncing NOSH metrics...
        </motion.p>
      </div>
    );
  }

  const emailData = [
    { name: 'Sent', value: metrics.email.sent, color: '#A855F7' },
    { name: 'Replied', value: metrics.email.replied, color: '#10B981' },
    { name: 'Follow-Ups', value: metrics.email.followUps, color: '#F59E0B' },
    { name: 'Idle', value: metrics.email.idle, color: '#475569' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-4">
        <motion.div variants={itemVariants}>
           <h2 className="text-3xl font-extrabold dark:text-white text-slate-900 tracking-tight mb-2">Campaign <span className="text-purple-400">Intelligence</span></h2>
           <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> Live Stream
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-tight">Active synchronization across {metrics.totalLeads} records</span>
           </div>
        </motion.div>
        <motion.button 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => loadData(true)}
          disabled={refreshing}
          className="group flex items-center gap-2.5 px-5 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 rounded-xl border border-purple-500/20 transition-all text-xs font-semibold tracking-tight disabled:opacity-50"
        >
          <RotateCcw className={`w-3.5 h-3.5 transition-transform group-hover:rotate-180 md:duration-500 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing Pipeline' : 'Sync Campaign Data'}
        </motion.button>
      </div>

      {/* Bento Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Overview Card */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-8 glass p-8 rounded-[32px] flex flex-col lg:flex-row gap-10 items-center overflow-hidden min-h-[360px]"
        >
           <div className="w-64 h-64 relative">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={emailData}
                   innerRadius={80}
                   outerRadius={110}
                   paddingAngle={8}
                   dataKey="value"
                   stroke="none"
                   cornerRadius={6}
                   animationBegin={0}
                   animationDuration={1500}
                 >
                   {emailData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip 
                   contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                   itemStyle={{ color: '#fff', padding: '2px 0' }}
                 />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <motion.span 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-4xl font-extrabold dark:text-white text-slate-900 tracking-tighter"
                >
                  {Math.round(((metrics.email.sent + metrics.email.replied + metrics.email.followUps) / (metrics.totalLeads || 1)) * 100)}%
                </motion.span>
                <span className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase mt-1">Efficiency</span>
             </div>
           </div>

           <div className="flex-1 w-full space-y-8">
              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total Leads</p>
                    <p className="text-4xl font-extrabold dark:text-white text-slate-900">{metrics.totalLeads}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Reply Rate</p>
                    <p className="text-4xl font-extrabold text-emerald-400">
                      {Math.round((metrics.email.replied / (metrics.email.sent || 1)) * 100)}%
                    </p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-purple-500" />
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Outreach Sent</span>
                    </div>
                    <p className="text-2xl font-bold dark:text-white text-slate-900">{metrics.email.sent}</p>
                 </div>
                 <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500" />
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Replied</span>
                    </div>
                    <p className="text-2xl font-bold dark:text-white text-slate-900">{metrics.email.replied}</p>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Status Drilldown */}
        <div className="md:col-span-4 grid grid-cols-1 gap-6">
           <motion.div variants={itemVariants} className="glass p-8 rounded-[32px] space-y-6">
              <h4 className="text-xs font-bold dark:text-white text-slate-900 uppercase tracking-widest flex items-center gap-2">
                Pipeline Health
              </h4>
              <div className="space-y-5">
                 {[
                   { label: 'Follow-Ups', val: metrics.email.followUps, color: 'bg-amber-500', text: 'text-amber-400' },
                   { label: 'Idle Pipeline', val: metrics.email.idle, color: 'bg-slate-600', text: 'text-slate-400' },
                   { label: 'Failed Sync', val: metrics.email.failed, color: 'bg-rose-500', text: 'text-rose-400' }
                 ].map(item => (
                   <div key={item.label} className="group">
                      <div className="flex justify-between items-baseline mb-2">
                         <span className="text-xs text-slate-400 font-medium">{item.label}</span>
                         <span className={`text-sm font-bold ${item.text}`}>{item.val}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${(item.val / (metrics.totalLeads || 1)) * 100}%` }}
                           transition={{ duration: 1, ease: "easeOut" }}
                           className={`h-full ${item.color} rounded-full`} 
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </motion.div>

           <motion.div 
            variants={itemVariants} 
            className="p-8 rounded-[32px] bg-gradient-to-br from-purple-500/20 to-fuchsia-600/10 border border-purple-500/20 relative overflow-hidden flex flex-col justify-center"
           >
              <div className="relative z-10 space-y-1">
                <p className="text-[10px] text-purple-600 dark:text-purple-300 font-bold uppercase tracking-widest">IMAP Sentinel</p>
                <p className="text-sm font-semibold dark:text-white text-slate-900">Reply detection active</p>
                <p className="text-[11px] text-slate-400 font-medium tracking-tight">Monitoring realtime responses...</p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse" />
           </motion.div>
        </div>

      </div>

      {/* Logic Breakdown Section */}
      <motion.div variants={itemVariants} className="glass p-10 rounded-[40px] border border-white/10 bg-black/40">
        <div className="max-w-3xl mb-12 text-center md:text-left">
           <h3 className="text-2xl font-extrabold dark:text-white text-slate-900 tracking-tight mb-3">System <span className="text-purple-400">Architecture</span></h3>
           <p className="text-sm text-slate-500 leading-relaxed font-medium">NOSH AI operates on a dual-flow parallel architecture ensuring maximum deliverability and instant termination upon client response.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { id: '01', title: 'Intelligent Ingestion', desc: 'Google Sheets integration via secure proxy-rotation. Ensures 99.9% uptime for dataset retrieval.', icon: <Database className="w-5 h-5 text-purple-400" /> },
              { id: '02', title: '3-Touch Sequence', desc: 'Status-gated outreach logic. Automated follow-ups dispatched only if lead remains idle.', icon: <Activity className="w-5 h-5 text-purple-400" /> },
              { id: '03', title: 'SENTINEL Detection', desc: 'Realtime IMAP listener triggers immediate termination when a reply is detected.', icon: <ShieldCheck className="w-5 h-5 text-purple-400" /> }
            ].map(item => (
              <motion.div 
                key={item.id} 
                whileHover={{ y: -5 }}
                className="space-y-5 group"
              >
                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-purple-500/30 transition-colors duration-500">
                    {item.icon}
                 </div>
                 <div className="space-y-2 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <span className="text-xs font-bold text-purple-500/60 font-mono">{item.id}</span>
                      <h5 className="font-extrabold text-sm uppercase tracking-wider dark:text-white text-slate-900">{item.title}</h5>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                 </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

    </motion.div>
  );
};

export default Dashboard;
