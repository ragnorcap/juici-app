import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'text' | 'success' | 'danger' | 'ghost' | 'link';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  $fullWidth?: boolean;
  icon?: React.ReactNode;
  $hasIcon?: boolean;
  $iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  as?: React.ElementType;
  to?: string;
  $status?: 'idle' | 'loading' | 'success' | 'error';
  style?: React.CSSProperties;
  $customBg?: string;
  $customColor?: string;
  $marginTop?: string;
}

const StyledButton = styled.button<{
  variant?: ButtonVariant;
  size?: ButtonSize;
  $fullWidth?: boolean;
  $hasIcon?: boolean;
  $iconPosition?: 'left' | 'right';
  $status?: string;
  $customBg?: string;
  $customColor?: string;
  $marginTop?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.$hasIcon ? '0.5rem' : '0'};
  flex-direction: ${props => props.$iconPosition === 'right' ? 'row-reverse' : 'row'};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  background: ${props => props.$customBg || ''};
  color: ${props => props.$customColor || ''};
  margin-top: ${props => props.$marginTop || '0'};

  ${props => {
    switch (props.size) {
      case 'small':
        return css`
          padding: 0.4rem 0.8rem;
          font-size: 0.85rem;
        `;
      case 'large':
        return css`
          padding: 0.8rem 1.8rem;
          font-size: 1.1rem;
        `;
      default:
        return css`
          padding: 0.6rem 1.2rem;
          font-size: 0.95rem;
        `;
    }
  }}

  ${props => {
    if (props.$customBg) return '';
    
    switch (props.variant) {
      case 'primary':
        return css`
          background: linear-gradient(135deg, #ADFF2F, #7CFC00);
          color: #000;
          border: none;
          
          &:hover {
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
          background: rgba(173, 255, 47, 0.1);
          color: #ADFF2F;
          border: 2px solid #ADFF2F;
          
          &:hover {
            background: rgba(173, 255, 47, 0.2);
            transform: translateY(-2px);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
      case 'tertiary':
        return css`
          background: transparent;
          color: #ADFF2F;
          border: none;
          text-decoration: underline;
          
          &:hover {
            color: #9ACD32;
          }
        `;
      case 'outline':
        return css`
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255, 255, 255, 0.3);
          
          &:hover {
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px);
          }
        `;
      case 'text':
        return css`
          background: transparent;
          color: #fff;
          border: none;
          padding: 0.5rem;
          
          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        `;
      case 'success':
        return css`
          background: linear-gradient(to right, #2ecc71, #27ae60);
          color: #fff;
          border: none;
          
          &:hover {
            background: linear-gradient(to right, #27ae60, #25a25a);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(46, 204, 113, 0.3);
          }
          
          &:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(46, 204, 113, 0.2);
          }
        `;
      case 'danger':
        return css`
          background: linear-gradient(to right, #e74c3c, #c0392b);
          color: #fff;
          border: none;
          
          &:hover {
            background: linear-gradient(to right, #c0392b, #e74c3c);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3);
          }
          
          &:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(231, 76, 60, 0.2);
          }
        `;
      case 'ghost':
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
      case 'link':
        return css`
          background: transparent;
          color: #ADFF2F;
          border: none;
          padding: 0.5rem 0.8rem;
          text-decoration: underline;
          
          &:hover {
            color: #4834d4;
            text-decoration: none;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  $fullWidth = false,
  icon,
  disabled = false,
  loading = false,
  className,
  type = 'button',
  as,
  to,
  $status = 'idle',
  style,
  $customBg,
  $customColor,
  $marginTop,
  ...rest
}) => {
  const hasIcon = rest.$hasIcon !== undefined ? rest.$hasIcon : !!icon;
  
  if (to) {
    return (
      <StyledButton
        variant={variant}
        size={size}
        $fullWidth={$fullWidth}
        $hasIcon={hasIcon}
        $iconPosition={rest.$iconPosition || 'left'}
        className={className}
        disabled={disabled || loading}
        as={Link}
        to={to}
        $status={$status}
        style={style}
        $customBg={$customBg}
        $customColor={$customColor}
        $marginTop={$marginTop}
        {...rest}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {hasIcon && icon}
            {children}
          </>
        )}
      </StyledButton>
    );
  }
  
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled || loading}
      variant={variant}
      size={size}
      $fullWidth={$fullWidth}
      $hasIcon={hasIcon}
      $iconPosition={rest.$iconPosition || 'left'}
      className={className}
      type={type}
      as={as}
      $status={$status}
      style={style}
      $customBg={$customBg}
      $customColor={$customColor}
      $marginTop={$marginTop}
      {...rest}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {hasIcon && icon}
          {children}
        </>
      )}
    </StyledButton>
  );
};

export default Button; 