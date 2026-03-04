import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, ClipboardList, Users, DollarSign, Hourglass, CheckCircle, Wrench, PenTool, BarChart, FileText } from 'lucide-react';
import styles from './Dashboard.module.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
  });

  useEffect(() => {
    // TODO: Fetch stats from API
    // For now, using mock data
    setStats({
      totalAppointments: 156,
      todayAppointments: 12,
      totalCustomers: 89,
      totalRevenue: 45230.50,
      pendingAppointments: 8,
      completedAppointments: 148,
    });
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user?.firstName || user?.name}!</p>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Calendar size={28} color="white" /></div>
          <div className={styles.statContent}>
            <h3>{stats.todayAppointments}</h3>
            <p>Today's Appointments</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}><ClipboardList size={28} color="white" /></div>
          <div className={styles.statContent}>
            <h3>{stats.totalAppointments}</h3>
            <p>Total Appointments</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}><Users size={28} color="white" /></div>
          <div className={styles.statContent}>
            <h3>{stats.totalCustomers}</h3>
            <p>Total Customers</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}><DollarSign size={28} color="white" /></div>
          <div className={styles.statContent}>
            <h3>${stats.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}><Hourglass size={28} color="white" /></div>
          <div className={styles.statContent}>
            <h3>{stats.pendingAppointments}</h3>
            <p>Pending Appointments</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}><CheckCircle size={28} color="white" /></div>
          <div className={styles.statContent}>
            <h3>{stats.completedAppointments}</h3>
            <p>Completed Services</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <h2>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          <button className={styles.actionBtn}>
            <span><Calendar size={20} /></span>
            <span>View All Appointments</span>
          </button>
          <button className={styles.actionBtn}>
            <span><Users size={20} /></span>
            <span>Manage Customers</span>
          </button>
          <button className={styles.actionBtn}>
            <span><Wrench size={20} /></span>
            <span>Manage Services</span>
          </button>
          <button className={styles.actionBtn}>
            <span><PenTool size={20} /></span>
            <span>Manage Mechanics</span>
          </button>
          <button className={styles.actionBtn}>
            <span><FileText size={20} /></span>
            <span>View Invoices</span>
          </button>
          <button className={styles.actionBtn}>
            <span><BarChart size={20} /></span>
            <span>Generate Reports</span>
          </button>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className={styles.recentSection}>
        <h2>Recent Appointments</h2>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>John Doe</td>
                <td>Toyota Camry 2020</td>
                <td>Oil Change</td>
                <td>2026-03-02 10:00</td>
                <td><span className={styles.statusPending}>Pending</span></td>
                <td>
                  <button className={styles.btnSmall}>View</button>
                </td>
              </tr>
              <tr>
                <td>#002</td>
                <td>Jane Smith</td>
                <td>Honda Accord 2019</td>
                <td>Brake Service</td>
                <td>2026-03-02 14:00</td>
                <td><span className={styles.statusConfirmed}>Confirmed</span></td>
                <td>
                  <button className={styles.btnSmall}>View</button>
                </td>
              </tr>
              <tr>
                <td>#003</td>
                <td>Mike Johnson</td>
                <td>Ford F-150 2021</td>
                <td>Tire Rotation</td>
                <td>2026-03-03 09:00</td>
                <td><span className={styles.statusPending}>Pending</span></td>
                <td>
                  <button className={styles.btnSmall}>View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
