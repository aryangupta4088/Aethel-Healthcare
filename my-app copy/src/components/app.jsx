import React, { useState } from 'react';
import HospitalDashboard from './hospital_dashboard.jsx';
import Laboratory from './Laboratory.jsx';
import Landing from './Landing.jsx';
import Maternity from './Maternity.jsx';
import Nursing from './Nursing.jsx';
import OPD from './OPD.jsx';
import Patient from './Patient.jsx';
import Pharmacy from './Pharmacy.jsx';
import Radiology from './Radiology.jsx';
import Surgery from './Surgery.jsx';
import Emergency from './emergency.tsx';

/**
 * Main App Component
 * Serves as the central router for the hospital dashboard and all department pages
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [previousPage, setPreviousPage] = useState('dashboard');

  /**
   * Navigate to a specific department or page
   * @param {string} department - Department ID or page name
   */
  const handleNavigate = (department) => {
    setPreviousPage(currentPage);
    
    // Map department IDs to page names
    const departmentMap = {
      admin: 'landing',
      ambulance: 'emergency',
      surgery: 'surgery',
      nursing: 'nursing',
      general: 'opd',
      maternity: 'maternity',
      pharmacy: 'pharmacy',
      lab: 'laboratory',
      radiology: 'radiology',
      patient: 'patient',
      cleaning: 'dashboard',
      security: 'dashboard',
    };

    const page = departmentMap[department] || department;
    setCurrentPage(page);
  };

  /**
   * Navigate back to the hospital dashboard
   */
  const handleBackToDashboard = () => {
    setPreviousPage(currentPage);
    setCurrentPage('dashboard');
  };

  /**
   * Render the appropriate page based on current state
   */
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <HospitalDashboard onNavigate={handleNavigate} />
        );
      case 'laboratory':
        return (
          <Laboratory onBack={handleBackToDashboard} onNavigate={handleNavigate} />
        );
      case 'landing':
        return (
          <Landing onBack={handleBackToDashboard} onNavigate={handleNavigate} />
        );
      case 'maternity':
        return (
          <Maternity onBack={handleBackToDashboard} onNavigate={handleNavigate} />
        );
      case 'nursing':
        return (
          <Nursing onBack={handleBackToDashboard} onNavigate={handleNavigate} />
        );
      case 'opd':
        return (
          <OPD onBack={handleBackToDashboard} onNavigate={handleNavigate} />
        );
      case 'patient':
        return (
          <Patient onBack={handleBackToDashboard} onNavigate={handleNavigate} />
        );
      case 'pharmacy':
        return (
          <Pharmacy onBack={handleBackToDashboard} onNavigate={handleNavigate} />
        );
      case 'radiology':
        return (
          <Radiology onBack={handleBackToDashboard} onNavigate={handleNavigate} />
        );
      case 'surgery':
        return (
          <Surgery onBack={handleBackToDashboard} onNavigate={handleNavigate} />
        );
      case 'emergency':
        return (
          <Emergency onBack={handleBackToDashboard} onNavigate={handleNavigate} />
        );
      default:
        return (
          <HospitalDashboard onNavigate={handleNavigate} />
        );
    }
  };

  return (
    <div className="app-container">
      {renderPage()}
    </div>
  );
}
