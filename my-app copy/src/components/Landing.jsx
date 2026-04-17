import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, departmentColors, departmentNames } from './ThemeContext.jsx';
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
  ChevronRight,
} from 'lucide-react';

// Department configuration with icons
const departments = [
  { key: 'gold', label: 'Admin', icon: Shield, color: departmentColors.gold },
  { key: 'red', label: 'Ambulance', icon: Truck, color: departmentColors.red },
  { key: 'silver', label: 'OT/Surgery', icon: Activity, color: departmentColors.silver },
  { key: 'blue', label: 'Nursing', icon: Stethoscope, color: departmentColors.blue },
  { key: 'green', label: 'OPD/General', icon: Users, color: departmentColors.green },
  { key: 'pink', label: 'Maternity', icon: Baby, color: departmentColors.pink },
  { key: 'violet', label: 'Lab', icon: Microscope, color: departmentColors.violet },
  { key: 'teal', label: 'Radiology', icon: Scan, color: departmentColors.teal },
  { key: 'orange', label: 'Pharmacy', icon: Package, color: departmentColors.orange },
  { key: 'grey', label: 'Cleaning', icon: Droplet, color: departmentColors.grey },
  { key: 'black', label: 'Security', icon: Wrench, color: departmentColors.black },
];

const Landing = ({ onNavigate }) => {
  const { setCurrentDepartment } = useTheme();
  const [hoveredDept, setHoveredDept] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (deptKey) => {
    setCurrentDepartment(deptKey);
    setSelectedRole(deptKey);

    // Route mapping
    const routes = {
      gold: 'pharmacy',
      red: 'pharmacy',
      silver: 'pharmacy',
      blue: 'pharmacy',
      green: 'pharmacy',
      pink: 'pharmacy',
      violet: 'laboratory',
      teal: 'radiology',
      orange: 'pharmacy',
      grey: 'pharmacy',
      black: 'pharmacy',
    };

    setTimeout(() => {
      if (onNavigate) {
        onNavigate(routes[deptKey] || 'pharmacy');
      }
    }, 400);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Floating Hexagons / Particles */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* 11 Doctor Figures in Arc */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 flex items-end justify-center">
          <div className="relative w-full h-full flex items-end justify-around">
            {departments.map((dept, index) => {
              // Calculate position in arc (semi-circle)
              const angle = (index / (departments.length - 1)) * Math.PI;
              const x = Math.cos(angle) * 200;
              const y = Math.sin(angle) * 80;

              return (
                <motion.div
                  key={dept.key}
                  className="absolute bottom-0"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                  }}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{
                    opacity: 1,
                    y: -y,
                    scale: hoveredDept === dept.key ? 1.1 : 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 50,
                    damping: 20,
                    delay: index * 0.05,
                  }}
                >
                  {/* Doctor Figure */}
                  <div
                    className="relative flex flex-col items-center cursor-pointer group"
                    onMouseEnter={() => setHoveredDept(dept.key)}
                    onMouseLeave={() => setHoveredDept(null)}
                    onClick={() => handleRoleSelect(dept.key)}
                  >
                    {/* Glow effect */}
                    <div
                      className="absolute inset-0 w-20 h-20 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                      style={{ backgroundColor: dept.color }}
                    />
                    {/* Body (lab coat) */}
                    <div
                      className="w-16 h-24 relative transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(to bottom, #ffffff, #e2e8f0)`,
                        borderRadius: '40% 40% 30% 30%',
                        boxShadow: `0 0 20px ${dept.color}40`,
                        border: `2px solid ${dept.color}`,
                      }}
                    >
                      {/* Colored stripe */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-2"
                        style={{ backgroundColor: dept.color }}
                      />
                      {/* Head */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 bg-amber-100 rounded-full border-2 border-white shadow-md" />
                    </div>
                    {/* Department label */}
                    <motion.span
                      className="mt-2 text-xs font-medium px-2 py-1 rounded-full bg-slate-800/80 backdrop-blur-sm text-white shadow-lg"
                      style={{ borderLeft: `3px solid ${dept.color}` }}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.3 }}
                    >
                      {dept.label}
                    </motion.span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Central Login Panel (Glassmorphism) */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-4xl"
        >
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-400 shadow-lg mb-4"
              >
                <Activity className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                AetherHealth
              </h1>
              <p className="text-slate-300 mt-2 text-lg">
                Intelligent Healthcare Ecosystem
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-slate-400">
                  Select your role to continue
                </span>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>
            </div>

            {/* Role Selection Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {departments.map((dept) => {
                const Icon = dept.icon;
                return (
                  <motion.button
                    key={dept.key}
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoleSelect(dept.key)}
                    className={`
                      relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300
                      backdrop-blur-sm bg-white/5 border border-white/10
                      hover:bg-white/15 hover:border-white/30
                      ${selectedRole === dept.key ? 'ring-2 ring-offset-2 ring-offset-transparent' : ''}
                    `}
                    style={{
                      boxShadow: `0 8px 20px -8px ${dept.color}30`,
                      borderColor: hoveredDept === dept.key ? dept.color : undefined,
                    }}
                  >
                    {/* Colored accent bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5"
                      style={{ backgroundColor: dept.color }}
                    />
                    <div className="flex items-start gap-3">
                      <div
                        className="p-2 rounded-lg transition-colors"
                        style={{
                          backgroundColor: `${dept.color}20`,
                          color: dept.color,
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-white">{dept.label}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {dept.key === 'gold' && 'Command Center'}
                          {dept.key === 'red' && 'Emergency Response'}
                          {dept.key === 'silver' && 'Surgical Suite'}
                          {dept.key === 'blue' && 'Patient Care'}
                          {dept.key === 'green' && 'Outpatient'}
                          {dept.key === 'pink' && 'Labor & Delivery'}
                          {dept.key === 'violet' && 'Diagnostics'}
                          {dept.key === 'teal' && 'Medical Imaging'}
                          {dept.key === 'orange' && 'Medication'}
                          {dept.key === 'grey' && 'Sanitation'}
                          {dept.key === 'black' && 'Safety & Access'}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 self-center" />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-slate-400 text-sm flex items-center justify-center gap-4">
              <span>Code Wizards 2.0</span>
              <span className="w-1 h-1 bg-slate-600 rounded-full" />
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Powered by AI Agents & Blockchain
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CSS Animations for floating blobs */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Landing;