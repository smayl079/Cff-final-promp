import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios.config';
import { ENDPOINTS } from '../../api/endpoints';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';
import './AdminDashboard.css';

const SettingsManagement = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
        workingHours: '',
        facebookUrl: '',
        twitterUrl: '',
        instagramUrl: ''
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(ENDPOINTS.ADMIN_SETTINGS);
            if (response.data) {
                setFormData({
                    companyName: response.data.companyName || '',
                    contactEmail: response.data.contactEmail || '',
                    contactPhone: response.data.contactPhone || '',
                    address: response.data.address || '',
                    workingHours: response.data.workingHours || '',
                    facebookUrl: response.data.facebookUrl || '',
                    twitterUrl: response.data.twitterUrl || '',
                    instagramUrl: response.data.instagramUrl || ''
                });
            }
        } catch (error) {
            console.error('No existing settings found or failed to fetch');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await axiosInstance.put(ENDPOINTS.ADMIN_SETTINGS, formData);
            toast.success('Settings saved successfully');
        } catch (error) {
            toast.error('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading settings...</div>;

    return (
        <div className="admin-page">
            <div className="dashboard-header">
                <div>
                    <h2>Company Settings</h2>
                    <p>Configure app settings, contact details, and social links.</p>
                </div>
            </div>

            <div className="dashboard-table" style={{padding: '2rem'}}>
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px'}}>
                    
                    <div style={{display: 'flex', gap: '1rem'}}>
                        <div className="form-group" style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                            <label style={{fontWeight: 600}}>Company Name</label>
                            <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="form-control" style={{padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd'}} />
                        </div>
                    </div>

                    <div style={{display: 'flex', gap: '1rem'}}>
                        <div className="form-group" style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                            <label style={{fontWeight: 600}}>Contact Email</label>
                            <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} className="form-control" style={{padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd'}} />
                        </div>
                        <div className="form-group" style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                            <label style={{fontWeight: 600}}>Contact Phone</label>
                            <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} className="form-control" style={{padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd'}} />
                        </div>
                    </div>

                    <div className="form-group" style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                        <label style={{fontWeight: 600}}>Headquarters Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="form-control" style={{padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd'}} />
                    </div>

                    <div className="form-group" style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                        <label style={{fontWeight: 600}}>Working Hours</label>
                        <input type="text" name="workingHours" value={formData.workingHours} placeholder="e.g. Mon-Fri: 9AM - 6PM" onChange={handleInputChange} className="form-control" style={{padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd'}} />
                    </div>

                    <h4 style={{marginTop: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>Social Media Links</h4>
                    
                    <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                        <div className="form-group" style={{flex: '1 1 calc(33% - 1rem)', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                            <label style={{fontWeight: 600}}>Facebook URL</label>
                            <input type="url" name="facebookUrl" value={formData.facebookUrl} onChange={handleInputChange} className="form-control" style={{padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd'}} />
                        </div>
                        <div className="form-group" style={{flex: '1 1 calc(33% - 1rem)', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                            <label style={{fontWeight: 600}}>Twitter URL</label>
                            <input type="url" name="twitterUrl" value={formData.twitterUrl} onChange={handleInputChange} className="form-control" style={{padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd'}} />
                        </div>
                        <div className="form-group" style={{flex: '1 1 calc(33% - 1rem)', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                            <label style={{fontWeight: 600}}>Instagram URL</label>
                            <input type="url" name="instagramUrl" value={formData.instagramUrl} onChange={handleInputChange} className="form-control" style={{padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd'}} />
                        </div>
                    </div>

                    <div style={{marginTop: '2rem'}}>
                        <button type="submit" disabled={saving} className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: saving ? 'not-allowed' : 'pointer'}}>
                            <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingsManagement;
