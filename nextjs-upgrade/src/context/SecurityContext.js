import React, { createContext, useState } from 'react';

export const SecurityContext = createContext();

export const SecurityProvider = ({ children }) => {
  const [securitySettings, setSecuritySettings] = useState({
    enableAIScan: true,
    autoFix: true,
    emailAlerts: true,
    scanFrequency: 'daily'
  });

  const updateSecuritySettings = (newSettings) => {
    setSecuritySettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  return (
    <SecurityContext.Provider value={{ 
      securitySettings,
      updateSecuritySettings
    }}>
      {children}
    </SecurityContext.Provider>
  );
};

export default SecurityProvider;