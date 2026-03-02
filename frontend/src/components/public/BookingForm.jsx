import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import './BookingForm.css';

const BookingForm = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(t('booking.success'));
      reset();
    } catch (error) {
      toast.error(t('booking.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="booking section">
      <div className="booking-background">
        <div className="container">
          <div className="booking-header">
            <h2>{t('booking.title')}</h2>
            <p>{t('booking.subtitle')}</p>
          </div>

          <div className="booking-form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label required">{t('booking.name')}</label>
                  <input
                    type="text"
                    className="form-input"
                    {...register('name', { required: true })}
                  />
                  {errors.name && (
                    <span className="form-error">
                      <AlertCircle size={16} />
                      {t('booking.required')}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label required">{t('booking.phone')}</label>
                  <input
                    type="tel"
                    className="form-input"
                    {...register('phone', { required: true })}
                  />
                  {errors.phone && (
                    <span className="form-error">
                      <AlertCircle size={16} />
                      {t('booking.required')}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label required">{t('booking.email')}</label>
                  <input
                    type="email"
                    className="form-input"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  />
                  {errors.email && (
                    <span className="form-error">
                      <AlertCircle size={16} />
                      {t('booking.required')}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label required">{t('booking.serviceType')}</label>
                  <select className="form-select" {...register('serviceType', { required: true })}>
                    <option value="">Select a service...</option>
                    <option value="oil-change">Oil Change & Filter</option>
                    <option value="brake-repair">Brake Repair</option>
                    <option value="engine-diagnostics">Engine Diagnostics</option>
                    <option value="transmission">Transmission Service</option>
                    <option value="tire-service">Tire Service</option>
                    <option value="ac-repair">AC Repair</option>
                    <option value="battery">Battery Service</option>
                    <option value="maintenance">General Maintenance</option>
                  </select>
                  {errors.serviceType && (
                    <span className="form-error">
                      <AlertCircle size={16} />
                      {t('booking.required')}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label required">{t('booking.vehicleMake')}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Toyota, Honda, Ford"
                    {...register('vehicleMake', { required: true })}
                  />
                  {errors.vehicleMake && (
                    <span className="form-error">
                      <AlertCircle size={16} />
                      {t('booking.required')}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label required">{t('booking.vehicleModel')}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Camry, Accord, F-150"
                    {...register('vehicleModel', { required: true })}
                  />
                  {errors.vehicleModel && (
                    <span className="form-error">
                      <AlertCircle size={16} />
                      {t('booking.required')}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label required">{t('booking.year')}</label>
                  <select className="form-select" {...register('year', { required: true })}>
                    <option value="">Select year...</option>
                    {Array.from({ length: 36 }, (_, i) => 2026 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.year && (
                    <span className="form-error">
                      <AlertCircle size={16} />
                      {t('booking.required')}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label required">{t('booking.preferredDate')}</label>
                  <input
                    type="date"
                    className="form-input"
                    {...register('preferredDate', { required: true })}
                  />
                  {errors.preferredDate && (
                    <span className="form-error">
                      <AlertCircle size={16} />
                      {t('booking.required')}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label required">{t('booking.preferredTime')}</label>
                  <select className="form-select" {...register('preferredTime', { required: true })}>
                    <option value="">Select time...</option>
                    <option value="08:00">8:00 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                  {errors.preferredTime && (
                    <span className="form-error">
                      <AlertCircle size={16} />
                      {t('booking.required')}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('booking.description')}</label>
                <textarea
                  className="form-textarea"
                  rows="4"
                  placeholder={t('booking.descriptionPlaceholder')}
                  {...register('description')}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    <Calendar size={20} />
                    {t('booking.submit')}
                  </>
                )}
              </button>

              <p className="alternative-contact">
                {t('booking.callAlternative')} <a href="tel:+1234567890">(555) 123-4567</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
