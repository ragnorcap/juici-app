import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const LogoWrapper = styled(Link)<{ size: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  color: white;
`;

const LogoText = styled.span<{ size: string }>`
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '1.8rem';
      case 'medium': return '2.5rem';
      case 'large': return '4rem';
      default: return '2.5rem';
    }
  }};
  font-weight: 800;
  background: linear-gradient(135deg, #ADFF2F, #64DFDF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`;

const LogoIcon = styled.div<{ size: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => {
    switch (props.size) {
      case 'small': return '2rem';
      case 'medium': return '3rem';
      case 'large': return '5rem';
      default: return '3rem';
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'small': return '2rem';
      case 'medium': return '3rem';
      case 'large': return '5rem';
      default: return '3rem';
    }
  }};
  border-radius: 50%;
  background: linear-gradient(135deg, #ADFF2F, #64DFDF);
  color: #2D0157;
  font-weight: bold;
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '1.2rem';
      case 'medium': return '1.8rem';
      case 'large': return '3rem';
      default: return '1.8rem';
    }
  }};
`;

const Logo: React.FC<LogoProps> = ({ className, size = 'medium' }) => {
  return (
    <LogoWrapper to="/" className={className} size={size}>
      <LogoIcon size={size}>🧃</LogoIcon>
      <LogoText size={size}>Juici</LogoText>
    </LogoWrapper>
  );
};

export default Logo; 