import { useEffect, useRef } from "react";

const departmentItems = [
  { label: "Admin", value: "98%", icon: "shield_person", color: "dept-gold", iconBg: "bg-amber-400", textClass: "text-amber-800", valueClass: "text-amber-900" },
  { label: "AMB", value: "14", icon: "ambulance", color: "dept-red", iconBg: "bg-red-500", textClass: "text-red-800", valueClass: "text-red-900" },
  { label: "OT", value: "Silver", icon: "medical_mask", color: "dept-silver", iconBg: "bg-slate-400", textClass: "text-slate-600", valueClass: "text-slate-700" },
  { label: "Nurse", value: "42", icon: "medical_services", color: "dept-blue", iconBg: "bg-blue-500", textClass: "text-blue-800", valueClass: "text-blue-900" },
  { label: "GEN", value: "85%", icon: "home_health", color: "dept-green", iconBg: "bg-green-500", textClass: "text-green-800", valueClass: "text-green-900" },
  { label: "MAT", value: "8", icon: "child_care", color: "dept-pink", iconBg: "bg-pink-500", textClass: "text-pink-800", valueClass: "text-pink-900" },
  { label: "Clean", value: "OK", icon: "cleaning_services", color: "dept-grey", iconBg: "bg-slate-500", textClass: "text-slate-600", valueClass: "text-slate-700" },
  { label: "SEC", value: "10", icon: "admin_panel_settings", color: "dept-dark", iconBg: "bg-slate-800", textClass: "text-slate-700", valueClass: "text-slate-800" },
  { label: "PHAR", value: "Low", icon: "medication", color: "dept-orange", iconBg: "bg-orange-500", textClass: "text-orange-800", valueClass: "text-orange-900" },
  { label: "LAB", value: "112", icon: "biotech", color: "dept-violet", iconBg: "bg-purple-600", textClass: "text-purple-800", valueClass: "text-purple-900" },
  { label: "RAD", value: "3", icon: "radiology", color: "dept-teal", iconBg: "bg-teal-500", textClass: "text-teal-800", valueClass: "text-teal-900" },
];

function HospitalDashboard() {
  const orbitRef = useRef(null);

  useEffect(() => {
    const scene = orbitRef.current;
    if (!scene) return;

    const bubbles = Array.from(scene.querySelectorAll(".dept-bubble"));
    const total = bubbles.length;
    const cx = 260;
    const cy = 260;
    const r = 200;
    const bSize = 80;

    bubbles.forEach((el, i) => {
      const angle = (2 * Math.PI / total) * i - Math.PI / 2;
      const x = cx + r * Math.cos(angle) - bSize / 2;
      const y = cy + r * Math.sin(angle) - bSize / 2;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.setProperty("--tx", `${Math.cos(angle) * 0}px`);
      el.style.setProperty("--ty", `${Math.sin(angle) * 0}px`);
    });
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-8 h-16 bg-[#EC9A04] shadow-md">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>crown</span>
            <h1 className="text-xl font-bold tracking-tighter text-white font-headline">Clinical Command</h1>
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
            <span className="text-xs font-label uppercase tracking-widest text-white font-bold">Normal Operations</span>
          </div>
          <div className="flex items-center gap-4 text-white">
            <span className="material-symbols-outlined hover:text-primary transition-colors cursor-pointer">warning</span>
            <span className="material-symbols-outlined hover:text-primary transition-colors cursor-pointer">schedule</span>
            <span className="material-symbols-outlined hover:text-primary transition-colors cursor-pointer">thermostat</span>
          </div>
          <img alt="Chief Medical Officer Profile" className="w-10 h-10 rounded-full border-2 border-white/50 object-cover ml-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5n3XrDVG312wSADEoFlBcdDgbUKVBYCnqawZDzF-36F_IG1DpGmbNZQjthL-ChVQWgDTFeOGYH_k4124F1x_tDvC-vbiUvy-mNOq1kvl_Rx1rJ5UQwZIjW89eWhKu7otVbwqffnTFP_MptqQPXtaugiCPY81ipKPTg26iOB_n8974RZzFVWdVULhN6A_5bQvMoF42k2ejkMmOK8t9AM_Hg1rs51kr1iHyki0h51s5mmtAmY1bM11OO07D9EZ_hmSr7EqYEvjWBiU" />
        </div>
      </header>
      <main className="max-w-7xl mx-auto pt-24 px-8 pb-12 transition-all duration-500">
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-headline font-semibold tracking-tight text-slate-800">Department Status</h2>
            <div className="flex gap-2">
              <div className="h-1.5 w-12 bg-[#EC9A04] rounded-full"></div>
              <div className="h-1.5 w-4 bg-slate-200 rounded-full"></div>
              <div className="h-1.5 w-4 bg-slate-200 rounded-full"></div>
            </div>
          </div>

          <div className="orbit-scene" id="orbitScene" ref={orbitRef}>
            <div className="orbit-ring"></div>
            <div className="orbit-center">
              <span className="material-symbols-outlined text-[#EC9A04] text-3xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>local_hospital</span>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#b87333] leading-tight text-center px-2">Aether</p>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#b87333] leading-tight text-center px-2">Healthcare</p>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse mt-2"></span>
            </div>
            {departmentItems.map((item, index) => (
              <div key={item.label} className={`dept-bubble ${item.color}`} data-index={index}>
                <div className={`icon-circle ${item.iconBg} shadow-sm`}>
                  <span className="material-symbols-outlined text-white text-base" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </div>
                <p className="text-[8px] font-bold uppercase tracking-tighter text-amber-800">{item.label}</p>
                <p className="text-sm font-bold font-headline text-amber-900">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="glass-panel rounded-2xl p-8">
              <h3 className="text-lg font-headline font-semibold mb-6 flex items-center justify-between text-slate-800">
                Bed Occupancy
                <span className="material-symbols-outlined text-slate-400">more_horiz</span>
              </h3>
              <div className="relative w-48 h-48 mx-auto mb-8">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="stroke-white/40 fill-none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeWidth="3"></path>
                  <path className="stroke-[#EC9A04] fill-none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="3"></path>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-4xl font-bold font-headline text-slate-800">187</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">/ 250 Beds</p>
                </div>
              </div>
              <div className="bg-white/30 rounded-xl p-4 flex items-start gap-3 border border-white/40">
                <span className="material-symbols-outlined text-[#EC9A04] text-xl">auto_awesome</span>
                <div>
                  <p className="text-xs font-bold text-[#EC9A04]">AI Prediction</p>
                  <p className="text-sm text-slate-700 font-medium">12 Discharges in next 4h</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-error hover:bg-red-600 shadow-lg shadow-red-200 transition-all py-6 rounded-2xl flex items-center justify-center gap-4 group text-white">
                <span className="material-symbols-outlined text-3xl group-hover:scale-125 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                <div className="text-left">
                  <p className="text-lg font-bold font-headline leading-tight">ACTIVATE CODE BLUE</p>
                  <p className="text-xs text-white/80 font-medium">Critical Emergency Protocol</p>
                </div>
              </button>
              <button className="w-full glass-panel hover:bg-[#FFDDB6]/80 transition-all py-5 rounded-2xl flex items-center justify-center gap-4 border border-white/50">
                <span className="material-symbols-outlined text-[#EC9A04]">description</span>
                <span className="text-sm font-bold uppercase tracking-widest text-slate-700">Generate Shift Report</span>
              </button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-panel rounded-2xl overflow-hidden">
                <div className="p-6 bg-white/40 border-b border-white/40 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-error">local_shipping</span>
                    <span className="font-headline font-semibold text-slate-800">Ambulance Tracker</span>
                  </div>
                  <span className="text-[10px] font-bold text-error bg-error/10 px-2 py-1 rounded">LIVE</span>
                </div>
                <div className="h-40 bg-slate-100 flex items-center justify-center relative">
                  <img alt="City Map" className="w-full h-full object-cover opacity-60 contrast-75" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAgPZf7VzepevdSX2FBKqHpOmYZ8Grm43JIvgkkMAJkhOD3VQWxw20z3QL89oCAi5kHq-sg7aHKgKDm0VfoBD5PaPhKPGqBnkbnF2v5Y4fJW5dbV2oyjE0oo7F4h7ER-FgAI20TXe0Jr-UAQtJJ_BABl4cb_wao1dBQY6gGwTuDeLkavtknwrsOTh35ckIucNYIXVvxBJRgmRUUtpedqpAfTUFH11ePnkJvfBcf_Pk1YGr54bQ2MaRG_fenYBVO0JMQHg5ffzwKoE"/>
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl border border-white/50 shadow-xl w-full">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                          <span className="material-symbols-outlined text-error text-xl">ecg</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">Cardiac Arrest</p>
                          <p className="text-[10px] font-semibold text-slate-500">Route: OT Silver</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="text-2xl font-bold text-error">ETA 6 min</p>
                        <button className="text-[10px] font-bold uppercase tracking-widest text-[#EC9A04] border border-[#EC9A04]/30 px-2 py-1 rounded hover:bg-[#EC9A04]/5">Manual Override</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline font-semibold text-slate-800">Utilization Flux</h3>
                  <button className="text-[10px] font-bold uppercase tracking-widest bg-white/40 hover:bg-white/60 px-3 py-1.5 rounded-full transition-colors text-slate-600">Simulate Low</button>
                </div>
                <div className="h-32 flex items-end gap-1 px-2">
                  <div className="flex-1 flex flex-col justify-end gap-0.5"><div className="w-full bg-blue-500/50 rounded-t-sm h-[60%]"></div><div className="w-full bg-teal-500/50 rounded-b-sm h-[40%]"></div></div>
                  <div className="flex-1 flex flex-col justify-end gap-0.5"><div className="w-full bg-blue-500/50 rounded-t-sm h-[75%]"></div><div className="w-full bg-teal-500/50 rounded-b-sm h-[35%]"></div></div>
                  <div className="flex-1 flex flex-col justify-end gap-0.5"><div className="w-full bg-blue-500/50 rounded-t-sm h-[55%]"></div><div className="w-full bg-teal-500/50 rounded-b-sm h-[80%]"></div></div>
                  <div className="flex-1 flex flex-col justify-end gap-0.5"><div className="w-full bg-blue-500/50 rounded-t-sm h-[90%]"></div><div className="w-full bg-teal-500/50 rounded-b-sm h-[20%]"></div></div>
                  <div className="flex-1 flex flex-col justify-end gap-0.5"><div className="w-full bg-blue-500/50 rounded-t-sm h-[40%]"></div><div className="w-full bg-teal-500/50 rounded-b-sm h-[65%]"></div></div>
                  <div className="flex-1 flex flex-col justify-end gap-0.5"><div className="w-full bg-blue-500/50 rounded-t-sm h-[65%]"></div><div className="w-full bg-teal-500/50 rounded-b-sm h-[50%]"></div></div>
                </div>
                <div className="mt-4 flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500/50"></span> Energy</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal-500/50"></span> Occupancy</div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden">
              <div className="p-6 bg-white/40 border-b border-white/40 flex items-center justify-between">
                <h3 className="font-headline font-semibold flex items-center gap-2 text-slate-800">
                  <span className="material-symbols-outlined text-[#EC9A04]">analytics</span>
                  AI Activity Log
                </h3>
                <span className="material-symbols-outlined text-slate-400">filter_list</span>
              </div>
              <div className="h-64 overflow-y-auto scrolling-feed-mask p-6 space-y-4">
                <div className="flex gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-[#EC9A04]/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-sm text-[#EC9A04]">emergency</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-700 font-medium"><span className="text-[#EC9A04] font-bold">Triage Agent</span> prioritized 3 high-acuity admissions in General Ward.</p>
                    <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tighter">09:42:12 • Verified by Node-01</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-sm text-teal-600">bed</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-700 font-medium"><span className="text-teal-600 font-bold">Bed Flow</span> re-routed OT Silver prep to Room 402 for pre-op staging.</p>
                    <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tighter">09:38:55 • Auto-optimized</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/40 flex justify-between items-center bg-white/40">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-purple-600">lock</span>
                <h3 className="font-headline font-semibold text-slate-800">Blockchain Trust Ledger</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-purple-700">34 Active Consents</span>
                <span className="bg-error/10 text-error text-[10px] px-2 py-0.5 rounded-full font-bold">2 Expiring</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/20 text-slate-500 font-label text-[10px] uppercase tracking-widest border-b border-white/40">
                  <tr>
                    <th className="px-6 py-3 font-bold">Timestamp</th>
                    <th className="px-6 py-3 font-bold">Action</th>
                    <th className="px-6 py-3 font-bold">Patient ID</th>
                    <th className="px-6 py-3 font-bold">Hash</th>
                    <th className="px-6 py-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-[10px] text-slate-600">09:30:45</td>
                    <td className="px-6 py-4 font-bold text-slate-700">Consent Sign</td>
                    <td className="px-6 py-4 text-slate-600 font-semibold">P-88219</td>
                    <td className="px-6 py-4 font-mono text-[10px] text-[#EC9A04]">0x7a2b...f91</td>
                    <td className="px-6 py-4"><button className="text-[10px] font-bold text-teal-700 uppercase hover:underline">Verify</button></td>
                  </tr>
                  <tr className="hover:bg-white/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-[10px] text-slate-600">09:28:12</td>
                    <td className="px-6 py-4 font-bold text-slate-700">Data Access</td>
                    <td className="px-6 py-4 text-slate-600 font-semibold">P-12044</td>
                    <td className="px-6 py-4 font-mono text-[10px] text-[#EC9A04]">0x1f92...c02</td>
                    <td className="px-6 py-4"><button className="text-[10px] font-bold text-teal-700 uppercase hover:underline">Verify</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="font-headline font-semibold flex items-center gap-2 mb-1 text-slate-800">
                  <span className="material-symbols-outlined text-green-700">energy_savings_leaf</span>
                  Sustainability Dashboard
                </h3>
                <p className="text-xs text-slate-500 font-medium">Real-time carbon footprint optimization</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold font-headline text-green-700">245kW</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Current / 380kW Cap</p>
              </div>
            </div>
            <div className="w-full bg-white/30 h-3 rounded-full overflow-hidden mb-8 shadow-inner">
              <div className="bg-green-600 h-full w-[64%] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30 animate-pulse"></div>
              </div>
            </div>
            <div className="bg-green-600/10 p-5 rounded-2xl border border-green-600/20 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-125 transition-transform duration-500 pointer-events-none">
                <span className="material-symbols-outlined text-8xl text-green-700">lightbulb_circle</span>
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-green-700">psychology</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-green-800 mb-1">AI Recommendation</p>
                  <p className="text-sm font-semibold text-slate-700">Shift MRI scans to 3AM to utilize peak efficiency windows.</p>
                  <button className="mt-3 bg-green-700/20 hover:bg-green-700/30 text-green-800 text-[10px] font-bold py-1.5 px-4 rounded-full transition-colors border border-green-600/30">Implement Strategy</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <button className="fixed bottom-8 right-8 w-16 h-16 bg-[#EC9A04] text-white rounded-2xl shadow-xl shadow-[#EC9A04]/30 flex items-center justify-center group hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
      </button>
    </>
  );
}

export default HospitalDashboard;
