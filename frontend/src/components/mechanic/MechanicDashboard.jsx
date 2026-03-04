import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Car, Calendar, Wrench, Phone, LogOut, Clock, Timer } from 'lucide-react';
import './MechanicDashboard.css';

const MechanicDashboard = () => {
  const { t } = useTranslation();
  const { logout, user } = useAuth();
  const { showSuccess } = useNotification();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('myJobs');

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess(t('auth.logoutSuccess'));
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const jobs = [
    {
      id: '#A00152',
      time: 'Today, 2:00 PM',
      vehicle: '2018 Toyota Camry',
      customer: 'John Doe',
      phone: '(555) 123-4567',
      service: 'Brake Pad Replacement',
      duration: '2 hours',
      status: 'assigned'
    },
    {
      id: '#A00153',
      time: 'Today, 3:30 PM',
      vehicle: '2020 Honda Accord',
      customer: 'Jane Smith',
      phone: '(555) 987-6543',
      service: 'Oil Change & Filter',
      duration: '1 hour',
      status: 'in-progress'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return '#FF6B35';
      case 'in-progress': return '#3498DB';
      case 'completed': return '#27AE60';
      default: return '#6C757D';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'assigned': return t('mechanic.assigned');
      case 'in-progress': return t('mechanic.inProgress');
      case 'completed': return t('mechanic.completed');
      default: return status;
    }
  };

  return (
    <div className="mechanic-dashboard">
      {/* Top Bar */}
      <div className="mechanic-topbar">
        <div className="topbar-content">
          <div className="topbar-left">
            <h2 className="mechanic-name">{user?.firstName || 'Mechanic'}</h2>
            <span className="mechanic-badge"><Wrench size={16} style={{marginRight:'4px'}} /> {user?.role || 'Mechanic'}</span>
          </div>
          <button 
            className="logout-btn"
            onClick={handleLogout}
            title={t('nav.logout')}
          >
            <LogOut size={20} />
            <span className="logout-text">{t('nav.logout')}</span>
          </button>
        </div>
      </div>

      <div className="mechanic-header">
        <h1>{t('mechanic.myJobs')}</h1>
        <p>View and manage your assigned service appointments</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'myJobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('myJobs')}
        >
          {t('mechanic.myJobs')}
        </button>
        <button
          className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          {t('mechanic.completed')}
        </button>
      </div>

      {/* Jobs List */}
      <div className="jobs-container">
        {jobs.map((job) => (
          <div 
            key={job.id} 
            className="job-card"
            style={{ borderLeftColor: getStatusColor(job.status) }}
          >
            <div className="job-header">
              <span className="job-id">{job.id}</span>
              <span className="job-time" style={{display:'flex', alignItems:'center', gap:'4px'}}><Clock size={16} /> {job.time}</span>
            </div>

            <div className="job-info">
              <div className="info-row">
                <Car size={24} />
                <div>
                  <strong>{job.vehicle}</strong>
                </div>
              </div>

              <div className="info-row">
                <Phone size={24} />
                <div>
                  <strong>{job.customer}</strong>
                  <span className="phone-number">{job.phone}</span>
                </div>
              </div>

              <div className="info-row">
                <Wrench size={24} />
                <div>
                  <strong>{job.service}</strong>
                  <span className="duration" style={{display:'flex', alignItems:'center', gap:'4px'}}><Timer size={14} /> Est. {job.duration}</span>      
                </div>
              </div>
            </div>

            <div className="job-status">
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(job.status) }}
              >
                {getStatusText(job.status)}
              </span>
            </div>

            <div className="job-actions">
              {job.status === 'assigned' && (
                <button className="btn btn-primary btn-block">
                  {t('mechanic.startWork')}
                </button>
              )}
              {job.status === 'in-progress' && (
                <button className="btn btn-success btn-block">
                  {t('mechanic.markComplete')}
                </button>
              )}
              <button className="btn btn-outline btn-block">
                {t('mechanic.viewDetails')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MechanicDashboard;
