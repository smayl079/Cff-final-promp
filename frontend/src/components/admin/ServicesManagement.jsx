import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios.config';
import { ENDPOINTS } from '../../api/endpoints';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import './AdminDashboard.css';

const ServicesManagement = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        estimatedMinutes: '',
        isActive: true
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            // Assuming the endpoint returns { data: [...] } or just an array
            const response = await axiosInstance.get(ENDPOINTS.SERVICES);
            // Adapt according to the actual response structure (response.data or response.data.data)
            setServices(response.data?.data || response.data || []);
        } catch (error) {
            toast.error('Failed to fetch services');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleOpenModal = (service = null) => {
        if (service) {
            setCurrentService(service);
            setFormData({
                name: service.name || '',
                description: service.description || '',
                price: service.price || '',
                estimatedMinutes: service.estimatedMinutes || '',
                isActive: service.isActive !== undefined ? service.isActive : true
            });
        } else {
            setCurrentService(null);
            setFormData({ name: '', description: '', price: '', estimatedMinutes: '', isActive: true });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentService) {
                await axiosInstance.put(`${ENDPOINTS.SERVICES}/${currentService.id}`, formData);
                toast.success('Service updated successfully');
            } else {
                await axiosInstance.post(ENDPOINTS.SERVICES, formData);
                toast.success('Service created successfully');
            }
            setIsModalOpen(false);
            fetchServices();
        } catch (error) {
            toast.error(currentService ? 'Failed to update service' : 'Failed to create service');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await axiosInstance.delete(`${ENDPOINTS.SERVICES}/${id}`);
                toast.success('Service deleted successfully');
                fetchServices();
            } catch (error) {
                toast.error('Failed to delete service');
            }
        }
    };

    return (
        <div className="admin-page">
            <div className="dashboard-header">
                <div>
                    <h2>Services Management</h2>
                    <p>Manage your repair and maintenance services.</p>
                </div>
                <button className="btn btn-primary" onClick={() => handleOpenModal()} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Plus size={18} /> Add New Service
                </button>
            </div>

            <div className="dashboard-table">
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Duration (mins)</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>Loading...</td></tr>
                            ) : services.length > 0 ? (
                                services.map(service => (
                                    <tr key={service.id}>
                                        <td><strong>{service.name}</strong></td>
                                        <td style={{maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                            {service.description}
                                        </td>
                                        <td>${service.price}</td>
                                        <td>{service.estimatedMinutes}</td>
                                        <td>
                                            <span className={`badge ${service.isActive ? 'badge-success' : 'badge-warning'}`}>
                                                {service.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon" title="Edit" onClick={() => handleOpenModal(service)}>
                                                    <Edit size={16} />
                                                </button>
                                                <button className="btn-icon" title="Delete" onClick={() => handleDelete(service.id)}>
                                                    <Trash2 size={16} style={{color: '#ef4444'}} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No services found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000}}>
                    <div className="modal-content" style={{backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                            <h3>{currentService ? 'Edit Service' : 'Add New Service'}</h3>
                            <button className="btn-icon" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                            <div className="form-group" style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                                <label>Service Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="form-control" style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd'}}/>
                            </div>
                            <div className="form-group" style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                                <label>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} required className="form-control" rows="3" style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd'}}></textarea>
                            </div>
                            <div style={{display: 'flex', gap: '1rem'}}>
                                <div className="form-group" style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1}}>
                                    <label>Price ($)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" className="form-control" style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd'}}/>
                                </div>
                                <div className="form-group" style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1}}>
                                    <label>Duration (mins)</label>
                                    <input type="number" name="estimatedMinutes" value={formData.estimatedMinutes} onChange={handleInputChange} required min="0" className="form-control" style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd'}}/>
                                </div>
                            </div>
                            <div className="form-group" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem'}}>
                                <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleInputChange} />
                                <label htmlFor="isActive">Service is Active</label>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem'}}>
                                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)} style={{padding: '0.5rem 1rem'}}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{padding: '0.5rem 1rem', outline: 'none', border: 'none', background: '#3b82f6', color: 'white', borderRadius: '4px'}}>{currentService ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServicesManagement;
