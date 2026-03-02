import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSessionTimeout } from '../hooks/useSessionTimeout';
import SessionTimeoutWarning from './SessionTimeoutWarning';

const SessionManager = () => {
  const { logout } = useAuth();
  const { showWarning, remainingTime, extendSession } = useSessionTimeout();

  const handleLogout = async () => {
    await logout();
  };

  if (!showWarning) return null;

  return (
    <SessionTimeoutWarning
      remainingTime={remainingTime}
      onExtendSession={extendSession}
      onLogout={handleLogout}
    />
  );
};

export default SessionManager;
