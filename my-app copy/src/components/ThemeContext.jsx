import React, { createContext, useState, useContext } from 'react';

export const departmentColors = {
  gold: '#FFD700',
  red: '#EF4444',
  silver: '#C0C0C0',
  blue: '#3B82F6',
  green: '#22C55E',
  pink: '#EC4899',
  violet: '#A855F7',
  teal: '#14B8A6',
  orange: '#F97316',
  grey: '#6B7280',
  black: '#1F2937',
};

export const departmentNames = {
  gold: 'Admin',
  red: 'Ambulance',
  silver: 'OT/Surgery',
  blue: 'Nursing',
  green: 'OPD/General',
  pink: 'Maternity',
  violet: 'Lab',
  teal: 'Radiology',
  orange: 'Pharmacy',
  grey: 'Cleaning',
  black: 'Security',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentDepartment, setCurrentDepartment] = useState('gold');

  return (
    <ThemeContext.Provider value={{ currentDepartment, setCurrentDepartment }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
