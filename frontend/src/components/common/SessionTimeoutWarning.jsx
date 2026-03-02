import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Clock } from 'lucide-react';
import './SessionTimeoutWarning.css';

const SessionTimeoutWarning = ({ remainingTime, onExtendSession, onLogout }) => {
  const { t } = useTranslation();

  return (
    <div className="session-timeout-overlay">
      <div className="session-timeout-modal">
        <div className="modal-icon">
          <Clock size={48} className="clock-icon" />
        </div>
        
        <h2 className="modal-title">{t('auth.stillThere')}</h2>
        
        <div className="modal-message">
          <AlertCircle size={20} />
          <p>{t('auth.sessionExpireWarning')}</p>
        </div>

        <div className="countdown">
          <span className="countdown-label">Time remaining:</span>
          <span className="countdown-time">{remainingTime}</span>
        </div>

        <div className="modal-actions">
          <button 
            className="btn btn-primary btn-extend"
            onClick={onExtendSession}
          >
            {t('auth.keepLoggedIn')}
          </button>
          <button 
            className="btn btn-outline btn-logout"
            onClick={onLogout}
          >
            {t('nav.logout')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutWarning;
