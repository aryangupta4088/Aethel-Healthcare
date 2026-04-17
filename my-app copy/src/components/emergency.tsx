import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  ChartColumn,
  FileText,
  HeartPulse,
  HelpCircle,
  History,
  Keyboard,
  Mic,
  Route,
  Settings,
  Shield,
  Stethoscope,
  Wifi,
  ArrowLeft,
} from "lucide-react";

type Severity = "Critical" | "Moderate" | "Stable";

const sideLinks = [
  { label: "Command Center", icon: Activity, active: true },
  { label: "Patient Queue", icon: AlertTriangle },
  { label: "Routing AI", icon: Route },
  { label: "Resource Logs", icon: FileText },
  { label: "Analytics", icon: ChartColumn },
];

const routeOptions = [
  { name: "OT Silver Cardiology", status: "Primary", dot: "bg-slate-400", text: "text-[#bc000c]" },
  { name: "Lab Violet", status: "Standby", dot: "bg-violet-400", text: "text-[#785256]" },
  { name: "Nursing Blue", status: "Prep", dot: "bg-blue-400", text: "text-blue-600" },
  { name: "OPD Green", status: "NOT Alerted", dot: "bg-green-300", text: "text-slate-300", muted: true },
];

export default function Emergency({ onBack }: { onBack?: () => void }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [severity, setSeverity] = useState<Severity>("Critical");

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-['Manrope'] text-[#1a1c1c] antialiased">
      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-[#f9f9f9]/80 px-8 shadow-[0_8px_32px_rgba(26,28,28,0.06)] backdrop-blur-xl">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft size={20} className="text-red-600" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsPanelOpen((prev) => !prev)}
            className="text-xl font-extrabold tracking-tighter text-red-600 uppercase"
          >
            Clinical Pulse
          </button>
          <div className="h-4 w-px bg-[#e2e2e2]" />
          <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-green-700">
              Connected to Hospital Brain
            </span>
          </div>
        </div>

        <nav className="hidden gap-8 md:flex">
          <a href="#" className="border-b-2 border-red-600 pb-1 font-semibold tracking-tight text-red-600">
            Dashboard
          </a>
          <a href="#" className="font-medium tracking-tight text-slate-500 transition-colors hover:text-red-500">
            Active Runs
          </a>
          <a href="#" className="font-medium tracking-tight text-slate-500 transition-colors hover:text-red-500">
            Fleet
          </a>
          <a href="#" className="font-medium tracking-tight text-slate-500 transition-colors hover:text-red-500">
            Dispatch
          </a>
        </nav>

        <div className="flex items-center gap-6">
          <Wifi className="h-5 w-5 cursor-pointer text-[#603e3a] transition-colors hover:text-[#bc000c]" />
          <Bell className="h-5 w-5 cursor-pointer text-[#603e3a] transition-colors hover:text-[#bc000c]" />
          <Settings className="h-5 w-5 cursor-pointer text-[#603e3a] transition-colors hover:text-[#bc000c]" />
          <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-[#ffdad5] bg-[#e8e8e8]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMDCjuECAEGKKuOergPjbjgpqU97lRjgy_djnKA6yJBgyEqTw4Ie9z0l3wcCaZ92Pzig4iaJ6hVcUME9FOcSAUPn4qtC9a_hX3ptSClaNwZqAydirZKPTNuqZ7BMYYkAqbwApB1TMLTbcb5Cg7hn_UFOmRUCD7tlJ8uupK02L8JrasWTf7r8zz_eI3hCmvTspjEk_FBi-O-EdUNkhE1yz6WPmYbd0044ubVQmI194nSK2J6vpwcDBvDVoNPeBvP2cDGn-loZghzwo"
              alt="Chief medical officer"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>

      {isPanelOpen && (
        <button
          type="button"
          aria-label="Close side panel"
          onClick={() => setIsPanelOpen(false)}
          className="fixed inset-0 top-16 z-30 bg-black/15"
        />
      )}

      <aside
        className={`fixed left-0 top-16 z-40 hidden h-[calc(100vh-64px)] w-64 flex-col bg-[#f3f3f3] p-4 transition-transform duration-300 md:flex ${
          isPanelOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 rounded-xl border border-[#ebbbb5]/20 bg-white/80 px-4 py-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffdad5]">
              <Stethoscope className="h-5 w-5 text-[#bc000c]" />
            </div>
            <div>
              <h4 className="text-xs font-black tracking-widest uppercase">Unit 7-Alpha</h4>
              <p className="text-[10px] font-bold tracking-wide text-[#bc000c] uppercase">High Priority Station</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {sideLinks.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-4 rounded-lg px-4 py-3 transition-all ${
                item.active ? "bg-white/80 text-red-600 shadow-sm" : "text-slate-600 hover:bg-red-50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-semibold tracking-widest uppercase">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto space-y-1">
          <a href="#" className="flex items-center gap-4 px-4 py-3 text-slate-600 transition-all hover:bg-red-50">
            <HeartPulse className="h-4 w-4" />
            <span className="text-[10px] font-black tracking-widest uppercase">System Health</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-4 py-3 text-slate-600 transition-all hover:bg-red-50">
            <HelpCircle className="h-4 w-4" />
            <span className="text-[10px] font-black tracking-widest uppercase">Help</span>
          </a>
          <button className="mt-4 w-full rounded-lg bg-[#bc000c] py-3 text-xs font-black tracking-widest text-white uppercase shadow-lg transition-colors hover:bg-[#ea0012]">
            Initiate Emergency
          </button>
        </div>
      </aside>

      <main className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Ambulance Command Portal</h1>
          <p className="mt-2 text-lg font-medium text-[#603e3a] opacity-80">AI-Powered Voice and Manual Dispatch Routing System</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <section className="glass-panel ghost-border relative overflow-hidden rounded-xl p-8 lg:col-span-12">
              <div className="absolute top-0 right-0 p-4">
                <span className="rounded-full bg-[#ffdad5] px-3 py-1 text-xs font-black tracking-widest text-[#930007] uppercase">
                  AI Confidence: 94%
                </span>
              </div>
              <div className="flex flex-col items-center gap-10 md:flex-row">
                <div className="flex flex-col items-center">
                  <button className="pulsing-red flex h-24 w-24 items-center justify-center rounded-full bg-[#ea0012] text-white active:scale-95">
                    <Mic className="h-10 w-10" />
                  </button>
                  <span className="mt-4 text-sm font-bold tracking-widest text-[#bc000c] uppercase">Listening...</span>
                </div>

                <div className="w-full flex-1">
                  <div className="min-h-30 rounded-lg border-l-4 border-[#bc000c] bg-[#f3f3f3] p-6">
                    <p className="text-xl font-medium leading-relaxed">
                      "Male, 45, severe chest pain, radiating to left arm, BP dropping. ETA 8 minutes."
                    </p>
                    <div className="mt-4 flex gap-2">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#bc000c]" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#bc000c] [animation-delay:150ms]" />
                    </div>
                  </div>
                </div>
              </div>
          </section>

          <div className="space-y-8 lg:col-span-8">
            <section className="glass-panel ghost-border rounded-xl p-8">
              <div className="mb-6 flex items-center gap-2">
                <Keyboard className="h-5 w-5 text-[#603e3a]" />
                <h2 className="text-xl font-bold tracking-tight uppercase">Manual Entry</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <label className="block text-xs font-bold tracking-widest text-[#603e3a] uppercase">Patient Condition</label>
                  <input
                    className="h-12 w-full rounded-lg border-none bg-[#e2e2e2] px-3 placeholder:text-[#956d68] focus:ring-2 focus:ring-[#bc000c]/20"
                    placeholder="e.g. Chest Pain, Respiratory Distress"
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-xs font-bold tracking-widest text-[#603e3a] uppercase">ETA (Minutes)</label>
                  <input
                    className="h-12 w-full rounded-lg border-none bg-[#e2e2e2] px-3 focus:ring-2 focus:ring-[#bc000c]/20"
                    placeholder="8"
                    type="number"
                  />
                </div>

                <div className="space-y-4 md:col-span-2">
                  <label className="block text-xs font-bold tracking-widest text-[#603e3a] uppercase">Severity Level</label>
                  <div className="flex gap-1 rounded-lg bg-[#e2e2e2] p-1">
                    {(["Critical", "Moderate", "Stable"] as Severity[]).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSeverity(option)}
                        className={`flex-1 rounded-md py-3 text-sm font-bold tracking-wider uppercase ${
                          severity === option ? "bg-[#bc000c] text-white" : "text-[#603e3a] hover:bg-[#dadada]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 md:col-span-2">
                  <label className="block text-xs font-bold tracking-widest text-[#603e3a] uppercase">Additional Dispatch Notes</label>
                  <textarea
                    rows={3}
                    className="w-full rounded-lg border-none bg-[#e2e2e2] p-3 placeholder:text-[#956d68] focus:ring-2 focus:ring-[#bc000c]/20"
                    placeholder="Identify previous cardiac history..."
                  />
                </div>
              </div>
            </section>

            <section className="glass-panel ghost-border overflow-hidden rounded-xl">
              <div className="flex items-center justify-between border-b border-[#ebbbb5]/20 bg-[#f3f3f3] p-6">
                <h2 className="text-sm font-black tracking-widest text-[#603e3a] uppercase">Live Alert Feed</h2>
                <History className="h-5 w-5 text-[#bc000c]" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black tracking-tight text-[#956d68] uppercase">
                      <th className="px-6 py-4">Incident Type</th>
                      <th className="px-6 py-4">Unit</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8e8e8]">
                    <tr className="transition-colors hover:bg-[#ffdad5]/30">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-[#bc000c]" />
                          <span className="font-bold">Cardiac Arrest</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">Unit 7-Alpha</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-[#fdabab] px-3 py-1 text-xs font-bold text-[#793d3e]">En Route</span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-[#603e3a]">14:02:11</td>
                    </tr>
                    <tr className="transition-colors hover:bg-[#ffdad5]/30">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-[#785256]" />
                          <span className="font-bold">Trauma Level II</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">Unit 4-Bravo</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-[#e2e2e2] px-3 py-1 text-xs font-bold text-[#603e3a]">Arrived</span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-[#603e3a]">13:45:02</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="glass-panel ghost-border rounded-xl border-l-8 border-[#bc000c] p-6">
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h3 className="mb-1 text-xs font-black tracking-widest text-[#bc000c] uppercase">Diagnosis Preview</h3>
                  <h2 className="text-2xl font-extrabold tracking-tight">Cardiac Arrest (Suspected)</h2>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black tracking-tighter text-[#bc000c]">08:00</span>
                  <p className="text-[10px] font-black tracking-widest text-[#603e3a] uppercase">Countdown</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black tracking-widest text-[#603e3a] uppercase">Recommended Routing</h4>
                <div className="space-y-3">
                  {routeOptions.map((route) => (
                    <div
                      key={route.name}
                      className={`flex items-center justify-between rounded-lg bg-white p-3 ${route.muted ? "opacity-40" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-3 w-3 rounded-full ${route.dot}`} />
                        <span className="text-sm font-bold">{route.name}</span>
                      </div>
                      <span className={`text-[10px] font-black uppercase ${route.text}`}>{route.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="flex h-20 w-full items-center justify-center gap-4 rounded-xl bg-linear-to-r from-[#ea0012] to-[#bc000c] text-white shadow-[0_12px_40px_-12px_rgba(188,0,12,0.5)] transition-all hover:shadow-[0_16px_48px_-10px_rgba(188,0,12,0.6)] active:scale-[0.98]">
              <AlertTriangle className="h-8 w-8" />
              <span className="text-xl font-black tracking-widest uppercase">Send Emergency Alert</span>
            </button>

            <div className="px-2">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-tight text-[#603e3a]/70 uppercase">
                <Shield className="h-3 w-3" />
                <span>Tx Hash: 0x82f...e421 - Secure Hospital Brain Ledger</span>
              </div>
            </div>

            <div className="glass-panel ghost-border group relative h-64 overflow-hidden rounded-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2AKfKVl4Ms7zWJjBYn4ow7siMpB0_XSroqXxcq3qjlTjdrNDQ4tpuDVUMkb8I35t5a4t05cNvr2qXWbW7kcGmf9BPSTC1q-q-sKIdzC9RFX-2_O0tGaKJIwlrP1Y-2TW64cuSRGVDUJ1rDzIOkTr0F42-1pRWWhI2ptrE-6OV49sfmWIEker-P4TCEuF7sk-Nnx6ssGSHCsl6oMhRv9ocRb7hoPjPnpiOEu0PFQ7ThbXc1IQgzJjpiwfaHPBbnDqUrT_xiyQj0-M"
                alt="Live dispatch map"
                className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 rounded bg-black/90 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                Live View - Unit 7-Alpha
              </div>
              <div className="absolute right-4 bottom-4 rounded-lg bg-[#bc000c] px-4 py-2 font-black tracking-tight text-white">ETA 07:42</div>
            </div>
          </aside>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
        .glass-panel {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .ghost-border {
          border: 1px solid rgba(235, 187, 181, 0.2);
        }
        .pulsing-red {
          box-shadow: 0 0 0 0 rgba(234, 0, 18, 0.4);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(234, 0, 18, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(234, 0, 18, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(234, 0, 18, 0); }
        }
      `}</style>
    </div>
  );
}