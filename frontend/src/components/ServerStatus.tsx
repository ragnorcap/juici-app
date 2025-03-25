import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';
import { FiServer, FiAlertCircle, FiCheck, FiRefreshCw } from 'react-icons/fi';
import { checkServerConnection } from '../api/health';

// Styled components
const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  background: rgba(0, 0, 0, 0.2);
`;

const StatusIconWrapper = styled.div<{ status: 'connected' | 'disconnected' | 'checking' | 'retry' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => 
    props.status === 'connected' 
      ? props.theme.colors.green.main
      : props.status === 'disconnected'
        ? '#ff4d4f'
        : props.status === 'retry'
          ? props.theme.colors.yellow.main
          : props.theme.colors.yellow.main
  };
`;

const StatusMessage = styled.span`
  color: #fff;
`;

const ServerStatus: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking' | 'retry'>('checking');
  const [statusMessage, setStatusMessage] = useState<string>('Checking server connection...');
  const [retries, setRetries] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    // Check connection on component mount and periodically
    const checkConnection = async () => {
      try {
        // Reset status to checking
        setConnectionStatus('checking');
        setStatusMessage('Checking server connection...');

        const { isConnected, status, error } = await checkServerConnection();

        if (isConnected && status) {
          setConnectionStatus('connected');
          const dbStatus = status.database === 'connected' ? 'Database connected' : 'supabase';
          setStatusMessage(`Server connected: ${dbStatus}`);
          // Reset retries on successful connection
          setRetries(0);
        } else {
          // Increment retries
          const newRetryCount = retries + 1;
          setRetries(newRetryCount);

          if (newRetryCount <= MAX_RETRIES) {
            // Retry mode
            setConnectionStatus('retry');
            setStatusMessage(`Connection attempt ${newRetryCount}/${MAX_RETRIES}: ${error?.message || 'Retrying...'}`);
          } else {
            // Max retries reached
            setConnectionStatus('disconnected');
            setStatusMessage(`Server connection failed after ${MAX_RETRIES} attempts`);
          }
        }
      } catch (err) {
        // Increment retries
        const newRetryCount = retries + 1;
        setRetries(newRetryCount);

        if (newRetryCount <= MAX_RETRIES) {
          // Retry mode
          setConnectionStatus('retry');
          setStatusMessage(`Connection attempt ${newRetryCount}/${MAX_RETRIES}: ${err instanceof Error ? err.message : 'Network error'}`);
        } else {
          // Max retries reached
          setConnectionStatus('disconnected');
          setStatusMessage(`Server connection failed after ${MAX_RETRIES} attempts`);
        }
      }
    };

    // Run check immediately
    checkConnection();
    
    // Setup periodic health checks with exponential backoff
    const intervalMs = Math.min(30000 * (retries + 1), 5 * 60 * 1000); // Max 5 minutes
    const intervalId = setInterval(checkConnection, intervalMs);
    
    return () => clearInterval(intervalId);
  }, [retries]);

  // Render server status indicator
  return (
    <StatusContainer>
      <StatusIconWrapper status={connectionStatus}>
        {connectionStatus === 'connected' ? (
          <FiCheck />
        ) : connectionStatus === 'disconnected' ? (
          <FiAlertCircle />
        ) : connectionStatus === 'retry' ? (
          <FiRefreshCw />
        ) : (
          <FiServer />
        )}
      </StatusIconWrapper>
      <StatusMessage>{statusMessage}</StatusMessage>
    </StatusContainer>
  );
};

export default ServerStatus; 