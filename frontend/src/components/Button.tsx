import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  as?: React.ElementType;
  to?: string;
}

// Styled component for button with polymorphic "as" prop
const StyledButton = styled.button.attrs<{ as?: React.ElementType }>(
  ({ as }) => ({ as: as || 'button' })
)<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
  hasIcon: boolean;
  iconPosition: 'left' | 'right';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
  
  ${props => props.iconPosition === 'right' && css`
    flex-direction: row-reverse;
  `}
  
  ${props => {
    switch (props.size) {
      case 'small':
        return css`
          padding: 8px 16px;
          font-size: 14px;
        `;
      case 'large':
        return css`
          padding: 16px 28px;
          font-size: 18px;
        `;
      default: // medium
        return css`
          padding: 12px 24px;
          font-size: 16px;
        `;
    }
  }}
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return css`
          background: linear-gradient(135deg, #ADFF2F, #90EE90);
          color: #000;
          border: none;
          
          &:hover {
            background: linear-gradient(135deg, #9AEF1A, #7CDF7C);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(173, 255, 47, 0.3);
          }
          
          &:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(173, 255, 47, 0.2);
          }
        `;
      case 'secondary':
        return css`
          background: #5D3FD3;
          color: #fff;
          border: none;
          
          &:hover {
            background: #4B2FBC;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(93, 63, 211, 0.3);
          }
          
          &:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(93, 63, 211, 0.2);
          }
        `;
      case 'tertiary':
        return css`
          background: #222;
          color: #ADFF2F;
          border: none;
          
          &:hover {
            background: #333;
            transform: translateY(-2px);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
      case 'outline':
        return css`
          background: transparent;
          color: #ADFF2F;
          border: 2px solid #ADFF2F;
          
          &:hover {
            background: rgba(173, 255, 47, 0.1);
            transform: translateY(-2px);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
      case 'text':
        return css`
          background: transparent;
          color: #ADFF2F;
          border: none;
          padding-left: 8px;
          padding-right: 8px;
          
          &:hover {
            text-decoration: underline;
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// Loading spinner component
const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: currentColor;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  disabled,
  as,
  to,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      hasIcon={!!icon}
      iconPosition={iconPosition}
      className={className}
      disabled={disabled || loading}
      as={as}
      to={to}
      {...rest}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {icon && icon}
          {children}
        </>
      )}
    </StyledButton>
  );
};

export default Button; 