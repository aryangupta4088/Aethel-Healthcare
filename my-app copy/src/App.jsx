import { useState } from "react";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import Landing from "./components/Landing";
import HospitalDashboard from "./components/hospital_dashboard";
import PatientDashboard from "./components/Patient";
import PharmacyCommandCenter from "./components/Pharmacy";
import Laboratory from "./components/Laboratory";
import Radiology from "./components/Radiology";
import Surgery from "./components/Surgery";
import Nursing from "./components/Nursing";
import Maternity from "./components/Maternity";
import OPD from "./components/OPD";

const BackButton = ({ onClick }) => (
  <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-3">
    <button
      onClick={onClick}
      className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
    >
      ← Back to Admin
    </button>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState("admin");

  const handleNavigate = (departmentId) => {
    // Map department IDs to page names
    const pageMap = {
      admin: "admin",
      ambulance: "ambulance",
      surgery: "surgery",
      nursing: "nursing",
      general: "opd",
      maternity: "maternity",
      pharmacy: "pharmacy",
      lab: "laboratory",
      radiology: "radiology",
    };
    
    const page = pageMap[departmentId] || departmentId;
    setCurrentPage(page);
  };

  const handleBack = () => {
    setCurrentPage("admin");
  };

  return (
    <ThemeProvider>
      <>
        {currentPage === "admin" && (
          <HospitalDashboard onNavigate={handleNavigate} />
        )}
        {currentPage === "patient" && (
          <div>
            <BackButton onClick={handleBack} />
            <PatientDashboard />
          </div>
        )}
        {currentPage === "pharmacy" && (
          <div>
            <BackButton onClick={handleBack} />
            <PharmacyCommandCenter />
          </div>
        )}
        {currentPage === "laboratory" && (
          <div>
            <BackButton onClick={handleBack} />
            <Laboratory />
          </div>
        )}
        {currentPage === "radiology" && (
          <div>
            <BackButton onClick={handleBack} />
            <Radiology />
          </div>
        )}
        {currentPage === "surgery" && (
          <div>
            <BackButton onClick={handleBack} />
            <Surgery />
          </div>
        )}
        {currentPage === "nursing" && (
          <div>
            <BackButton onClick={handleBack} />
            <Nursing />
          </div>
        )}
        {currentPage === "maternity" && (
          <div>
            <BackButton onClick={handleBack} />
            <Maternity />
          </div>
        )}
        {currentPage === "opd" && (
          <div>
            <BackButton onClick={handleBack} />
            <OPD />
          </div>
        )}
      </>
    </ThemeProvider>
  );
}

export default App;