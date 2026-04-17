import { useState } from "react";
import {
  AlertTriangle,
  Search,
  Zap,
  Bell,
  Settings,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Shield,
  Brain,
  AlertTriangle as WarningIcon,
} from "lucide-react";

export default function PharmacyCommandCenter() {
  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#231916]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#e7bdb2]">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-[#ad2b00]">Pharmacy Command Center</h1>
            <div className="h-6 w-px bg-[#e7bdb2]/30"></div>
            <nav className="hidden md:flex gap-6">
              <button
                onClick={() => setActiveTab("inventory")}
                className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${
                  activeTab === "inventory"
                    ? "text-[#ad2b00] border-[#ad2b00]"
                    : "text-stone-500 border-transparent hover:text-[#9c4321]"
                }`}
              >
                Inventory
              </button>
              <button className="text-sm font-semibold text-stone-500 hover:text-[#9c4321] transition-colors">
                Orders
              </button>
              <button className="text-sm font-semibold text-stone-500 hover:text-[#9c4321] transition-colors">
                Analytics
              </button>
              <button className="text-sm font-semibold text-stone-500 hover:text-[#9c4321] transition-colors">
                Compliance
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-[#fdeae3] px-4 py-2 rounded-full gap-2 text-xs font-bold text-[#ad2b00]">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute h-2 w-2 rounded-full bg-[#ad2b00] opacity-75"></span>
                <span className="relative h-2 w-2 rounded-full bg-[#ad2b00]"></span>
              </span>
              Pending Orders: 12 | Low Stock: 4 | Dispensed: 87
            </div>

            <button className="bg-[#ad2b00] hover:bg-[#d93900] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
              Dispense Now
            </button>

            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-[#f1dfd8] text-stone-600 transition-colors">
                <Bell size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-[#f1dfd8] text-stone-600 transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto space-y-6 pb-20">
        {/* Critical Alerts */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#e7bdb2] p-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-[#ad2b00]" size={24} />
            <h2 className="text-xl font-bold text-[#231916]">Critical Inventory Alerts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Atorvastatin 40mg",
                location: "Central Vault A-12",
                remaining: 12,
                percent: 12,
              },
              {
                name: "Morphine 10mg",
                location: "Controlled Safe B-08",
                remaining: 8,
                percent: 8,
              },
              {
                name: "Fentanyl Patch",
                location: "Security Lock C-03",
                remaining: 5,
                percent: 5,
              },
              {
                name: "Lorazepam 2mg",
                location: "High Value D-15",
                remaining: 15,
                percent: 15,
              },
              {
                name: "Metformin 1000mg",
                location: "Bin E-22",
                remaining: 25,
                percent: 25,
              },
              {
                name: "Omeprazole 20mg",
                location: "Shelf F-09",
                remaining: 20,
                percent: 20,
              },
            ].map((alert, idx) => (
              <div key={idx} className="p-4 bg-[#ffece5] rounded-xl border border-[#ff4400]/20">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-sm">{alert.name}</h3>
                    <p className="text-xs text-[#5d4038]">{alert.location}</p>
                  </div>
                  <span className="text-[#ad2b00] font-bold text-xs">{alert.remaining} remaining</span>
                </div>
                <div className="w-full bg-[#e7bdb2]/30 h-1.5 rounded-full overflow-hidden mb-4">
                  <div className="bg-[#ad2b00]" style={{ width: `${alert.percent * 3}%` }}></div>
                </div>
                <button className="w-full bg-[#ff4400] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#ad2b00] transition-colors">
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Verification Queue */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#e7bdb2] overflow-hidden">
          <div className="p-6 border-b border-[#e7bdb2] flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#231916]">Verification Queue</h2>
            <span className="bg-[#ad2b00]/10 text-[#ad2b00] text-xs px-3 py-1 rounded-full font-bold">14 PENDING</span>
          </div>

          <div className="p-6 space-y-4">
            {[
              {
                name: "Mrs. Sharma (OT Silver)",
                med: "Metoprolol 50mg IV",
                status: "STAT",
                color: "border-red-500",
              },
              {
                name: "Mr. Aris (Ward 4B)",
                med: "Amoxicillin 500mg Cap",
                status: "Routine",
                color: "border-[#005cad]",
              },
            ].map((item, idx) => (
              <div key={idx} className={`p-4 border-l-4 ${item.color} bg-[#fdeae3]/20 rounded-lg`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-sm text-[#231916]">{item.name}</p>
                    <p className="text-xs text-[#5d4038]">{item.med}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-1 rounded border ${
                    item.status === "STAT"
                      ? "border-red-500 text-red-600 bg-red-50"
                      : "border-[#005cad] text-[#005cad] bg-blue-50"
                  }`}>
                    {item.status}
                  </span>
                </div>
                <button className="w-full bg-[#ad2b00] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#d93900] transition-colors">
                  Verify & Dispense
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Current Inventory Table */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#e7bdb2] overflow-hidden">
          <div className="p-6 border-b border-[#e7bdb2]">
            <h2 className="text-xl font-bold text-[#231916] mb-4">Current Inventory</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-stone-400" size={18} />
                <input
                  type="text"
                  placeholder="Search medication..."
                  className="w-full pl-10 pr-4 py-2 bg-[#fff1ec] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#ad2b00]"
                />
              </div>
              <select className="bg-[#fff1ec] border-none rounded-lg text-xs font-bold text-[#231916] px-4 py-2">
                <option>All Classes</option>
                <option>Cardiac</option>
                <option>Antibiotics</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#fff1ec] border-b border-[#e7bdb2]">
                <tr className="text-[10px] uppercase tracking-widest text-[#5d4038] font-bold">
                  <th className="py-3 px-6">Medication</th>
                  <th className="py-3 px-6">Stock Level</th>
                  <th className="py-3 px-6">Location</th>
                  <th className="py-3 px-6">Expiry</th>
                  <th className="py-3 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Lisinopril 10mg",
                    stock: "450 units",
                    location: "Bin B-04",
                    expiry: "10/2025",
                    status: "STABLE",
                    color: "bg-green-50",
                  },
                  {
                    name: "Warfarin 5mg",
                    stock: "45 units",
                    location: "Safe 1-A",
                    expiry: "05/2024",
                    status: "LOW",
                    color: "bg-[#ffece5]",
                  },
                  {
                    name: "Insulin Aspart",
                    stock: "120 vials",
                    location: "Fridge 2",
                    expiry: "12/2024",
                    status: "STABLE",
                    color: "bg-green-50",
                  },
                  {
                    name: "Ciprofloxacin 500mg",
                    stock: "890 units",
                    location: "Bin C-12",
                    expiry: "03/2026",
                    status: "STABLE",
                    color: "bg-green-50",
                  },
                ].map((item, idx) => (
                  <tr key={idx} className={`border-b border-[#e7bdb2]/30 hover:${item.color} transition-colors`}>
                    <td className="py-4 px-6 font-bold">{item.name}</td>
                    <td className="py-4 px-6">{item.stock}</td>
                    <td className="py-4 px-6 text-[#5d4038]">{item.location}</td>
                    <td className="py-4 px-6 text-[#5d4038]">{item.expiry}</td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${
                          item.status === "STABLE"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-[#ad2b00]/10 text-[#ad2b00]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* IV Room & Compounding */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#e7bdb2] overflow-hidden">
          <div className="p-6 bg-[#fff1ec] border-b border-[#e7bdb2] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Zap className="text-[#ad2b00]" size={24} />
              <h2 className="text-xl font-bold text-[#231916]">IV Room & Compounding</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-emerald-600">Aseptic Zone Green</span>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-[#231916]">STAT Dopamine Drip</span>
                  <span className="text-xs font-bold text-[#ad2b00]">75%</span>
                </div>
                <div className="w-full bg-[#e7bdb2]/30 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#ad2b00] w-3/4 h-full"></div>
                </div>
              </div>

              {[
                { name: "TPN for NICU Bay 4", status: "QUEUED", statusColor: "bg-[#ffdbcf]" },
                { name: "Chemo Prep - Cyclo", status: "STAGING", statusColor: "bg-[#fdeae3]" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-xs text-[#5d4038]">{item.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-[#fff1ec] rounded-xl p-4 border border-[#e7bdb2]">
              <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-3">Equipment Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium">Laminar Hood #1</span>
                  <span className="text-xs font-bold text-emerald-600">OPTIMAL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium">Repeater Pump #4</span>
                  <span className="text-xs font-bold text-[#ad2b00]">SERVICE REQ</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium">Cold Storage Z-1</span>
                  <span className="text-xs font-bold text-emerald-600">3.4°C</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Row: Blockchain, AI Agents, ADC Fleet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Blockchain Ledger */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#e7bdb2] overflow-hidden">
            <div className="p-4 bg-[#ad2b00]/5 border-b border-[#e7bdb2] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#ad2b00]" />
                <h3 className="text-xs font-bold uppercase tracking-tighter">Blockchain Ledger</h3>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {[
                { tx: "Tx: 0x82f...a1e", batch: "Fentanyl Batch #992" },
                { tx: "Tx: 0x44d...90c", batch: "OxyContin Batch #102" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg hover:bg-[#fff1ec] transition-colors cursor-pointer flex justify-between items-start"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-[#5d4038]">{item.tx}</span>
                    <span className="text-xs font-bold text-[#231916]">{item.batch}</span>
                  </div>
                  <CheckCircle size={14} className="text-emerald-600" />
                </div>
              ))}
            </div>
          </section>

          {/* AI Agents */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#e7bdb2] p-6">
            <h2 className="text-lg font-bold text-[#231916] mb-4">Pharmacy AI Agents</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ad2b00]/10 flex items-center justify-center shrink-0">
                  <Brain size={16} className="text-[#ad2b00]" />
                </div>
                <div>
                  <p className="text-xs font-bold mb-1">Decision Support</p>
                  <div className="p-2 bg-[#ffece5] rounded-lg border border-[#ff4400]/20">
                    <p className="text-[10px] leading-relaxed text-[#ad2b00]">
                      <span className="font-bold">WARNING:</span> Interaction detected. Warfarin + Aspirin co-administration increases bleeding risk.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ffdbcf] flex items-center justify-center shrink-0">
                  <TrendingUp size={16} className="text-[#9c4321]" />
                </div>
                <div>
                  <p className="text-xs font-bold mb-1">Inventory Prediction</p>
                  <p className="text-[10px] text-[#5d4038]">
                    Amoxicillin usage spike predicted (92% confidence). Adjusting par levels.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ADC Fleet Status */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#e7bdb2] p-6">
            <h2 className="text-lg font-bold text-[#231916] mb-4">ADC Fleet Status</h2>
            <div className="space-y-4">
              {[
                { name: "ICU Cabinet A", level: 92, color: "bg-emerald-500" },
                {
                  name: "ED Main Cabinet",
                  level: 78,
                  color: "bg-[#ad2b00]",
                  warning: "MORPHINE LOW STOCK",
                },
                { name: "OR Anesthesia Hub", level: 95, color: "bg-emerald-500" },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                      <span className="text-xs font-medium text-[#231916]">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-[#231916]">{item.level}%</span>
                  </div>
                  {item.warning && <p className="text-[10px] font-bold text-[#ad2b00] ml-5">{item.warning}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
