import React, { useState, useEffect } from 'react';
import { 
  Shield, Crown, AlertTriangle, Activity, Zap, 
  Settings, Clock, Thermometer, ShieldCheck, 
  Ambulance, Stethoscope, Baby, Trash2, 
  Lock, Pill, FlaskConical, Radio, 
  LayoutGrid, 
  TrendingUp, Lightbulb,
  ExternalLink, ChevronRight,
  Droplets, Recycle, Brain
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  Tooltip, AreaChart, Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility for Tailwind ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Data ---
const DEPARTMENTS = [
  { id: 'admin', name: 'Admin', color: '#f4b13e', status: 'active', metric: '98%', icon: ShieldCheck },
  { id: 'ambulance', name: 'AMB', color: '#ef4444', status: 'critical', metric: '14', icon: Ambulance },
  { id: 'surgery', name: 'OT', color: '#94a3b8', status: 'busy', metric: 'Silver', icon: Stethoscope },
  { id: 'nursing', name: 'Nurse', color: '#3b82f6', status: 'active', metric: '42', icon: Activity },
  { id: 'general', name: 'GEN', color: '#22c55e', status: 'active', metric: '85%', icon: Shield },
  { id: 'maternity', name: 'MAT', color: '#ec4899', status: 'active', metric: '8', icon: Baby },
  { id: 'cleaning', name: 'Clean', color: '#64748b', status: 'on-schedule', metric: 'OK', icon: Trash2 },
  { id: 'security', name: 'SEC', color: '#1e293b', status: 'all-clear', metric: '10', icon: ShieldCheck },
  { id: 'pharmacy', name: 'PHAR', color: '#f97316', status: 'good', metric: 'Low', icon: Pill },
  { id: 'lab', name: 'LAB', color: '#8b5cf6', status: 'pending', metric: '112', icon: FlaskConical },
  { id: 'radiology', name: 'RAD', color: '#14b8a6', status: 'idle', metric: '3', icon: Radio },
];

const INITIAL_CHART_DATA = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, '0')}:00`,
  energy: 250 + Math.random() * 100,
  occupancy: 60 + Math.random() * 30,
}));

const LOW_OCCUPANCY_DATA = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, '0')}:00`,
  energy: 150 + Math.random() * 50,
  occupancy: 30 + Math.random() * 20,
}));

const LOG_ENTRIES = [
  { id: 1, time: '10:32 AM', agent: '🤖 Triage NLP', action: 'Analyzed Ambulance Note. Confidence: 94%. Activating OT Silver.', status: 'success' },
  { id: 2, time: '10:33 AM', agent: '🛏️ Bed Flow Optimizer', action: 'Reserved Bed 4B (Blue) for incoming trauma.', status: 'info' },
  { id: 3, time: '10:34 AM', agent: '🔗 Blockchain', action: 'Hash 0x7a2b... logged for OT Activation.', status: 'info' },
  { id: 4, time: '10:35 AM', agent: '💊 Pharmacy Agent', action: 'Stock check: O-Neg blood sufficient.', status: 'success' },
  { id: 5, time: '10:36 AM', agent: '🌱 Green Agent', action: 'Energy savings recommendation generated.', status: 'success' },
];

const BLOCKCHAIN_EVENTS = [
  { id: 1, time: '09:30:45', action: 'Consent Sign', patient: 'P-88219', hash: '0x7a2b...f91' },
  { id: 2, time: '09:28:12', action: 'Data Access', patient: 'P-12044', hash: '0x1f92...c02' },
  { id: 3, time: '09:15:22', action: 'Update Records', patient: 'P-99321', hash: '0x3e11...d44' },
];

// --- Sub-Components ---

const OrbitDeptBubble = ({ dept, i, total, cx, cy, r, onNavigate }) => {
  const angle = (2 * Math.PI / total) * i - Math.PI / 2;
  const x = cx + r * Math.cos(angle) - 40;
  const y = cy + r * Math.sin(angle) - 40;

  const handleClick = () => {
    if (onNavigate) {
      onNavigate(dept.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.1, zIndex: 20 }}
      onClick={handleClick}
      className="absolute w-20 h-20 rounded-full flex flex-col items-center justify-center cursor-pointer shadow-lg border backdrop-blur-md hover:shadow-xl transition-shadow"
      style={{
        left: x,
        top: y,
        backgroundColor: `rgba(${parseInt(dept.color.slice(1, 3), 16)}, ${parseInt(dept.color.slice(3, 5), 16)}, ${parseInt(dept.color.slice(5, 7), 16)}, 0.2)`,
        borderColor: `rgba(${parseInt(dept.color.slice(1, 3), 16)}, ${parseInt(dept.color.slice(3, 5), 16)}, ${parseInt(dept.color.slice(5, 7), 16)}, 0.5)`,
      }}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center mb-0.5" style={{ backgroundColor: dept.color }}>
        <dept.icon size={16} className="text-white fill-white/20" />
      </div>
      <p className="text-[8px] font-bold uppercase tracking-tighter opacity-80" style={{ color: dept.color === '#1e293b' ? '#334155' : dept.color }}>{dept.name}</p>
      <p className="text-sm font-bold tracking-tight text-slate-800">{dept.metric}</p>
      {/* Indicator dots for status */}
      <div className={cn("w-1.5 h-1.5 rounded-full mt-1", 
        dept.status === 'critical' ? 'bg-red-500 animate-pulse' : 
        dept.status === 'busy' ? 'bg-amber-500' : 'bg-emerald-500'
      )} />
    </motion.div>
  );
};

// --- Main App ---

export default function ClinicalCommandCenter({ onNavigate }) {
  const [chaosMode, setChaosMode] = useState(false);
  const [chartData, setChartData] = useState(INITIAL_CHART_DATA);
  const [isLowOccupancy, setIsLowOccupancy] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleChaosMode = () => setChaosMode(!chaosMode);

  const simulateLowOccupancy = () => {
    setIsLowOccupancy(true);
    setChartData(LOW_OCCUPANCY_DATA);
    setShowRecommendation(true);
    setTimeout(() => {
      // Revert if needed or keep? Let's keep for demo.
    }, 10000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-body selection:bg-amber-500/30">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-8 h-16 bg-[#EC9A04] shadow-md border-b border-amber-600/20">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Crown className="text-white fill-white/20 w-6 h-6" />
            <h1 className="text-xl font-extrabold tracking-tighter text-white font-headline">Clinical Command</h1>
          </div>
          <nav className="hidden md:flex gap-6 items-center h-full">
            <a href="#" className="text-white border-b-2 border-white h-full flex items-center px-1 font-headline font-semibold tracking-tight">Admin Command Center</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors h-full flex items-center px-1 font-headline font-semibold tracking-tight">Intelligence</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors h-full flex items-center px-1 font-headline font-semibold tracking-tight">Sustainability</a>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-white/20 px-3 py-1.5 rounded-full border border-white/30">
            <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-white">Normal Operations</span>
          </div>
          
          <button 
            onClick={toggleChaosMode}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border",
              chaosMode ? "bg-slate-800 text-white border-slate-700" : "bg-white/20 text-white border-white/30 hover:bg-white/30"
            )}
          >
            <Settings size={14} />
            <span className="text-xs font-bold uppercase">Chaos Mode</span>
          </button>

          <div className="flex items-center gap-4 text-white/90">
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span className="text-xs font-mono font-medium">{currentTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Thermometer size={16} />
              <span className="text-xs font-medium">24°C</span>
            </div>
          </div>

          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100" 
            alt="Admin" 
            className="w-10 h-10 rounded-full border-2 border-white/50 object-cover"
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className={cn(
        "max-w-7xl mx-auto pt-24 px-8 pb-20 transition-all duration-700 ease-in-out",
        chaosMode && "grayscale contrast-125 brightness-110"
      )}>
        
        {/* Section 1: Department Status (Orbital) */}
        <section className="mb-12 relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Shield className="text-[#EC9A04] w-6 h-6" />
              <h2 className="text-2xl font-headline font-bold tracking-tight text-slate-800">Admin Command Center</h2>
            </div>
            <div className="flex gap-2">
              <div className="h-1.5 w-12 bg-[#EC9A04] rounded-full"></div>
              <div className="h-1.5 w-4 bg-slate-200 rounded-full"></div>
              <div className="h-1.5 w-4 bg-slate-200 rounded-full"></div>
            </div>
          </div>

          {/* Orbital Scene */}
          <div className="relative w-[520px] h-[520px] mx-auto flex items-center justify-center">
            {/* Dashed background rings */}
            <div className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-amber-500/20 animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-amber-500/10 animate-[spin_40s_linear_infinite_reverse]" />

            {/* Center Hub */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative z-10 w-40 h-40 rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-400/30 to-amber-200/50 backdrop-blur-xl border-2 border-white/60 shadow-2xl"
            >
              <Crown className="text-[#EC9A04] w-10 h-10 mb-2 fill-amber-500/20" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900 leading-tight text-center">Aether</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900 leading-tight text-center">Healthcare</p>
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse mt-3" />
            </motion.div>

            {/* Department Bubbles */}
            {DEPARTMENTS.map((dept, i) => (
              <OrbitDeptBubble 
                key={dept.id} 
                dept={dept} 
                i={i} 
                total={DEPARTMENTS.length} 
                cx={260} cy={260} r={200}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-12 gap-8">
          
          {/* Section 2: Left Panel - Operational Overview */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Bed Occupancy Card */}
            <div className="glass-panel p-8 rounded-[2.5rem] bg-amber-100/30 backdrop-blur-md border border-amber-200/50 shadow-sm relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors" />
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-headline font-bold text-slate-800">Bed Occupancy</h3>
                <Settings className="text-slate-400 w-5 h-5 cursor-pointer hover:rotate-90 transition-transform" />
              </div>

              <div className="relative w-52 h-52 mx-auto mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Occupied', value: 187 },
                        { name: 'Available', value: 63 }
                      ]}
                      innerRadius={75}
                      outerRadius={95}
                      paddingAngle={5}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      <Cell fill="#EC9A04" stroke="none" />
                      <Cell fill="rgba(255,255,255,0.4)" stroke="none" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-5xl font-extrabold font-headline text-slate-800">187</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">/ 250 Beds</p>
                </div>
              </div>

              <div className="bg-amber-100/40 rounded-2xl p-4 flex items-start gap-4 border border-amber-200/50">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Brain className="text-[#EC9A04] w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-tight">Bed Flow Optimizer</p>
                  <p className="text-sm text-slate-700 font-semibold leading-relaxed">AI Predicted Discharges (Next 4h): <span className="text-amber-700">12</span></p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#ef4444] text-white py-6 rounded-3xl flex items-center justify-center gap-4 shadow-xl shadow-red-200 border border-red-400 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <AlertTriangle className="w-8 h-8 fill-white/20 animate-pulse" />
                <div className="text-left">
                  <p className="text-lg font-bold font-headline leading-tight tracking-tight uppercase">Activate Code Blue</p>
                  <p className="text-xs text-white/70 font-medium">Manual Emergency Protocol</p>
                </div>
              </motion.button>
              
              <button className="w-full bg-amber-100/40 backdrop-blur-md hover:bg-amber-100/60 transition-all py-5 rounded-3xl flex items-center justify-center gap-4 border border-amber-200/50 text-slate-700 group">
                <LayoutGrid className="w-5 h-5 text-amber-600 group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-bold uppercase tracking-[0.15em]">Generate Shift Report</span>
              </button>
            </div>
          </div>

          {/* Section 3: Center Panel - Live Intelligence Feed */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Ambulance Tracker */}
              <div className="glass-panel rounded-[2.5rem] overflow-hidden bg-amber-100/30 backdrop-blur-md border border-amber-200/50 shadow-sm">
                <div className="p-6 bg-amber-100/40 border-b border-amber-200/40 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Ambulance className="text-red-500 w-5 h-5" />
                    <span className="font-headline font-bold text-slate-800">Ambulance Tracker</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full animate-pulse border border-red-100 uppercase tracking-widest">
                    Live
                  </span>
                </div>
                
                <div className="relative h-44 group">
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
                    alt="Map" 
                    className="w-full h-full object-cover opacity-60 contrast-75 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="bg-amber-50/95 backdrop-blur-xl p-5 rounded-3xl border border-amber-100 shadow-2xl w-full"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center shrink-0">
                          <Activity className="text-red-600 w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">Cardiac Arrest</p>
                          <p className="text-xs font-semibold text-slate-500">Routing to: <span className="text-slate-800 font-bold">OT Silver</span></p>
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">ETA</p>
                          <p className="text-3xl font-extrabold text-red-600 font-headline leading-none">6 mins</p>
                        </div>
                        <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#EC9A04] border-2 border-[#EC9A04]/20 px-4 py-2 rounded-xl hover:bg-[#EC9A04] hover:text-white transition-all">
                          Manual Override
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Energy Chart / Utilization Flux */}
              <div className="glass-panel rounded-[2.5rem] p-8 bg-amber-100/30 backdrop-blur-md border border-amber-200/50 shadow-sm relative overflow-hidden group">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <Zap className="text-amber-500 w-5 h-5" />
                    <h3 className="font-headline font-bold text-slate-800">Utilization Flux</h3>
                  </div>
                  <button 
                    onClick={simulateLowOccupancy}
                    disabled={isLowOccupancy}
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all border",
                      isLowOccupancy 
                        ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" 
                        : "bg-amber-100/50 hover:bg-amber-100 text-slate-600 border-amber-200 shadow-sm"
                    )}
                  >
                    Simulate Low
                  </button>
                </div>
                
                <div className="h-40 -mx-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorEnergy)" />
                      <Area type="monotone" dataKey="occupancy" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorOcc)" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> Energy</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-teal-500" /> Occupancy</div>
                </div>

                <AnimatePresence>
                  {showRecommendation && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 bg-teal-50 border border-teal-100 p-4 rounded-2xl flex items-start gap-3"
                    >
                      <Lightbulb className="text-teal-600 w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-teal-800 uppercase tracking-tight mb-0.5">Green Strategy Detected</p>
                        <p className="text-sm text-teal-700 leading-snug">Reduce AC in Green Wing. Estimated savings: <span className="font-bold">₹1,200/day</span>.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* AI Agent Activity Log */}
            <div className="glass-panel rounded-[2.5rem] bg-amber-100/30 backdrop-blur-md border border-amber-200/50 shadow-sm overflow-hidden">
              <div className="p-6 bg-amber-100/30 border-b border-amber-200/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Brain className="text-amber-600 w-5 h-5" />
                  </div>
                  <h3 className="font-headline font-bold text-slate-800">AI Agent Activity Log</h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Live Stream</span>
                  <ExternalLink className="w-4 h-4 text-slate-300 hover:text-amber-500 transition-colors cursor-pointer" />
                </div>
              </div>
              
              <div className="p-8 space-y-6 max-h-[300px] overflow-y-auto scrollbar-hide">
                {LOG_ENTRIES.map((log) => (
                  <motion.div 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    key={log.id} 
                    className="flex gap-5 group"
                  >
                    <div className="flex flex-col items-center">
                      <div className={cn("w-3 h-3 rounded-full mt-1.5 shrink-0 transition-all", 
                        log.status === 'success' ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]'
                      )} />
                      <div className="w-px h-full bg-slate-200 mt-2" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.time}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-tight">{log.agent}</span>
                      </div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">
                        {log.action}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Trust & Sustainability */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Blockchain Trust Panel */}
            <div className="glass-panel rounded-[2.5rem] bg-amber-100/30 backdrop-blur-md border border-amber-200/50 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-amber-200/40 flex justify-between items-center bg-amber-100/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Lock className="text-purple-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-slate-800">Blockchain Trust Ledger</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Immutable Consent Tracking</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-bold text-purple-700">34 Active Consents</span>
                <span className="bg-red-100 text-red-600 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest border border-red-200">
                  2 Expiring Soon
                </span>
              </div>
            </div>

            <div className="flex-grow overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-amber-100/10 text-slate-400 font-label text-[10px] uppercase tracking-[0.2em] border-b border-amber-200/20">
                  <tr>
                    <th className="px-8 py-4 font-bold">Timestamp</th>
                    <th className="px-8 py-4 font-bold">Action</th>
                    <th className="px-8 py-4 font-bold">Hash</th>
                    <th className="px-8 py-4 font-bold">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {BLOCKCHAIN_EVENTS.map((evt) => (
                    <tr key={evt.id} className="hover:bg-amber-100/30 transition-colors group">
                      <td className="px-8 py-5 font-mono text-[11px] text-slate-500 font-medium">{evt.time}</td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700 tracking-tight">{evt.action}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: {evt.patient}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 font-mono text-[11px] text-amber-600/70 font-semibold group-hover:text-amber-600 transition-colors">{evt.hash}</td>
                      <td className="px-8 py-5 text-right">
                        <button className="text-[10px] font-bold text-teal-600 uppercase tracking-widest hover:text-teal-700 flex items-center gap-2 transition-colors ml-auto">
                          Verify <ExternalLink size={10} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-amber-100/30 border-t border-amber-200/40">
              <button className="w-full py-3 text-[10px] font-extrabold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-800 transition-all flex items-center justify-center gap-2">
                Explore Full Ledger <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Green Metrics Panel */}
          <div className="glass-panel rounded-[2.5rem] p-8 bg-amber-100/30 backdrop-blur-md border border-amber-200/50 shadow-sm relative flex flex-col justify-between overflow-hidden">
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex justify-between items-start mb-10 relative z-10">
              <div>
                <h3 className="font-headline font-bold flex items-center gap-3 text-slate-800 text-xl">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Droplets className="text-emerald-600 w-6 h-6" />
                  </div>
                  Sustainability Dashboard
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">Real-time carbon footprint optimization</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-extrabold font-headline text-emerald-700 leading-none tracking-tighter">245<span className="text-lg">kW</span></p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Current Usage / 380kW Baseline</p>
              </div>
            </div>

            <div className="space-y-8 relative z-10">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Energy Efficiency</span>
                  <span className="text-xs font-extrabold text-emerald-700">64.5%</span>
                </div>
                <div className="w-full bg-emerald-100 h-3 rounded-full overflow-hidden shadow-inner border border-emerald-200/50 p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '64.5%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-emerald-500 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-amber-100/50 p-4 rounded-3xl border border-amber-200/80">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Water Recycled</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-emerald-500" />
                    <span className="text-xl font-extrabold text-slate-800">1,240 <span className="text-xs">L</span></span>
                  </div>
                </div>
                <div className="bg-amber-100/50 p-4 rounded-3xl border border-amber-200/80">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Waste Redirected</p>
                  <div className="flex items-center gap-2">
                    <Recycle size={14} className="text-amber-500" />
                    <span className="text-xl font-extrabold text-slate-800">85<span className="text-xs">%</span></span>
                  </div>
                </div>
              </div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-emerald-600 p-6 rounded-[2rem] border border-emerald-500 shadow-xl shadow-emerald-200/50 relative overflow-hidden group"
              >
                <Lightbulb className="absolute -right-4 -top-4 w-24 h-24 text-white/10 group-hover:scale-110 transition-transform duration-500" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 bg-amber-100/30 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md">
                    <Brain className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-100 mb-1">AI Recommendation</p>
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      Shift non-urgent MRI scans to 3 AM to 5 AM window. Estimated savings: <span className="underline decoration-emerald-300">₹850/shift</span>.
                    </p>
                    <button className="mt-4 bg-white text-emerald-700 text-[10px] font-extrabold py-2 px-6 rounded-full transition-all hover:bg-emerald-50 uppercase tracking-widest shadow-md">
                      Implement Now
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 right-10 w-16 h-16 bg-[#EC9A04] text-white rounded-[1.5rem] shadow-2xl shadow-amber-500/40 flex items-center justify-center group z-[100]"
      >
        <Zap className="w-8 h-8 fill-white/20 group-hover:scale-110 transition-transform" />
        <div className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Express Action
        </div>
      </motion.button>

      {/* Styles for glassmorphism and custom bits */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .glass-panel {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-panel:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
        }
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
