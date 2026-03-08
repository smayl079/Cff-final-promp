import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios.config';
import { ENDPOINTS } from '../../api/endpoints';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import './AdminDashboard.css';

const EmployeesManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(ENDPOINTS.MECHANICS);
            setEmployees(response.data?.data || response.data || []);
        } catch (error) {
            toast.error('Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this employee?')) {
            try {
                await axiosInstance.delete(`${ENDPOINTS.MECHANICS}/${id}`);
                toast.success('Employee removed successfully');
                fetchEmployees();
            } catch (error) {
                toast.error('Failed to remove employee');
            }
        }
    };

    return (
        <div className="admin-page">
            <div className="dashboard-header">
                <div>
                    <h2>Employees Management</h2>
                    <p>Manage your mechanics and staff members.</p>
                </div>
                <button className="btn btn-primary" onClick={() => toast('Feature coming soon')} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <UserPlus size={18} /> Add Employee
                </button>
            </div>

            <div className="dashboard-table">
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Specializations</th>
                                <th>Hourly Rate</th>
                                <th>Status</th>
                                <th>Hire Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>Loading...</td></tr>
                            ) : employees.length > 0 ? (
                                employees.map(emp => (
                                    <tr key={emp.id}>
                                        <td><strong>{emp.firstName} {emp.lastName}</strong></td>
                                        <td>{emp.specializations || 'N/A'}</td>
                                        <td>${emp.hourlyRate || '0.00'}</td>
                                        <td>
                                            <span className={`badge ${emp.isActive ? 'badge-success' : 'badge-danger'}`}>
                                                {emp.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td>{new Date(emp.hireDate).toLocaleDateString()}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon" title="Edit" onClick={() => toast('Edit feature coming soon')}>
                                                    <Edit size={16} />
                                                </button>
                                                <button className="btn-icon" title="Delete" onClick={() => handleDelete(emp.id)}>
                                                    <Trash2 size={16} style={{color: '#ef4444'}} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No employees found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeesManagement;
