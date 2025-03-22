import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      purple: {
        light: string;
        main: string;
        dark: string;
      };
      green: {
        light: string;
        main: string;
        dark: string;
      };
      yellow: {
        light: string;
        main: string;
        dark: string;
      };
      indigo: {
        light: string;
        main: string;
        dark: string;
      };
      background: string;
      text: string;
      textLight: string;
    };
    fonts: {
      heading: string;
      body: string;
      weights: {
        extraLight: number;
        light: number;
        regular: number;
        semiBold: number;
        bold: number;
      };
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderRadius: string;
    boxShadow: string;
    transition: string;
    maxWidth: string;
  }
} 