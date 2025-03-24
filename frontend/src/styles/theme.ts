export const theme = {
  // Base colors
  background: '#121212',
  text: '#FFFFFF',
  textLight: '#AAAAAA',
  
  // Color palette
  purple: {
    light: '#B088F9',
    main: '#8A4FFF',
    dark: '#6930C3',
  },
  green: {
    light: '#80FFDB',
    main: '#64DFDF',
    dark: '#48BFE3',
  },
  blue: {
    light: '#56CFE1',
    main: '#4EA8DE',
    dark: '#5E60CE',
  },
  yellow: {
    light: '#FFD166',
    main: '#EFB90B',
    dark: '#E09F3E',
  },
  red: {
    light: '#FF9F9F',
    main: '#FF5C5C',
    dark: '#C9184A',
  },

  // Functional colors
  success: '#64DFDF',
  error: '#FF5C5C',
  warning: '#FFD166',
  info: '#4EA8DE',
  
  // Backward compatibility
  colors: {
    primary: {
      light: '#B088F9',
      main: '#8A4FFF',
      dark: '#6930C3',
    },
    purple: {
      light: '#B088F9',
      main: '#8A4FFF',
      dark: '#6930C3',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#AAAAAA',
    },
    background: {
      primary: '#121212',
      secondary: '#1E1E1E'
    },
    green: {
      light: '#80FFDB',
      main: '#64DFDF',
      dark: '#48BFE3',
    },
    yellow: {
      light: '#FFD166',
      main: '#EFB90B',
      dark: '#E09F3E',
    },
    border: 'rgba(255, 255, 255, 0.1)',
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
    weights: {
      extraLight: 200,
      light: 300,
      regular: 400,
      semiBold: 600,
      bold: 700,
    },
  },
  breakpoints: {
    xs: '480px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
    xl: '1440px',
  },
  borderRadius: '8px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  transition: '0.3s ease',
  maxWidth: '1400px',
};

export type ThemeType = typeof theme; 