import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios.config';
import { ENDPOINTS } from '../../api/endpoints';
import { Check, Trash2, Mail, MailOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import './AdminDashboard.css';

const MessagesManagement = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(ENDPOINTS.ADMIN_MESSAGES);
            setMessages(response.data || []);
        } catch (error) {
            toast.error('Failed to fetch messages');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await axiosInstance.put(ENDPOINTS.ADMIN_MESSAGES_READ(id));
            toast.success('Message marked as read');
            fetchMessages();
        } catch (error) {
            toast.error('Failed to mark message as read');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await axiosInstance.delete(`${ENDPOINTS.ADMIN_MESSAGES}/${id}`);
                toast.success('Message deleted successfully');
                fetchMessages();
            } catch (error) {
                toast.error('Failed to delete message');
            }
        }
    };

    return (
        <div className="admin-page">
            <div className="dashboard-header">
                <div>
                    <h2>Contact Messages</h2>
                    <p>Review and act on inquiries from customers.</p>
                </div>
            </div>

            <div className="dashboard-table">
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Name & Email</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>Loading...</td></tr>
                            ) : messages.length > 0 ? (
                                messages.map(msg => (
                                    <tr key={msg.id} style={{backgroundColor: msg.isRead ? 'transparent' : '#f0f9ff', fontWeight: msg.isRead ? 'normal' : '500'}}>
                                        <td>
                                            {msg.isRead ? <MailOpen size={20} color="#888" /> : <Mail size={20} color="#3b82f6" />}
                                        </td>
                                        <td>
                                            <div>{msg.name}</div>
                                            <div style={{fontSize: '0.85em', color: '#666'}}>{msg.email}</div>
                                        </td>
                                        <td>{msg.subject}</td>
                                        <td style={{maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                            {msg.message}
                                        </td>
                                        <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div className="action-buttons">
                                                {!msg.isRead && (
                                                    <button className="btn-icon" title="Mark as Read" onClick={() => handleMarkAsRead(msg.id)}>
                                                        <Check size={16} style={{color: '#10b981'}} />
                                                    </button>
                                                )}
                                                <button className="btn-icon" title="Delete" onClick={() => handleDelete(msg.id)}>
                                                    <Trash2 size={16} style={{color: '#ef4444'}} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No messages found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MessagesManagement;
