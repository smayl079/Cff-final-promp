import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios.config';
import { ENDPOINTS } from '../../api/endpoints';
import { Edit, Check, XCircle, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import './AdminDashboard.css';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(ENDPOINTS.APPOINTMENTS);
            setBookings(response.data?.items || response.data || []);
        } catch (error) {
            toast.error('Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            // Depending on your API, might be PUT to /status endpoint or standard update
            await axiosInstance.put(ENDPOINTS.APPOINTMENT_STATUS(id), JSON.stringify(status), {
                headers: { 'Content-Type': 'application/json' }
            });
            toast.success(`Booking status updated to ${status}`);
            fetchBookings();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const filteredBookings = bookings.filter(b => 
        (b.customerName || b.customer?.firstName)?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'badge-success';
            case 'confirmed': return 'badge-info';
            case 'pending': return 'badge-warning';
            case 'cancelled': return 'badge-danger';
            default: return '';
        }
    };

    return (
        <div className="admin-page">
            <div className="dashboard-header">
                <div>
                    <h2>Booking Management</h2>
                    <p>Manage customer appointments and status.</p>
                </div>
            </div>

            <div className="dashboard-table">
                <div style={{padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', gap: '1rem'}}>
                    <div style={{position: 'relative', flex: 1, maxWidth: '400px'}}>
                        <Search size={18} style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888'}} />
                        <input 
                            type="text" 
                            placeholder="Search by customer name or ID..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', borderRadius: '4px', border: '1px solid #ddd'}}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Customer Name</th>
                                <th>Date & Time</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>Loading...</td></tr>
                            ) : filteredBookings.length > 0 ? (
                                filteredBookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td className="id-cell">#{booking.id?.substring(0, 6) || booking.id}</td>
                                        <td>{booking.customerName || `${booking.customer?.firstName} ${booking.customer?.lastName}`}</td>
                                        <td>{new Date(booking.scheduledDate).toLocaleString()}</td>
                                        <td>${booking.totalAmount || '0.00'}</td>
                                        <td>
                                            <span className={`badge ${getStatusClass(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons" style={{gap: '8px'}}>
                                                {booking.status !== 'Completed' && booking.status !== 'Cancelled' && (
                                                    <>
                                                        <button className="btn-icon" title="Confirm" onClick={() => handleUpdateStatus(booking.id, 'Confirmed')}>
                                                            <Check size={16} style={{color: '#10b981'}} />
                                                        </button>
                                                        <button className="btn-icon" title="Cancel" onClick={() => handleUpdateStatus(booking.id, 'Cancelled')}>
                                                            <XCircle size={16} style={{color: '#ef4444'}} />
                                                        </button>
                                                    </>
                                                )}
                                                {booking.status === 'Confirmed' && (
                                                    <button className="btn-icon" title="Mark Completed" onClick={() => handleUpdateStatus(booking.id, 'Completed')}>
                                                        <Check size={16} style={{color: '#3b82f6'}} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No bookings found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookingManagement;
