import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiList, FiActivity, FiBarChart2, FiCheckSquare, FiClipboard, FiPackage, FiStar, FiPlusCircle } from 'react-icons/fi';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for demonstration
const mockPRDs = [
  {
    id: 1, 
    title: 'E-commerce Mobile App',
    category: 'Mobile App',
    steps: [
      { id: 1, title: 'Define User Requirements', completed: true },
      { id: 2, title: 'Design User Interface', completed: true },
      { id: 3, title: 'Implement Authentication', completed: false },
      { id: 4, title: 'Create Product Catalog', completed: false },
      { id: 5, title: 'Add Shopping Cart Functionality', completed: false },
      { id: 6, title: 'Test and Deploy', completed: false },
    ],
    progress: 33, // percentage completed
    dateCreated: '2023-03-15'
  },
  {
    id: 2, 
    title: 'Task Management Platform',
    category: 'Web App',
    steps: [
      { id: 1, title: 'Define Core Features', completed: true },
      { id: 2, title: 'Design User Interface', completed: false },
      { id: 3, title: 'Implement Task CRUD', completed: false },
      { id: 4, title: 'Add User Collaboration', completed: false },
      { id: 5, title: 'Test and Deploy', completed: false },
    ],
    progress: 20,
    dateCreated: '2023-03-10'
  },
  {
    id: 3, 
    title: 'Health Monitoring IoT Device',
    category: 'IoT',
    steps: [
      { id: 1, title: 'Define Health Metrics', completed: true },
      { id: 2, title: 'Design Hardware Specs', completed: true },
      { id: 3, title: 'Design User Interface', completed: true },
      { id: 4, title: 'Implement Data Collection', completed: false },
      { id: 5, title: 'Add Alert System', completed: false },
      { id: 6, title: 'Test with Users', completed: false },
      { id: 7, title: 'Finalize Production Specs', completed: false },
    ],
    progress: 43,
    dateCreated: '2023-03-05'
  },
  {
    id: 4, 
    title: 'AI-powered Content Generator',
    category: 'AI/ML',
    steps: [
      { id: 1, title: 'Define Use Cases', completed: true },
      { id: 2, title: 'Select AI Model Architecture', completed: true },
      { id: 3, title: 'Design User Interface', completed: true },
      { id: 4, title: 'Implement Content Generation', completed: true },
      { id: 5, title: 'Add User Feedback Loop', completed: false },
      { id: 6, title: 'Test and Refine', completed: false },
    ],
    progress: 67,
    dateCreated: '2023-03-01'
  },
];

const mockIdeas = [
  { id: 1, title: 'AR Navigation for Museums', category: 'AR/VR', dateCreated: '2023-03-18' },
  { id: 2, title: 'Smart Home Energy Optimizer', category: 'IoT', dateCreated: '2023-03-17' },
  { id: 3, title: 'Personalized Learning Platform', category: 'Education', dateCreated: '2023-03-16' },
  { id: 4, title: 'Healthcare Appointment Scheduler', category: 'Healthcare', dateCreated: '2023-03-15' },
  { id: 5, title: 'Sustainable Food Delivery Service', category: 'Food Service', dateCreated: '2023-03-14' },
];

const categoryData = {
  labels: ['Mobile App', 'Web App', 'IoT', 'AI/ML', 'AR/VR', 'Education', 'Healthcare', 'Food Service'],
  datasets: [
    {
      label: 'Number of PRDs',
      data: [1, 1, 1, 1, 0, 0, 0, 0],
      backgroundColor: 'rgba(138, 79, 255, 0.8)',
      borderColor: 'rgba(138, 79, 255, 1)',
      borderWidth: 1,
    },
    {
      label: 'Number of Ideas',
      data: [0, 0, 1, 0, 1, 1, 1, 1],
      backgroundColor: 'rgba(64, 223, 223, 0.8)',
      borderColor: 'rgba(64, 223, 223, 1)',
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Projects by Category',
      color: '#FFFFFF',
      font: {
        size: 16,
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#AAAAAA',
      },
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#AAAAAA',
      },
    },
  },
};

// Styled Components
const DashboardContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr;
  }
`;

const AnalyticsSection = styled.div`
  grid-column: 1 / -1;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }
`;

const PRDTrackingSection = styled.div`
  grid-column: 1 / -1;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
`;

const IdeasSection = styled.div`
  grid-column: 1 / -1;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text};
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ChartContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${props => props.theme.borderRadius};
  padding: 1.5rem;
  height: 400px;
  margin-bottom: 2rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const MetricCard = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${props => props.theme.borderRadius};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: ${props => props.theme.text};
`;

const MetricLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.textLight};
  text-align: center;
`;

const MetricIcon = styled.div`
  font-size: 1.5rem;
  color: ${props => props.theme.purple.main};
  margin-bottom: 0.5rem;
`;

const AnalyticsReport = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${props => props.theme.borderRadius};
  padding: 1.5rem;
`;

const ReportTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
`;

const ReportText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${props => props.theme.textLight};
  margin-bottom: 1rem;
`;

const PRDCard = styled(Card)`
  margin-bottom: 1rem;
`;

const PRDHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PRDTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0;
`;

const PRDCategory = styled.span`
  font-size: 0.8rem;
  background-color: rgba(138, 79, 255, 0.3);
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
`;

const PRDProgress = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  margin: 1rem 0;
  overflow: hidden;
`;

const PRDProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: ${props => props.theme.purple.main};
  border-radius: 1rem;
`;

const NextStepBox = styled.div`
  background-color: rgba(64, 223, 223, 0.1);
  border-left: 3px solid ${props => props.theme.green.main};
  padding: 1rem;
  margin-top: 1rem;
`;

const NextStepTitle = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NextStepAction = styled.button`
  background-color: transparent;
  border: 1px solid ${props => props.theme.green.main};
  color: ${props => props.theme.green.main};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(64, 223, 223, 0.1);
  }
`;

const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${props => props.theme.borderRadius};
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.purple.main};
  margin-bottom: 1rem;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const EmptyStateText = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.textLight};
  margin-bottom: 1.5rem;
`;

const EmptyStateButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.theme.purple.main};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.purple.dark};
  }
`;

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('prds');
  const [prds, setPrds] = useState(mockPRDs);
  const [ideas, setIdeas] = useState(mockIdeas);
  
  const markStepComplete = (prdId: number, stepId: number) => {
    setPrds(prevPrds => prevPrds.map(prd => {
      if (prd.id === prdId) {
        const updatedSteps = prd.steps.map(step => 
          step.id === stepId ? { ...step, completed: true } : step
        );
        
        // Calculate new progress
        const completedSteps = updatedSteps.filter(step => step.completed).length;
        const progress = Math.round((completedSteps / updatedSteps.length) * 100);
        
        return { ...prd, steps: updatedSteps, progress };
      }
      return prd;
    }));
  };
  
  const getNextStep = (prd: typeof mockPRDs[0]) => {
    return prd.steps.find(step => !step.completed);
  };
  
  const getTotalIdeas = () => {
    return ideas.length;
  };
  
  const getTotalPRDs = () => {
    return prds.length;
  };
  
  const getAverageProgress = () => {
    if (prds.length === 0) return 0;
    const total = prds.reduce((sum, prd) => sum + prd.progress, 0);
    return Math.round(total / prds.length);
  };
  
  const getCompletedSteps = () => {
    return prds.reduce((sum, prd) => {
      return sum + prd.steps.filter(step => step.completed).length;
    }, 0);
  };
  
  return (
    <Layout>
    <DashboardContainer>
        <AnalyticsSection>
          <SectionTitle>
            <FiBarChart2 /> Dashboard Analytics
          </SectionTitle>
          
          <MetricsGrid>
            <MetricCard>
              <MetricIcon>
                <FiList />
              </MetricIcon>
              <MetricValue>{getTotalPRDs()}</MetricValue>
              <MetricLabel>Total PRDs</MetricLabel>
            </MetricCard>
            
            <MetricCard>
              <MetricIcon>
                <FiStar />
              </MetricIcon>
              <MetricValue>{getTotalIdeas()}</MetricValue>
              <MetricLabel>Saved Ideas</MetricLabel>
            </MetricCard>
            
            <MetricCard>
              <MetricIcon>
                <FiActivity />
              </MetricIcon>
              <MetricValue>{getAverageProgress()}%</MetricValue>
              <MetricLabel>Average Progress</MetricLabel>
            </MetricCard>
            
            <MetricCard>
              <MetricIcon>
                <FiCheckSquare />
              </MetricIcon>
              <MetricValue>{getCompletedSteps()}</MetricValue>
              <MetricLabel>Completed Steps</MetricLabel>
            </MetricCard>
          </MetricsGrid>
          
          <ChartContainer>
            <Bar data={categoryData} options={chartOptions} />
          </ChartContainer>
          
          <AnalyticsReport>
            <ReportTitle>Weekly Progress Report</ReportTitle>
            <ReportText>
              You've been making steady progress on your projects! Your most active category this week is 
              <strong> AI/ML</strong> with 67% completion rate.
            </ReportText>
            <ReportText>
              We notice you have 3 PRDs below 50% completion. Consider focusing on these projects to maintain 
              consistent progress across all your initiatives.
            </ReportText>
            <ReportText>
              You've completed {getCompletedSteps()} steps across all projects this week, which puts you 
              ahead of 75% of users. Keep up the great work!
            </ReportText>
          </AnalyticsReport>
        </AnalyticsSection>
        
        <PRDTrackingSection>
          <SectionTitle>
            <FiClipboard /> PRD Tracker
          </SectionTitle>
          
          {prds.length > 0 ? (
            prds.map(prd => {
              const nextStep = getNextStep(prd);
              
              return (
                <PRDCard key={prd.id}>
                  <PRDHeader>
                    <PRDTitle>{prd.title}</PRDTitle>
                    <PRDCategory>{prd.category}</PRDCategory>
                  </PRDHeader>
                  
                  <PRDProgress>
                    <PRDProgressFill progress={prd.progress} />
                  </PRDProgress>
                  
                  <div>Progress: {prd.progress}% complete</div>
                  
                  {nextStep && (
                    <NextStepBox>
                      <NextStepTitle>
                        <FiCheckSquare /> Next Step
                      </NextStepTitle>
                      <div>{nextStep.title}</div>
                      <NextStepAction 
                        onClick={() => markStepComplete(prd.id, nextStep.id)}
                      >
                        <FiCheckSquare /> Mark as Complete
                      </NextStepAction>
                    </NextStepBox>
                  )}
                </PRDCard>
              );
            })
          ) : (
            <EmptyStateContainer>
              <EmptyStateIcon>
                <FiClipboard />
              </EmptyStateIcon>
              <EmptyStateTitle>No PRDs yet</EmptyStateTitle>
              <EmptyStateText>
                Start generating PRDs for your ideas to track your progress here.
              </EmptyStateText>
              <EmptyStateButton to="/">
                <FiPlusCircle /> Generate a PRD
              </EmptyStateButton>
            </EmptyStateContainer>
          )}
        </PRDTrackingSection>
        
        <IdeasSection>
          <SectionTitle>
            <FiPackage /> Saved Ideas
          </SectionTitle>
          
          {ideas.length > 0 ? (
            ideas.map(idea => (
              <Card key={idea.id}>
                <PRDHeader>
                  <PRDTitle>{idea.title}</PRDTitle>
                  <PRDCategory>{idea.category}</PRDCategory>
                </PRDHeader>
                <div>Created: {idea.dateCreated}</div>
              </Card>
            ))
          ) : (
            <EmptyStateContainer>
              <EmptyStateIcon>
                <FiPackage />
              </EmptyStateIcon>
              <EmptyStateTitle>No saved ideas</EmptyStateTitle>
              <EmptyStateText>
                Save ideas that inspire you to see them here.
              </EmptyStateText>
              <EmptyStateButton to="/">
                <FiPlusCircle /> Generate Ideas
              </EmptyStateButton>
            </EmptyStateContainer>
          )}
        </IdeasSection>
    </DashboardContainer>
    </Layout>
  );
};

export default DashboardPage; 