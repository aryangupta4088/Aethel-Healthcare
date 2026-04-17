import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const patients = [
  {
    name: "Mrs. Sharma",
    age: 78,
    room: "4A",
    risk: 85,
    riskLevel: "HIGH RISK",
    riskColor: "#e53e3e",
    borderColor: "#e53e3e",
    factors: ["Age >70", "Diuretic use", "Gait instability"],
  },
  {
    name: "Ms. Jordon",
    age: 62,
    room: "18C",
    risk: 42,
    riskLevel: "MEDIUM RISK",
    riskColor: "#dd6b20",
    borderColor: "#dd6b20",
    factors: ["Post-Op Recovery", "Hypotension"],
  },
  {
    name: "Mr. Gupta",
    age: 45,
    room: "22A",
    risk: 15,
    riskLevel: "LOW RISK",
    riskColor: "#38a169",
    borderColor: "#38a169",
    factors: ["None Detected"],
  },
];

const tasks = [
  {
    id: 1,
    patient: "Mrs. Sharma (Room 4A)",
    desc: "Fall risk assessment due",
    priority: "High",
    priorityColor: "#e53e3e",
    done: false,
  },
  {
    id: 2,
    patient: "Mr. Chen (Room 12B)",
    desc: "Scheduled insulin administration",
    priority: "Medium",
    priorityColor: "#dd6b20",
    done: false,
  },
  {
    id: 3,
    patient: "Bed 7 Routine Check",
    desc: "Replace IV fluid bag",
    priority: "Low",
    priorityColor: "#3182ce",
    done: false,
  },
];

const navItems = [
  { icon: "⊞", label: "Dashboard", active: true },
  { icon: "📈", label: "Vitals" },
  { icon: "📋", label: "Tasks" },
  { icon: "🎙", label: "Voice Logs" },
  { icon: "📊", label: "Health Trends" },
];

export default function EtherealClinician({ onBack }) {
  const [taskList, setTaskList] = useState(tasks);
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("Awaiting clinician input...");
  const [time, setTime] = useState("03:42 AM");
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTask = (id) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const remaining = taskList.filter((t) => !t.done).length;

  const handleMic = () => {
    setRecording((r) => !r);
    if (!recording) {
      setTranscript("Listening...");
      setTimeout(() => {
        setTranscript("AI: Voice command received. Processing...");
        setRecording(false);
      }, 2000);
    } else {
      setTranscript("Awaiting clinician input...");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', sans-serif", background: "#f0f4f8", color: "#1a202c", overflow: "hidden" }}>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 40 }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        position: "fixed", top: 0, left: 0, height: "100vh", width: 220,
        background: "#fff", display: "flex", flexDirection: "column",
        borderRight: "1px solid #e2e8f0", padding: "0 0 24px 0",
        zIndex: 50,
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.25s ease",
        boxShadow: sidebarOpen ? "4px 0 24px rgba(0,0,0,0.12)" : "none",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#2b6cb0", letterSpacing: "-0.5px" }}>Ethereal Clinician</div>
          <div onClick={() => setSidebarOpen(false)} style={{ cursor: "pointer", color: "#718096", fontSize: 18, lineHeight: 1 }}>✕</div>
        </div>

        {/* Profile */}
        <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#667eea,#764ba2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>N</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>Nurse Station Alpha</div>
            <div style={{ fontSize: 11, color: "#718096" }}>Ward 4B · Night Shift</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 0" }}>
          {navItems.map((item) => (
            <div
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 20px", cursor: "pointer", borderRadius: "0 8px 8px 0",
                marginRight: 12,
                background: activeNav === item.label ? "#ebf4ff" : "transparent",
                color: activeNav === item.label ? "#2b6cb0" : "#4a5568",
                fontWeight: activeNav === item.label ? 600 : 400,
                fontSize: 14,
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        {/* Critical Alert */}
        <div style={{ margin: "0 16px" }}>
          <button style={{ width: "100%", padding: "12px", background: "#2b6cb0", color: "#fff", border: "none", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            Critical Alert
          </button>
        </div>

        {/* Bottom */}
        <div style={{ padding: "16px 20px 0", borderTop: "1px solid #e2e8f0", marginTop: 16 }}>
          {["Settings", "Support"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", cursor: "pointer", color: "#718096", fontSize: 13 }}>
              <span>{item === "Settings" ? "⚙" : "?"}</span> {item}
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", width: "100%" }}>
        {/* Top Nav */}
        <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {onBack && (
              <button
                onClick={onBack}
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "#2b6cb0", fontSize: 20, padding: "4px 8px" }}
                title="Back to Dashboard"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div
              onClick={() => setSidebarOpen(true)}
              style={{ fontWeight: 800, fontSize: 15, color: "#2b6cb0", letterSpacing: "-0.5px", cursor: "pointer", userSelect: "none" }}
            >
              Ethereal Clinician
            </div>
            <div style={{ width: 1, height: 20, background: "#e2e8f0" }} />
            {["Ward View", "Patients", "Schedules"].map((tab) => (
              <div key={tab} style={{ padding: "0 4px 4px", fontSize: 14, fontWeight: tab === "Ward View" ? 600 : 400, color: tab === "Ward View" ? "#2b6cb0" : "#718096", borderBottom: tab === "Ward View" ? "2px solid #2b6cb0" : "2px solid transparent", cursor: "pointer" }}>
                {tab}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#f0fff4", border: "1px solid #9ae6b4", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600, color: "#276749" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#48bb78", display: "inline-block" }}></span>
              AI Monitoring Active
            </div>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <span style={{ fontSize: 20 }}>🔔</span>
              <span style={{ position: "absolute", top: -4, right: -4, background: "#e53e3e", color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>3</span>
            </div>
            <span style={{ fontSize: 20, color: "#e53e3e", cursor: "pointer" }}>✚</span>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{time}</div>
              <div style={{ fontSize: 10, color: "#718096" }}>Night Shift</div>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#2b6cb0", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, cursor: "pointer" }}>👤</div>
          </div>
        </header>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {/* Page Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>
                🏥 Nurse Station <span style={{ color: "#2b6cb0" }}>(Blue Zone)</span>
              </h1>
              <div style={{ fontSize: 13, color: "#718096", marginTop: 4 }}>🤖 AI Agent: Nurse Assistant Active</div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #bee3f8", borderRadius: 10, padding: "12px 20px", textAlign: "right" }}>
              <div style={{ fontSize: 13, color: "#2b6cb0", fontWeight: 700 }}>Ward Occupancy: 94%</div>
              <div style={{ fontSize: 11, color: "#718096", marginTop: 2 }}>UPDATED JUST NOW</div>
            </div>
          </div>

          {/* Two column layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 20 }}>
            {/* LEFT COLUMN */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Voice Assistant */}
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>🎙 Voice Assistant</div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#38a169", background: "#f0fff4", border: "1px solid #9ae6b4", borderRadius: 20, padding: "2px 10px" }}>ONLINE</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                  <div
                    onClick={handleMic}
                    style={{
                      width: 90, height: 90, borderRadius: "50%",
                      background: recording ? "linear-gradient(135deg,#e53e3e,#c53030)" : "linear-gradient(135deg,#2b6cb0,#2c5282)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", boxShadow: recording ? "0 0 0 12px rgba(229,62,62,0.15)" : "0 0 0 12px rgba(43,108,176,0.15)",
                      transition: "all 0.2s",
                    }}
                  >
                    <span style={{ fontSize: 32 }}>🎤</span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Click mic and speak</div>
                    <div style={{ fontSize: 12, color: "#718096", marginTop: 4 }}>Try: "I need a wheelchair for bed 2"</div>
                  </div>
                </div>
                <div style={{ background: "#f7fafc", borderRadius: 10, padding: "12px 16px", marginTop: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#718096", letterSpacing: 1, marginBottom: 4 }}>LIVE TRANSCRIPTION</div>
                  <div style={{ fontSize: 13, color: "#4a5568" }}>
                    <span style={{ color: "#2b6cb0", fontWeight: 600 }}>AI:</span> {transcript}
                  </div>
                </div>
              </div>

              {/* Priority Tasks */}
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>✅ Priority Tasks</div>
                  <span style={{ fontSize: 12, color: "#718096" }}>{remaining} Remaining</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {taskList.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      style={{
                        border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 14px",
                        display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer",
                        opacity: task.done ? 0.5 : 1, transition: "opacity 0.2s",
                        background: task.done ? "#f7fafc" : "#fff",
                      }}
                    >
                      <div style={{
                        width: 18, height: 18, borderRadius: 4, border: "2px solid #cbd5e0",
                        flexShrink: 0, marginTop: 2,
                        background: task.done ? "#2b6cb0" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {task.done && <span style={{ color: "#fff", fontSize: 11 }}>✓</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontWeight: 600, fontSize: 13, textDecoration: task.done ? "line-through" : "none" }}>{task.patient}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: task.priorityColor, borderRadius: 20, padding: "2px 10px" }}>{task.priority}</span>
                        </div>
                        <div style={{ fontSize: 12, color: "#718096", marginTop: 3 }}>{task.desc}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
                          <span style={{ fontSize: 10, color: "#2b6cb0" }}>🔒</span>
                          <span style={{ fontSize: 10, fontWeight: 600, color: "#2b6cb0", letterSpacing: 0.5 }}>BLOCKCHAIN VERIFIED</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Fall Risk */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div style={{ marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>🛡</span>
                  <span style={{ fontWeight: 800, fontSize: 18 }}>AI-Powered Fall Risk Prediction</span>
                </div>
                <div style={{ fontSize: 12, color: "#718096", marginTop: 4 }}>Updated every 15 minutes via XGBoost model</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
                {patients.map((p) => (
                  <div
                    key={p.name}
                    style={{
                      border: `1.5px solid ${p.borderColor}`,
                      borderRadius: 12,
                      padding: "16px 18px",
                      background: p.riskColor === "#e53e3e" ? "#fff5f5" : p.riskColor === "#dd6b20" ? "#fffaf0" : "#f0fff4",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</span>
                        <span style={{ fontSize: 13, color: "#718096", marginLeft: 10 }}>{p.age}, Room {p.room}</span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 28, fontWeight: 800, color: p.riskColor }}>{p.risk}%</div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: p.riskColor, letterSpacing: 0.5 }}>{p.riskLevel}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 12 }}>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#718096", letterSpacing: 1, marginBottom: 6 }}>CONTRIBUTING FACTORS</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {p.factors.map((f) => (
                            <span key={f} style={{ fontSize: 11, background: "#edf2f7", color: "#4a5568", borderRadius: 20, padding: "3px 10px", fontWeight: 500 }}>{f}</span>
                          ))}
                        </div>
                      </div>
                      <button
                        style={{
                          display: "flex", alignItems: "center", gap: 6,
                          border: "1.5px solid #e2e8f0", background: "#fff",
                          borderRadius: 8, padding: "8px 16px", fontSize: 13,
                          fontWeight: 600, cursor: "pointer", color: "#2d3748",
                          whiteSpace: "nowrap", flexShrink: 0,
                        }}
                        onClick={() => alert(`Risk explanation for ${p.name}:\nRisk Score: ${p.risk}%\nFactors: ${p.factors.join(", ")}`)}
                      >
                        👁 Explain Risk
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}