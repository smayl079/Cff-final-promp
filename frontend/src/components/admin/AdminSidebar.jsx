import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Users,
  Car,
  Calendar,
  Wrench,
  DollarSign,
  BarChart3,
  MessageSquare,
  Settings,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import './AdminSidebar.css';

const AdminSidebar = ({ isCollapsed, onToggle }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: t('admin.dashboard'), exact: true },
    { path: '/admin/services', icon: <Wrench size={20} />, label: t('admin.services') },
    { path: '/admin/bookings', icon: <Calendar size={20} />, label: 'Bookings' },
    { path: '/admin/employees', icon: <Users size={20} />, label: 'Employees' },
    { path: '/admin/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: t('admin.settings') }
  ];

  const toggleSubmenu = (label) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">🔧</div>
            {!isCollapsed && <span className="logo-text">AutoCare Admin</span>}
          </div>
          <button className="toggle-btn" onClick={onToggle}>
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.path ? (
                <Link
                  to={item.path}
                  className={`nav-item ${isActive(item.path, item.exact) ? 'active' : ''}`}
                  title={isCollapsed ? item.label : ''}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!isCollapsed && <span className="nav-label">{item.label}</span>}
                </Link>
              ) : (
                <>
                  <button
                    className={`nav-item ${item.submenu?.some(sub => isActive(sub.path)) ? 'active' : ''}`}
                    onClick={() => toggleSubmenu(item.label)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {!isCollapsed && (
                      <>
                        <span className="nav-label">{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={`chevron ${expandedMenus[item.label] ? 'expanded' : ''}`}
                        />
                      </>
                    )}
                  </button>
                  {!isCollapsed && expandedMenus[item.label] && (
                    <div className="submenu">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`submenu-item ${isActive(subItem.path) ? 'active' : ''}`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
