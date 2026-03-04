import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import { Eye, EyeOff, Lock, Mail, ChevronDown, CheckCircle, AlertCircle, Loader, Star, Wrench } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const { t } = useTranslation();
  const { login, isAuthenticated, user } = useAuth();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      redirectByRole(user.role);
    }
  }, [isAuthenticated, user]);

  const redirectByRole = (role) => {
    const from = location.state?.from?.pathname || null;
    
    switch (role?.toLowerCase()) {
      case 'admin':
        navigate('/admin', { replace: true });
        break;
      case 'mechanic':
        navigate('/mechanic', { replace: true });
        break;
      case 'customer':
        navigate(from || '/', { replace: true });
        break;
      default:
        navigate('/', { replace: true });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = (field) => {
    setTouchedFields({ ...touchedFields, [field]: true });
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'email':
        if (!value) {
          newErrors.email = t('auth.errors.emailRequired');
        } else if (!validateEmail(value)) {
          newErrors.email = t('auth.errors.emailInvalid');
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = t('auth.errors.passwordRequired');
        } else if (value.length < 6) {
          newErrors.password = t('auth.errors.passwordTooShort');
        } else {
          delete newErrors.password;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Clear error when user starts typing again
    if (errors[name] && touchedFields[name]) {
      validateField(name, newValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouchedFields({ email: true, password: true });
    
    // Validate all fields
    const isEmailValid = validateField('email', formData.email);
    const isPasswordValid = validateField('password', formData.password);
    
    if (!isEmailValid || !isPasswordValid) {
      showError(t('auth.errors.fixErrors'));
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      showSuccess(t('auth.loginSuccess'));
      
      // Small delay for success message
      setTimeout(() => {
        redirectByRole(response.user?.role);
      }, 500);
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || t('auth.errors.loginFailed');
      showError(errorMessage);
      
      // Shake animation for error
      const formElement = document.querySelector('.login-form');
      formElement?.classList.add('shake');
      setTimeout(() => formElement?.classList.remove('shake'), 400);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left Panel - Brand Section */}
      <div className="login-brand">
        <div className="brand-overlay"></div>
        <div className="brand-content">
          <div className="brand-logo">
            <div className="logo-icon"><Wrench size={32} /></div>
            <h1 className="logo-text">AutoFix Pro</h1>
          </div>
          
          <p className="brand-tagline">{t('auth.tagline')}</p>
          
          <div className="trust-indicators">
            <div className="trust-item">
              <div className="trust-number">500+</div>
              <div className="trust-label">{t('auth.trustStats.customers')}</div>
            </div>
            <div className="trust-item">
              <div className="trust-number">15+</div>
              <div className="trust-label">{t('auth.trustStats.experience')}</div>
            </div>
            <div className="trust-item">
              <div className="trust-number">24/7</div>
              <div className="trust-label">{t('auth.trustStats.support')}</div>
            </div>
          </div>

          <div className="testimonial">
            <div className="testimonial-stars" style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '1rem', color: '#fbbf24' }}>
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
            </div>
            <p className="testimonial-text">"{t('auth.testimonial')}"</p>
            <p className="testimonial-author">- {t('auth.testimonialAuthor')}</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="login-form-panel">
        {/* Language Switcher */}
        <div className="login-lang-switcher">
          <button 
            className="lang-trigger"
            onClick={() => setIsLangOpen(!isLangOpen)}
          >
            {languages.find(l => l.code === currentLanguage)?.flag} {currentLanguage.toUpperCase()}
            <ChevronDown size={16} />
          </button>
          {isLangOpen && (
            <div className="lang-dropdown">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-option ${currentLanguage === lang.code ? 'active' : ''}`}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsLangOpen(false);
                  }}
                >
                  {lang.flag} {lang.name}
                  {currentLanguage === lang.code && <CheckCircle size={16} />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="login-form-container">
          <div className="login-header">
            <h2 className="login-title">{t('auth.welcomeBack')}</h2>
            <p className="login-subtitle">{t('auth.signInMessage')}</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                {t('auth.email')}
              </label>
              <div className={`input-wrapper ${errors.email && touchedFields.email ? 'error' : ''} ${formData.email && !errors.email ? 'success' : ''}`}>
                <Mail size={20} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  placeholder={t('auth.emailPlaceholder')}
                  className="form-input"
                  autoFocus
                  disabled={isLoading}
                />
                {formData.email && !errors.email && (
                  <CheckCircle size={20} className="input-success-icon" />
                )}
              </div>
              {errors.email && touchedFields.email && (
                <div className="error-message">
                  <AlertCircle size={14} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                {t('auth.password')}
              </label>
              <div className={`input-wrapper ${errors.password && touchedFields.password ? 'error' : ''}`}>
                <Lock size={20} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                  placeholder={t('auth.passwordPlaceholder')}
                  className="form-input"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && touchedFields.password && (
                <div className="error-message">
                  <AlertCircle size={14} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span className="checkbox-text">{t('auth.rememberMe')}</span>
              </label>
              <a href="/forgot-password" className="forgot-link">
                {t('auth.forgotPassword')}
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader size={20} className="spinner" />
                  {t('auth.loggingIn')}
                </>
              ) : (
                t('auth.signIn')
              )}
            </button>

            {/* Security Badge */}
            <div className="security-badge">
              🔒 {t('auth.secureLogin')}
            </div>

            {/* Register Link */}
            <div className="form-footer">
              <p>
                {t('auth.noAccount')}{' '}
                <a href="/register" className="register-link">
                  {t('auth.registerHere')}
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
