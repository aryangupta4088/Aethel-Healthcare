import { useState } from "react";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import Landing from "./components/Landing";
import PharmacyCommandCenter from "./components/Pharmacy";
import HospitalDashboard from "./components/hospital_dashboard";
import Laboratory from "./components/Laboratory";
import Radiology from "./components/Radiology";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleBackToHome = () => {
    setCurrentPage("landing");
  };

  return (
    <ThemeProvider>
      <>
        {currentPage === "landing" && <Landing onNavigate={handleNavigate} />}
        {currentPage === "pharmacy" && (
          <div>
            <div className="sticky top-0 z-40 bg-white border-b border-[#e7bdb2] px-6 py-3">
              <button
                onClick={handleBackToHome}
                className="text-[#ad2b00] hover:bg-[#fff1ec] px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                ← Back to Home
              </button>
            </div>
            <PharmacyCommandCenter />
          </div>
        )}
        {currentPage === "hospital_dashboard" && (
          <div>
            <div className="sticky top-0 z-40 bg-white border-b border-[#EC9A04] px-6 py-3">
              <button
                onClick={handleBackToHome}
                className="text-[#EC9A04] hover:bg-[#fff1ec] px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                ← Back to Home
              </button>
            </div>
            <HospitalDashboard />
          </div>
        )}
        {currentPage === "laboratory" && (
          <div>
            <div className="sticky top-0 z-40 bg-white border-b border-purple-500 px-6 py-3">
              <button
                onClick={handleBackToHome}
                className="text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                ← Back to Home
              </button>
            </div>
            <Laboratory />
          </div>
        )}
        {currentPage === "radiology" && (
          <div>
            <div className="sticky top-0 z-40 bg-white border-b border-teal-500 px-6 py-3">
              <button
                onClick={handleBackToHome}
                className="text-teal-700 hover:bg-teal-50 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                ← Back to Home
              </button>
            </div>
            <Radiology />
          </div>
        )}
      </>
    </ThemeProvider>
  );
}

export default App;
