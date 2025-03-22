import React from 'react';
import styled, { css } from 'styled-components';

export type CardVariant = 'default' | 'elevated' | 'glass' | 'outlined';

interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  padding?: string;
}

const CardContainer = styled.div<{
  variant: CardVariant;
  fullWidth?: boolean;
  padding?: string;
  onClick?: () => void;
}>`
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
  padding: ${props => props.padding || '24px'};
  border-radius: 16px;
  transition: all 0.3s ease;
  ${props => props.onClick && css`
    cursor: pointer;
    &:hover {
      transform: translateY(-4px);
    }
    &:active {
      transform: translateY(-2px);
    }
  `}
  
  ${props => {
    switch (props.variant) {
      case 'elevated':
        return css`
          background-color: #222;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), 
                      0 1px 3px rgba(173, 255, 47, 0.1);
          &:hover {
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2), 
                        0 2px 4px rgba(173, 255, 47, 0.15);
          }
        `;
      case 'glass':
        return css`
          background: rgba(34, 34, 34, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          &:hover {
            background: rgba(34, 34, 34, 0.75);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          }
        `;
      case 'outlined':
        return css`
          background-color: transparent;
          border: 2px solid #ADFF2F;
          &:hover {
            background-color: rgba(173, 255, 47, 0.05);
          }
        `;
      default:
        return css`
          background-color: #222;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          &:hover {
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.12);
          }
        `;
    }
  }}
`;

const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className,
  onClick,
  fullWidth,
  padding,
}) => {
  return (
    <CardContainer
      variant={variant}
      className={className}
      onClick={onClick}
      fullWidth={fullWidth}
      padding={padding}
    >
      {children}
    </CardContainer>
  );
};

export default Card; 