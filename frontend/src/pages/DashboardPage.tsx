import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';
import { FiList, FiActivity, FiBarChart2, FiCheckSquare, FiClipboard, FiPackage, FiStar, FiPlusCircle, FiClock, FiSettings, FiRefreshCw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { PageTitle, Container, Button } from '../styles/shared';

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
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;


const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HistoryItem = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PreferencesSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const PreferencesForm = styled.form`
  display: grid;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #111;
`;

const Toggle = styled.input`
  width: 3rem;
  height: 1.5rem;
  appearance: none;
  background: #ddd;
  border-radius: 1rem;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;

  &:checked {
    background: #0070f3;
  }

  &:before {
    content: '';
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background: white;
    top: 0.15rem;
    left: 0.15rem;
    transition: transform 0.3s;
  }

  &:checked:before {
    transform: translateX(1.5rem);
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

interface Project {
  id: string;
  title: string;
  category: string;
  steps: {
    id: number;
    title: string;
    completed: boolean;
  }[];
  progress: number;
  created_at: string;
}

interface Idea {
  id: string;
  title: string;
  category: string;
  created_at: string;
}

interface IdeaHistory {
  id: string;
  idea_text: string;
  generated_prd: string;
  generated_at: string;
  favorite: boolean;
  tags: string[];
}

interface UserPreferences {
  theme: 'light' | 'dark';
  notification_enabled: boolean;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ideaHistory, setIdeaHistory] = useState<IdeaHistory[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    notification_enabled: true,
  });

  // Fetch user's projects and ideas
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (projectsError) throw projectsError;

        // Fetch ideas
        const { data: ideasData, error: ideasError } = await supabase
          .from('ideas')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (ideasError) throw ideasError;

        // Fetch idea history
        const { data: historyData, error: historyError } = await supabase
          .from('idea_history')
          .select('*')
          .eq('user_id', user.id)
          .order('generated_at', { ascending: false });

        if (historyError) throw historyError;

        // Fetch user preferences
        const { data: prefsData, error: prefsError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (prefsError && prefsError.code !== 'PGRST116') { // Not found error
          throw prefsError;
        }

        setProjects(projectsData || []);
        setIdeas(ideasData || []);
        setIdeaHistory(historyData || []);

        if (prefsData) {
          setPreferences(prefsData);
        } else {
          // Create default preferences if none exist
          const { error: insertError } = await supabase
            .from('user_preferences')
            .insert([
              {
                user_id: user.id,
                theme: 'light',
                notification_enabled: true,
              },
            ]);

          if (insertError) throw insertError;
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch dashboard data');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    const projectsSubscription = supabase
      .channel('projects_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    const ideasSubscription = supabase
      .channel('ideas_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ideas',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchIdeas();
        }
      )
      .subscribe();

    const historySubscription = supabase
      .channel('idea_history_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'idea_history',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          fetchData(); // Refresh data when changes occur
        }
      )
      .subscribe();

    const prefsSubscription = supabase
      .channel('preferences_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_preferences',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          fetchData(); // Refresh data when changes occur
        }
      )
      .subscribe();

    return () => {
      projectsSubscription.unsubscribe();
      ideasSubscription.unsubscribe();
      historySubscription.unsubscribe();
      prefsSubscription.unsubscribe();
    };
  }, [user]);

  const fetchProjects = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const fetchIdeas = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIdeas(data || []);
    } catch (err) {
      console.error('Error fetching ideas:', err);
    }
  };

  const markStepComplete = async (projectId: string, stepId: number) => {
    if (!user) return;

    try {
      const project = projects.find(p => p.id === projectId);
      if (!project) return;

      const updatedSteps = project.steps.map(step =>
        step.id === stepId ? { ...step, completed: true } : step
      );

      const progress = Math.round(
        (updatedSteps.filter(step => step.completed).length / updatedSteps.length) * 100
      );

      const { error } = await supabase
        .from('projects')
        .update({
          steps: updatedSteps,
          progress,
          updated_at: new Date().toISOString(),
        })
        .eq('id', projectId)
        .eq('user_id', user.id);

      if (error) throw error;
      await fetchProjects();
    } catch (err) {
      console.error('Error updating step:', err);
    }
  };

  const getNextStep = (project: Project) => {
    return project.steps.find(step => !step.completed);
  };

  const getTotalIdeas = () => ideas.length;
  const getTotalProjects = () => projects.length;
  const getTotalFavorites = () => favorites.length;

  const getAverageProgress = () => {
    if (projects.length === 0) return 0;
    const totalProgress = projects.reduce((sum, project) => sum + project.progress, 0);
    return Math.round(totalProgress / projects.length);
  };

  const getCompletedSteps = () => {
    return projects.reduce((total, project) => {
      return total + project.steps.filter(step => step.completed).length;
    }, 0);
  };

  const handlePreferencesUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, type } = e.target;
    const value = type === 'checkbox' ? checked : e.target.value;

    try {
      const { error } = await supabase
        .from('user_preferences')
        .update({ [name]: value })
        .eq('user_id', user?.id);

      if (error) throw error;

      setPreferences(prev => ({
        ...prev,
        [name]: value,
      }));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage>{error}</ErrorMessage>
      </Layout>
    );
  }

  // Update category data based on real data
  const categoryData = {
    labels: Array.from(new Set([...projects.map(p => p.category), ...ideas.map(i => i.category)])),
    datasets: [
      {
        label: 'Number of Projects',
        data: projects.reduce((acc, project) => {
          acc[project.category] = (acc[project.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        backgroundColor: 'rgba(138, 79, 255, 0.8)',
        borderColor: 'rgba(138, 79, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Number of Ideas',
        data: ideas.reduce((acc, idea) => {
          acc[idea.category] = (acc[idea.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        backgroundColor: 'rgba(64, 223, 223, 0.8)',
        borderColor: 'rgba(64, 223, 223, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Layout>
      <Container>
        <PageTitle>Dashboard</PageTitle>
        <DashboardContainer>
          <Header>
            <PageTitle>Dashboard</PageTitle>
          </Header>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <StatsGrid>
            <StatCard>
              <StatValue>{getTotalProjects()}</StatValue>
              <StatLabel>Total Projects</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{getTotalIdeas()}</StatValue>
              <StatLabel>Total Ideas</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{getTotalFavorites()}</StatValue>
              <StatLabel>Favorite Ideas</StatLabel>
            </StatCard>
          </StatsGrid>

          <PreferencesSection>
            <h2>Preferences</h2>
            <PreferencesForm>
              <FormGroup>
                <Label htmlFor="theme">Dark Theme</Label>
                <Toggle
                  type="checkbox"
                  id="theme"
                  name="theme"
                  checked={preferences.theme === 'dark'}
                  onChange={(e) => handlePreferencesUpdate({
                    ...e,
                    target: {
                      ...e.target,
                      name: 'theme',
                      value: e.target.checked ? 'dark' : 'light',
                    },
                  } as any)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="notifications">Notifications</Label>
                <Toggle
                  type="checkbox"
                  id="notifications"
                  name="notification_enabled"
                  checked={preferences.notification_enabled}
                  onChange={handlePreferencesUpdate}
                />
              </FormGroup>
            </PreferencesForm>
          </PreferencesSection>

          <h2>Recent Activity</h2>
          <HistoryList>
            {ideaHistory.map((item) => (
              <HistoryItem key={item.id}>
                <span>{item.idea_text}</span>
                {item.favorite && <FiStar style={{ color: '#ffd700' }} />}
              </HistoryItem>
            ))}
          </HistoryList>
        </DashboardContainer>
      </Container>
    </Layout>
  );
};

export default DashboardPage; 