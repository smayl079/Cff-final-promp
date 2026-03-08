import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, DollarSign, Star, Clock, Users, Wrench } from 'lucide-react';
import axiosInstance from '../../api/axios.config';
import { ENDPOINTS } from '../../api/endpoints';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get(ENDPOINTS.ADMIN_DASHBOARD);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;

  const stats = [
    {
      icon: <Clock size={32} />,
      value: data?.totalBookings || '0',
      label: 'Total Bookings',
      change: '+5%',
      positive: true
    },
    {
      icon: <Wrench size={32} />,
      value: data?.totalServices || '0',
      label: 'Total Services',
      change: 'Active',
      positive: true
    },
    {
      icon: <Users size={32} />,
      value: data?.totalCustomers || '0',
      label: 'Total Customers',
      change: '+12%',
      positive: true
    },
    {
      icon: <Star size={32} />,
      value: data?.unreadMessages || '0',
      label: 'Unread Messages',
      change: 'Check inbox',
      positive: data?.unreadMessages === 0
    }
  ];

  const recentAppointments = data?.recentBookings || [];

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
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
              {recentAppointments && recentAppointments.length > 0 ? recentAppointments.map((apt) => (
                <tr key={apt.id}>
                  <td className="id-cell">{apt.id?.substring(0,6) || apt.id}</td>
                  <td>{apt.customerName || apt.customer}</td>
                  <td>{apt.serviceId ? 'Service ' + apt.serviceId.substring(0,4) : apt.service}</td>
                  <td>{apt.date ? new Date(apt.date).toLocaleDateString() : 'N/A'}</td>
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
              )) : (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', padding: '1rem'}}>No recent appointments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
