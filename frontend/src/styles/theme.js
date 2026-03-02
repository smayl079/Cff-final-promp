// Design System Theme
export const theme = {
  colors: {
    // Primary Colors
    primary: '#1A3C5D',
    primaryLight: '#2A4C6D',
    primaryDark: '#0A2C4D',
    
    // Secondary Colors
    secondary: '#FF6B35',
    secondaryLight: '#FF8555',
    secondaryDark: '#E55525',
    
    // Accent Colors
    accent: '#4ECDC4',
    accentLight: '#6EDDD4',
    accentDark: '#3EBDB4',
    
    // Background Colors
    white: '#FFFFFF',
    lightGray: '#F7F9FB',
    mediumGray: '#E8ECEF',
    darkGray: '#2C3E50',
    
    // Semantic Colors
    success: '#27AE60',
    warning: '#F39C12',
    error: '#E74C3C',
    info: '#3498DB',
    
    // Text Colors
    textPrimary: '#1A3C5D',
    textSecondary: '#6C757D',
    textLight: '#ADB5BD',
    textWhite: '#FFFFFF'
  },
  
  typography: {
    fontFamily: {
      heading: "'Poppins', 'Segoe UI', Arial, sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    
    fontSize: {
      h1: '48px',
      h2: '36px',
      h3: '24px',
      h4: '20px',
      bodyLarge: '18px',
      bodyRegular: '16px',
      bodySmall: '14px',
      caption: '12px'
    },
    
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.6
    }
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px'
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px'
  },
  
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.04)',
    md: '0 2px 8px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    xl: '0 12px 48px rgba(0, 0, 0, 0.15)'
  },
  
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1440px'
  }
};
