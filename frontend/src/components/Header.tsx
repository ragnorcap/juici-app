import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HeaderContainer = styled.header`
  background: ${props => props.theme.colors.background.secondary};
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.purple.main};
  text-decoration: none;
  
  &:hover {
    color: ${props => props.theme.colors.purple.light};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  font-weight: ${props => props.theme.fonts.weights.medium};
  transition: ${props => props.theme.transition};
  
  &:hover {
    color: ${props => props.theme.colors.purple.main};
  }
`;

const AuthButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  transition: ${props => props.theme.transition};
  text-decoration: none;
  
  &.signin {
    color: ${props => props.theme.colors.purple.main};
    
    &:hover {
      color: ${props => props.theme.colors.purple.light};
    }
  }
  
  &.signup {
    background: ${props => props.theme.colors.purple.main};
    color: white;
    
    &:hover {
      background: ${props => props.theme.colors.purple.dark};
    }
  }
`;

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">Juici</Logo>
        <NavLinks>
          {user ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/favorites">Favorites</NavLink>
              <NavLink to="/planner">Planner</NavLink>
              <AuthButton as="button" onClick={handleSignOut} className="signin">
                Sign Out
              </AuthButton>
            </>
          ) : (
            <>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/tutorials">Tutorials</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <AuthButton to="/signin" className="signin">Sign In</AuthButton>
              <AuthButton to="/signup" className="signup">Sign Up</AuthButton>
            </>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 