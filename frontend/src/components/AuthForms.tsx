import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.purple.main};
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background: ${props => props.theme.colors.purple.main};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  cursor: pointer;
  transition: ${props => props.theme.transition};
  
  &:hover {
    background: ${props => props.theme.colors.purple.dark};
  }
  
  &:disabled {
    background: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  margin-top: 0.5rem;
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${props => props.theme.colors.text.secondary};
  
  span {
    color: ${props => props.theme.colors.purple.main};
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

interface AuthFormsProps {
  initialMode?: 'signin' | 'signup';
}

const AuthForms: React.FC<AuthFormsProps> = ({ initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password, name);
        if (error) throw error;
        // After signup, automatically sign in
        const signInResult = await signIn(email, password);
        if (signInResult.error) throw signInResult.error;
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
      }
      
      // Redirect to dashboard on success
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : mode === 'signup' ? 'Sign Up' : 'Sign In'}
        </Button>
      </Form>
      
      <ToggleText>
        {mode === 'signin' ? (
          <>
            Don't have an account?{' '}
            <span onClick={() => setMode('signup')}>Sign Up</span>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <span onClick={() => setMode('signin')}>Sign In</span>
          </>
        )}
      </ToggleText>
    </FormContainer>
  );
};

export default AuthForms; 