import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook for handling session timeout
 * @param {number} timeout - Timeout duration in milliseconds (default: 30 minutes)
 * @param {number} warningTime - Warning before timeout in milliseconds (default: 5 minutes)
 */
export const useSessionTimeout = (timeout = 30 * 60 * 1000, warningTime = 5 * 60 * 1000) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [showWarning, setShowWarning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  
  const timeoutRef = useRef(null);
  const warningTimeoutRef = useRef(null);
  const countdownRef = useRef(null);

  const resetTimer = () => {
    // Clear existing timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    
    setShowWarning(false);

    if (!isAuthenticated) return;

    // Set warning timeout (25 minutes)
    warningTimeoutRef.current = setTimeout(() => {
      setShowWarning(true);
      setRemainingTime(warningTime);

      // Start countdown
      countdownRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1000) {
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }, timeout - warningTime);

    // Set logout timeout (30 minutes)
    timeoutRef.current = setTimeout(async () => {
      setShowWarning(false);
      await logout();
      navigate('/login', { 
        state: { 
          message: t('auth.sessionExpired')
        } 
      });
    }, timeout);
  };

  const extendSession = () => {
    resetTimer();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // Clear all timers if user logs out manually
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      setShowWarning(false);
      return;
    }

    // Activity events to reset timer
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    // Initial timer setup
    resetTimer();

    // Add event listeners
    const handleActivity = () => {
      if (showWarning) return; // Don't reset if warning is already shown
      resetTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    // Cleanup
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [isAuthenticated, showWarning]);

  // Format remaining time as MM:SS
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    showWarning,
    remainingTime: formatTime(remainingTime),
    extendSession,
  };
};
