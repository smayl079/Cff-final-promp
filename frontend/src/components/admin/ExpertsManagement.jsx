import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import axiosInstance from '../../api/axios.config';
import { ENDPOINTS } from '../../api/endpoints';
import './AdminDashboard.css';

const ExpertsManagement = () => {
    const [experts, setExperts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpert, setEditingExpert] = useState(null);
    const [formData, setFormData] = useState({ name: '', role: '', experience: '', imageUrl: '' });

    useEffect(() => {
        fetchExperts();
    }, []);

    const fetchExperts = async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.EXPERTS);
            setExperts(response.data?.data || response.data || []);
        } catch (error) {
            console.error('Error fetching experts:', error);
            toast.error('Failed to load experts');
        }
    };

    const handleOpenModal = (expert = null) => {
        if (expert) {
            setEditingExpert(expert);
            setFormData({
                name: expert.name || '',
                role: expert.role || '',
                experience: expert.experience || expert.exp || '',
                imageUrl: expert.imageUrl || expert.image || ''
            });
        } else {
            setEditingExpert(null);
            setFormData({ name: '', role: '', experience: '', imageUrl: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingExpert(null);
        setFormData({ name: '', role: '', experience: '', imageUrl: '' });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, imageUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingExpert) {
                await axiosInstance.put(ENDPOINTS.EXPERT_BY_ID(editingExpert.id), formData);
                toast.success('Expert updated successfully');
            } else {
                await axiosInstance.post(ENDPOINTS.EXPERTS, formData);
                toast.success('Expert added successfully');
            }
            fetchExperts();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving expert:', error);
            toast.error('Failed to save expert');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this expert?')) {
            try {
                await axiosInstance.delete(ENDPOINTS.EXPERT_BY_ID(id));
                toast.success('Expert deleted successfully');
                fetchExperts();
            } catch (error) {
                console.error('Error deleting expert:', error);
                toast.error('Failed to delete expert');
            }
        }
    };

    return (
        <div className="admin-page">
            <div className="dashboard-header">
                <div>
                    <h2>About Page Experts</h2>
                    <p>Manage the experts displayed on the About page.</p>
                </div>
                <button className="btn btn-primary" onClick={() => handleOpenModal()} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Plus size={18} /> Add Expert
                </button>
            </div>

            <div className="dashboard-table">
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Experience</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {experts.length > 0 ? experts.map(exp => (
                                <tr key={exp.id}>
                                    <td>
                                        {exp.image ? (
                                            <img src={exp.image} alt={exp.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <ImageIcon size={20} color="#94a3b8" />
                                            </div>
                                        )}
                                    </td>
                                    <td><strong>{exp.name}</strong></td>
                                    <td>{exp.role}</td>
                                    <td>{exp.exp}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-icon" title="Edit" onClick={() => handleOpenModal(exp)}>
                                                <Edit size={16} />
                                            </button>
                                            <button className="btn-icon" title="Delete" onClick={() => handleDelete(exp.id)}>
                                                <Trash2 size={16} style={{color: '#ef4444'}} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>No experts found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="modal-content" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '500px' }}>
                        <h3 style={{ marginBottom: '20px' }}>{editingExpert ? 'Edit Expert' : 'Add Expert'}</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label>Name</label>
                                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label>Role</label>
                                <input type="text" required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label>Experience</label>
                                <input type="text" required value={formData.exp} onChange={(e) => setFormData({...formData, exp: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label>Photo</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ padding: '10px' }} />
                                {formData.image && <img src={formData.image} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover', marginTop: '10px' }} />}
                            </div>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
                                <button type="button" onClick={handleCloseModal} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#f1f5f9', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#2563eb', color: '#fff', cursor: 'pointer' }}>{editingExpert ? 'Save' : 'Add'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpertsManagement;