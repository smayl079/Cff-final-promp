import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, DollarSign, Star, Clock } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <Clock size={32} />,
      value: '63',
      label: t('admin.pendingAppts'),
      change: '+5%',
      positive: true
    },
    {
      icon: <Calendar size={32} />,
      value: '12',
      label: t('admin.todayAppts'),
      change: t('admin.today'),
      positive: true
    },
    {
      icon: <DollarSign size={32} />,
      value: '$12,450',
      label: t('admin.revenue') + ' ' + t('admin.thisMonth'),
      change: '+12%',
      positive: true
    },
    {
      icon: <Star size={32} />,
      value: '4.8',
      label: t('admin.avgRating'),
      change: '234 reviews',
      positive: true
    }
  ];

  const recentAppointments = [
    { id: '#A00152', customer: 'John Doe', service: 'Oil Change', status: 'pending', date: '2026-03-02' },
    { id: '#A00153', customer: 'Jane Smith', service: 'Brake Repair', status: 'completed', date: '2026-03-02' },
    { id: '#A00154', customer: 'Mike Johnson', service: 'Engine Diagnostics', status: 'in-progress', date: '2026-03-03' }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed': return 'badge-success';
      case 'pending': return 'badge-warning';
      case 'in-progress': return 'badge-info';
      default: return '';
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>{t('admin.dashboard')}</h1>
          <p>Welcome back, Admin! Here's what's happening today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="dashboard-charts">
        <div className="chart-card">
          <h3>Revenue Overview</h3>
          <div className="chart-placeholder">
            <p>Chart component would go here (using Chart.js or Recharts)</p>
          </div>
        </div>

        <div className="chart-card">
          <h3>Appointment Status</h3>
          <div className="chart-placeholder">
            <p>Donut chart showing appointment distribution</p>
          </div>
        </div>
      </div>

      {/* Recent Appointments Table */}
      <div className="dashboard-table">
        <div className="table-header">
          <h3>Recent Appointments</h3>
          <a href="/admin/appointments" className="view-all-link">View All →</a>
        </div>
        
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map((apt) => (
                <tr key={apt.id}>
                  <td className="id-cell">{apt.id}</td>
                  <td>{apt.customer}</td>
                  <td>{apt.service}</td>
                  <td>{apt.date}</td>
                  <td>
                    <span className={`badge ${getStatusClass(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="View">👁️</button>
                      <button className="btn-icon" title="Edit">✏️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
