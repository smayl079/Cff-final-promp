import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { Search, Bell, User, ChevronDown, LogOut, Settings } from 'lucide-react';
import './AdminTopBar.css';

const AdminTopBar = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <div className="admin-topbar">
      <div className="topbar-left">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder={t('admin.search')}
            className="search-input"
          />
        </div>
      </div>

      <div className="topbar-right">
        {/* Language Switcher */}
        <div className="topbar-item dropdown">
          <button 
            className="topbar-btn"
            onClick={() => setIsLangOpen(!isLangOpen)}
          >
            {currentLanguage.toUpperCase()}
            <ChevronDown size={16} />
          </button>
          {isLangOpen && (
            <div className="dropdown-menu">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`dropdown-item ${currentLanguage === lang.code ? 'active' : ''}`}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsLangOpen(false);
                  }}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="topbar-btn notification-btn">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>

        {/* Profile */}
        <div className="topbar-item dropdown">
          <button 
            className="profile-btn"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="avatar">
              <User size={20} />
            </div>
            <div className="profile-info">
              <span className="profile-name">Admin User</span>
              <span className="profile-role">Administrator</span>
            </div>
            <ChevronDown size={16} />
          </button>
          {isProfileOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item">
                <User size={16} />
                {t('admin.profile')}
              </button>
              <button className="dropdown-item">
                <Settings size={16} />
                {t('admin.settings')}
              </button>
              <hr className="dropdown-divider" />
              <button className="dropdown-item">
                <LogOut size={16} />
                {t('nav.logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTopBar;
