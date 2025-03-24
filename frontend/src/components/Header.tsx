import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiArrowRight, FiZap } from 'react-icons/fi';
import Button from './Button';
import { getCurrentUser, signOut } from '../lib/supabase';
import Logo from './Logo';

// Styled components
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NavLinks = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: rgba(20, 20, 20, 0.9);
    backdrop-filter: blur(10px);
    padding: 2rem 1rem;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    transform: ${({ $isOpen }) => $isOpen ? 'translateY(0)' : 'translateY(-150%)'};
    opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  text-decoration: none;
  color: ${({ $isActive }) => $isActive ? '#ADFF2F' : 'white'};
  font-weight: ${({ $isActive }) => $isActive ? '600' : '400'};
  font-size: 1rem;
  padding: 0.5rem;
  position: relative;
  transition: all 0.2s ease;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #ADFF2F, #90EE90);
    transform: ${({ $isActive }) => $isActive ? 'scaleX(1)' : 'scaleX(0)'};
    transform-origin: bottom left;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #ADFF2F;
    &:after {
      transform: scaleX(1);
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

// Header component
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      setIsLoggedIn(!!user);
    };
    
    checkAuth();
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleSignOut = async () => {
    await signOut();
    setIsLoggedIn(false);
  };
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  return (
    <HeaderContainer>
      <Logo />
      
      <MobileMenuButton onClick={toggleMenu}>
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </MobileMenuButton>
      
      <NavLinks $isOpen={isMenuOpen}>
        <NavLink to="/" $isActive={location.pathname === '/'}>
          Home
        </NavLink>
        <NavLink to="/dashboard" $isActive={location.pathname === '/dashboard'}>
          Dashboard
        </NavLink>
        <NavLink to="/favorites" $isActive={location.pathname === '/favorites'}>
          Favorites
        </NavLink>
        <NavLink to="/tutorials" $isActive={location.pathname === '/tutorials'}>
          Tutorials
        </NavLink>
        <NavLink to="/blog" $isActive={location.pathname === '/blog'}>
          Blog
        </NavLink>
        
        {isLoggedIn ? (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button
              variant="primary"
              to="/app"
              as={Link}
              $hasIcon={true}
              $iconPosition="right"
              icon={<FiZap />}
            >
              Launch App
            </Button>
            <Button onClick={handleSignOut} variant="outline">Logout</Button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button onClick={() => {/* Navigate to Login */}} variant="outline">Login</Button>
            <Button to="/signup" variant="primary">Sign Up</Button>
          </div>
        )}
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header; 