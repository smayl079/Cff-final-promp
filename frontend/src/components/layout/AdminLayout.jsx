import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/appointments', label: 'Appointments', icon: '📅' },
    { path: '/admin/customers', label: 'Customers', icon: '👥' },
    { path: '/admin/mechanics', label: 'Mechanics', icon: '👨‍🔧' },
    { path: '/admin/services', label: 'Services', icon: '🔧' },
    { path: '/admin/invoices', label: 'Invoices', icon: '💵' },
    { path: '/admin/reports', label: 'Reports', icon: '📈' },
  ];

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>🚗 Admin Panel</h2>
          <p className={styles.role}>{user?.role || 'Admin'}</p>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${
                location.pathname === item.path ? styles.active : ''
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {user?.firstName?.[0] || user?.name?.[0] || 'A'}
            </div>
            <div>
              <p className={styles.userName}>
                {user?.firstName} {user?.lastName || user?.name || 'Admin'}
              </p>
              <p className={styles.userEmail}>{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
