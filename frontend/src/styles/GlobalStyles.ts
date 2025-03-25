import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: ${props => props.theme.fonts.body};
    background-color: #000000;
    color: ${props => props.theme.text};
    scroll-behavior: smooth;
    overflow-x: hidden;
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  h1 {
    font-size: 3rem;
    font-weight: ${props => props.theme.fonts.weights.bold};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: 2.5rem;
    font-weight: ${props => props.theme.fonts.weights.semiBold};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 2rem;
    font-weight: ${props => props.theme.fonts.weights.semiBold};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 1.75rem;
    }
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: ${props => props.theme.text};
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      color: ${props => props.theme.green.main};
    }
  }

  ul, ol {
    margin-left: 2rem;
    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    font-family: ${props => props.theme.fonts.body};
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #111;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.purple.dark};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.purple.main};
  }

  /* Selection style */
  ::selection {
    background: ${props => props.theme.green.main};
    color: #000;
  }
`;

export default GlobalStyles; 