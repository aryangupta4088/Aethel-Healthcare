import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Stethoscope,
  Truck,
  Baby,
  Droplet,
  Package,
  Microscope,
  Scan,
  Users,
  Activity,
  Wrench,
  Sparkles,
  ChevronDown,
  HeartPulse,
} from "lucide-react";

const DEPARTMENTS = [
  { value: "admin",     label: "Admin",          color: "#f19e0e", bg: "#fff8e6", icon: Sparkles,    zone: "Zone A — Administration Wing" },
  { value: "ambulance", label: "Ambulance",       color: "#ff0015", bg: "#fff0f1", icon: Truck,       zone: "Bay 1 — Emergency Entrance" },
  { value: "surgery",   label: "OT / Surgery",    color: "#808080", bg: "#f4f4f4", icon: Activity,    zone: "Floor 3 — Surgical Suite" },
  { value: "nurse",     label: "Nursing",         color: "#2f92d0", bg: "#eaf5fd", icon: HeartPulse,  zone: "All Floors — Nursing Stations" },
  { value: "opd",       label: "General OPD",     color: "#55aa7b", bg: "#edf7f2", icon: Stethoscope, zone: "Ground Floor — OPD Block" },
  { value: "maternity", label: "Maternity",       color: "#d22d74", bg: "#fceef5", icon: Baby,        zone: "Floor 2 — Maternity Ward" },
  { value: "lab",       label: "Laboratory",      color: "#8c55aa", bg: "#f5eefa", icon: Microscope,  zone: "Basement — Diagnostic Lab" },
  { value: "radiology", label: "Radiology",       color: "#2bc6d4", bg: "#e8fafc", icon: Scan,        zone: "Floor 1 — Imaging Center" },
  { value: "pharmacy",  label: "Pharmacy",        color: "#ff4400", bg: "#fff2ee", icon: Package,     zone: "Ground Floor — Orange Zone" },
  { value: "patient",   label: "Patient Portal",  color: "#718e8c", bg: "#eff5f5", icon: Users,       zone: "Self-Service — All Zones" },
  { value: "cleaning",  label: "Cleaning",        color: "#9b9b9b", bg: "#f5f5f5", icon: Wrench,      zone: "All Floors — Housekeeping" },
  { value: "security",  label: "Security",        color: "#3a3a3a", bg: "#efefef", icon: Shield,      zone: "Ground Floor — Security Post" },
];

// Silhouette positions along a semicircle arc
const FIGURE_POSITIONS = [
  { x: 2,   height: 96, delay: 0.0 },
  { x: 8,   height: 108, delay: 0.3 },
  { x: 16,  height: 116, delay: 0.6 },
  { x: 25,  height: 122, delay: 0.9 },
  { x: 36,  height: 126, delay: 1.2 },
  { x: 50,  height: 130, delay: 0.0 },
  { x: 64,  height: 126, delay: 0.3 },
  { x: 75,  height: 122, delay: 0.6 },
  { x: 84,  height: 116, delay: 0.9 },
  { x: 92,  height: 108, delay: 1.2 },
  { x: 98,  height: 96,  delay: 1.5 },
];

function DoctorFigure({ dept, position, index }) {
  const [hovered, setHovered] = useState(false);
  const color = dept.color;
  const h = position.height;
  const w = h * 0.38;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        bottom: 0,
        left: `${position.x}%`,
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation: `floatFig 3.5s ease-in-out infinite`,
        animationDelay: `${position.delay}s`,
        cursor: "default",
        transition: "filter 0.3s",
        filter: hovered ? `drop-shadow(0 0 10px ${color}99)` : "none",
        zIndex: hovered ? 5 : 1,
      }}
    >
      {/* Glow ring on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: w + 20,
            height: h + 20,
            borderRadius: "50% 50% 0 0",
            background: `radial-gradient(ellipse at 50% 80%, ${color}22 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}
      {/* SVG Silhouette */}
      <svg
        width={w}
        height={h}
        viewBox="0 0 40 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Head */}
        <ellipse cx="20" cy="10" rx="8" ry="9" fill={`${color}33`} stroke={color} strokeWidth="1.2" />
        {/* Neck */}
        <rect x="17" y="18" width="6" height="5" rx="1" fill={`${color}33`} />
        {/* Body / coat */}
        <path
          d="M8 24 Q7 50 8 72 L16 72 L16 52 L24 52 L24 72 L32 72 Q33 50 32 24 Q26 20 20 20 Q14 20 8 24Z"
          fill={`${color}18`}
          stroke={color}
          strokeWidth="1"
        />
        {/* Accent stripe (department color) */}
        <rect x="18" y="24" width="4" height="28" rx="1" fill={color} opacity="0.6" />
        {/* Collar */}
        <path d="M15 24 L20 30 L25 24" fill="none" stroke={color} strokeWidth="1.2" />
        {/* Left arm */}
        <path d="M8 26 Q2 38 4 52 L8 52 Q9 40 10 28Z" fill={`${color}22`} stroke={color} strokeWidth="1" />
        {/* Right arm */}
        <path d="M32 26 Q38 38 36 52 L32 52 Q31 40 30 28Z" fill={`${color}22`} stroke={color} strokeWidth="1" />
        {/* Legs */}
        <rect x="10" y="72" width="8" height="34" rx="2" fill={`${color}25`} stroke={color} strokeWidth="1" />
        <rect x="22" y="72" width="8" height="34" rx="2" fill={`${color}25`} stroke={color} strokeWidth="1" />
        {/* Feet */}
        <ellipse cx="14" cy="107" rx="6" ry="3" fill={color} opacity="0.4" />
        <ellipse cx="26" cy="107" rx="6" ry="3" fill={color} opacity="0.4" />
        {/* Stethoscope for nurse/doctor roles */}
        {(index === 3 || index === 4) && (
          <path d="M15 30 Q12 40 14 46 Q17 50 20 48" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        )}
        {/* Cross badge for maternity */}
        {index === 5 && (
          <>
            <rect x="18" y="36" width="4" height="10" rx="1" fill={color} opacity="0.7" />
            <rect x="15" y="39" width="10" height="4" rx="1" fill={color} opacity="0.7" />
          </>
        )}
      </svg>
    </div>
  );
}

function FloatingParticle({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 6,
        height: 6,
        borderRadius: "50%",
        opacity: 0.18,
        ...style,
      }}
    />
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(DEPARTMENTS[0]);
  const [chaos, setChaos] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectRef = useRef(null);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/${selected.value}`);
    }, 600);
  };

  const handleSelectChange = (e) => {
    const dept = DEPARTMENTS.find((d) => d.value === e.target.value);
    setSelected(dept);
  };

  const IconComp = selected.icon;

  return (
    <>
      <style>{`
        @keyframes floatFig {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-7px); }
        }
        @keyframes driftHex {
          0% { transform: translate(0,0) rotate(0deg); }
          33% { transform: translate(18px, -22px) rotate(60deg); }
          66% { transform: translate(-12px, 14px) rotate(130deg); }
          100% { transform: translate(0,0) rotate(180deg); }
        }
        @keyframes driftHex2 {
          0% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(-20px, 16px) rotate(90deg); }
          100% { transform: translate(0,0) rotate(180deg); }
        }
        @keyframes pulseOrb {
          0%, 100% { opacity: 0.10; transform: scale(1); }
          50% { opacity: 0.18; transform: scale(1.08); }
        }
        @keyframes heartbeat {
          0%, 100% { stroke-dashoffset: 0; }
          50% { stroke-dashoffset: -40; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinChaos {
          from { transform: rotate(0deg) scale(1); }
          to   { transform: rotate(360deg) scale(1); }
        }
        .aether-select {
          appearance: none;
          -webkit-appearance: none;
          width: 100%;
          padding: 12px 44px 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          cursor: pointer;
          transition: border-color 0.25s, box-shadow 0.25s;
          background-color: white;
          outline: none;
        }
        .aether-select:focus {
          box-shadow: 0 0 0 3px var(--sel-color-alpha);
        }
        .login-btn {
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .figure-wrap:hover { filter: brightness(1.3); }
        .chaos { animation: spinChaos 0.4s linear infinite !important; }
      `}</style>

      {/* ── Page wrapper ── */}
      <div
        style={{
          minHeight: "100vh",
          background: chaos
            ? "linear-gradient(135deg,#fff0f0,#f0fff8,#f0f4ff,#fffbf0)"
            : "linear-gradient(135deg,#f0f6ff 0%,#f5f0ff 35%,#f0faf5 70%,#fff8f0 100%)",
          backgroundSize: "300% 300%",
          animation: chaos ? "driftHex 2s linear infinite" : "none",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 16px 0",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* ── Decorative SVG background ── */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
          viewBox="0 0 1000 700"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Soft orbs */}
          <circle cx="150" cy="200" r="180" fill="#2f92d0" opacity="0.07" style={{ animation: "pulseOrb 7s ease-in-out infinite" }} />
          <circle cx="850" cy="150" r="140" fill="#55aa7b" opacity="0.07" style={{ animation: "pulseOrb 9s ease-in-out infinite 2s" }} />
          <circle cx="500" cy="600" r="160" fill="#8c55aa" opacity="0.06" style={{ animation: "pulseOrb 8s ease-in-out infinite 1s" }} />
          <circle cx="900" cy="550" r="120" fill="#f19e0e" opacity="0.06" style={{ animation: "pulseOrb 6s ease-in-out infinite 3s" }} />
          {/* Floating hexagons */}
          {[
            { cx: 100, cy: 120, r: 28, color: "#2f92d0", anim: "driftHex 20s linear infinite" },
            { cx: 880, cy: 90, r: 22, color: "#55aa7b", anim: "driftHex2 24s linear infinite" },
            { cx: 60, cy: 520, r: 18, color: "#8c55aa", anim: "driftHex 28s linear infinite 4s" },
            { cx: 940, cy: 470, r: 24, color: "#2bc6d4", anim: "driftHex2 22s linear infinite 1s" },
            { cx: 220, cy: 620, r: 14, color: "#f19e0e", anim: "driftHex 32s linear infinite 7s" },
            { cx: 760, cy: 60, r: 16, color: "#d22d74", anim: "driftHex2 18s linear infinite 2s" },
          ].map((h, i) => (
            <polygon
              key={i}
              points={`${h.cx},${h.cy - h.r} ${h.cx + h.r * 0.866},${h.cy - h.r * 0.5} ${h.cx + h.r * 0.866},${h.cy + h.r * 0.5} ${h.cx},${h.cy + h.r} ${h.cx - h.r * 0.866},${h.cy + h.r * 0.5} ${h.cx - h.r * 0.866},${h.cy - h.r * 0.5}`}
              fill="none"
              stroke={h.color}
              strokeWidth="1.2"
              opacity="0.25"
              style={{ animation: h.anim }}
            />
          ))}
          {/* Subtle grid dots */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 14 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 75 + 12} cy={row * 90 + 12} r="1.5" fill="#94a3b8" opacity="0.12" />
            ))
          )}
        </svg>

        {/* ── Doctor silhouettes ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(820px, 95vw)",
            height: 200,
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          {DEPARTMENTS.map((dept, i) => (
            <DoctorFigure
              key={dept.value}
              dept={dept}
              position={FIGURE_POSITIONS[i]}
              index={i}
            />
          ))}
          {/* Ground shadow */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "10%",
              width: "80%",
              height: 16,
              background: "radial-gradient(ellipse at 50% 100%, rgba(100,120,160,0.18) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* ── Central glassmorphism panel ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: 440,
            background: "rgba(255,255,255,0.78)",
            border: "1px solid rgba(180,200,240,0.5)",
            borderRadius: 24,
            padding: "36px 36px 28px",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 8px 48px rgba(80,120,200,0.12), 0 1px 0 rgba(255,255,255,0.9) inset",
            animation: "fadeSlideUp 0.7s ease both",
            marginBottom: 180,
          }}
        >
          {/* Logo row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${selected.color}, ${selected.color}bb)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.3s",
                boxShadow: `0 4px 16px ${selected.color}44`,
              }}
            >
              <Shield size={22} color="white" strokeWidth={2} />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#1a2744", letterSpacing: -0.5 }}>AetherHealth</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#7090c0", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 24, paddingLeft: 56 }}>
            Intelligent Healthcare Ecosystem
          </div>

          {/* Heartbeat decoration */}
          <div style={{ marginBottom: 22, opacity: 0.55 }}>
            <svg width="100%" height="26" viewBox="0 0 380 26" preserveAspectRatio="none">
              <polyline
                points="0,13 70,13 85,3 95,23 107,3 118,23 130,13 380,13"
                fill="none"
                stroke={selected.color}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Role label */}
          <div style={{ fontSize: 11, color: "#8090b0", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>
            Select your role
          </div>

          {/* Dropdown */}
          <div style={{ position: "relative", marginBottom: 16 }}>
            <style>{`
              :root { --sel-color-alpha: ${selected.color}44; }
            `}</style>
            <select
              ref={selectRef}
              className="aether-select"
              value={selected.value}
              onChange={handleSelectChange}
              style={{
                border: `1.5px solid ${selected.color}66`,
                color: "#1a2744",
                "--sel-color-alpha": `${selected.color}44`,
              }}
            >
              {DEPARTMENTS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: selected.color }}>
              <ChevronDown size={16} strokeWidth={2.5} />
            </div>
          </div>

          {/* Department badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 22,
              padding: "10px 14px",
              background: selected.bg,
              borderRadius: 10,
              borderLeft: `3px solid ${selected.color}`,
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: `${selected.color}22`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <IconComp size={14} color={selected.color} strokeWidth={2} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: selected.color }}>{selected.label}</div>
              <div style={{ fontSize: 11, color: "#7a8aaa", marginTop: 1 }}>{selected.zone}</div>
            </div>
          </div>

          {/* Login button */}
          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading
                ? "#d0d8e8"
                : `linear-gradient(135deg, ${selected.color}, ${selected.color}cc)`,
              border: "none",
              borderRadius: 12,
              color: "white",
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: 0.4,
              marginBottom: 20,
              boxShadow: loading ? "none" : `0 4px 20px ${selected.color}55`,
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Redirecting…" : `Enter ${selected.label} Dashboard →`}
          </button>

          {/* Bottom row: ABHA badge + chaos toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#22c55e22",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Shield size={10} color="#16a34a" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: 11, color: "#6b8a6a", fontWeight: 500 }}>ABHA Verified · Blockchain Secured</span>
            </div>

            {/* Chaos mode toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, color: "#aab0c0", letterSpacing: "0.5px" }}>Chaos</span>
              <div
                onClick={() => setChaos((c) => !c)}
                style={{
                  width: 38,
                  height: 22,
                  borderRadius: 11,
                  background: chaos ? "#f19e0e" : "#d8e0ee",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background 0.3s",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    left: chaos ? 19 : 3,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "white",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
                    transition: "left 0.25s ease",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div style={{ textAlign: "center", marginTop: 18, fontSize: 11, color: "#b0bcd4" }}>
            © 2024 AetherHealth · Connected to Secure Health Nodes
          </div>
        </div>
      </div>
    </>
  );
}