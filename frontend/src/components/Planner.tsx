import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiPlus, FiCheck, FiLoader, FiTrash2, FiEdit2, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string;
  dependencies: string[];
  created_at: string;
  updated_at: string;
  user_id: string;
}

const PlannerContainer = styled.div`
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

const Title = styled.h1`
  font-size: 2rem;
  color: #111;
`;

const TaskList = styled.div`
  display: grid;
  gap: 1rem;
`;

const TaskCard = styled.div<{ $status: string }>`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => {
    switch (props.$status) {
      case 'todo': return '#dc3545';
      case 'in_progress': return '#ffc107';
      case 'completed': return '#28a745';
      default: return '#6c757d';
    }
  }};
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const TaskTitle = styled.h3`
  font-size: 1.2rem;
  color: #111;
  margin: 0;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TaskDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const TaskMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #666;
`;

const TaskStatus = styled.span<{ $status: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
  background: ${props => {
    switch (props.$status) {
      case 'todo': return '#fde8e8';
      case 'in_progress': return '#fff3cd';
      case 'completed': return '#d4edda';
      default: return '#e9ecef';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'todo': return '#dc3545';
      case 'in_progress': return '#ffc107';
      case 'completed': return '#28a745';
      default: return '#6c757d';
    }
  }};
`;

const TaskForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #111;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Planner: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
    due_date: '',
  });

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (editingTask) {
        const { error } = await supabase
          .from('tasks')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingTask.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('tasks')
          .insert([
            {
              ...formData,
              user_id: user?.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ]);

        if (error) throw error;
      }

      setShowForm(false);
      setEditingTask(null);
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        due_date: '',
      });
      fetchTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
      fetchTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      due_date: task.due_date,
    });
    setShowForm(true);
  };

  if (isLoading) {
    return (
      <PlannerContainer>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <FiLoader />
          <p>Loading tasks...</p>
        </div>
      </PlannerContainer>
    );
  }

  return (
    <PlannerContainer>
      <Header>
        <Title>Project Planner</Title>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? <FiChevronUp /> : <FiPlus />}
          {showForm ? 'Close Form' : 'Add Task'}
        </Button>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {showForm && (
        <TaskForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="priority">Priority</Label>
            <Select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="due_date">Due Date</Label>
            <Input
              id="due_date"
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
            />
          </FormGroup>

          <Button type="submit">
            {editingTask ? 'Update Task' : 'Create Task'}
          </Button>
        </TaskForm>
      )}

      <TaskList>
        {tasks.map((task) => (
          <TaskCard key={task.id} $status={task.status}>
            <TaskHeader>
              <TaskTitle>{task.title}</TaskTitle>
              <TaskActions>
                <Button onClick={() => handleEdit(task)} variant="outline" size="small">
                  <FiEdit2 />
                </Button>
                <Button onClick={() => handleDelete(task.id)} variant="outline" size="small">
                  <FiTrash2 />
                </Button>
              </TaskActions>
            </TaskHeader>
            <TaskDescription>{task.description}</TaskDescription>
            <TaskMeta>
              <TaskStatus $status={task.status}>
                {task.status.replace('_', ' ').toUpperCase()}
              </TaskStatus>
              <span>Priority: {task.priority}</span>
              <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
            </TaskMeta>
          </TaskCard>
        ))}
      </TaskList>
    </PlannerContainer>
  );
};

export default Planner; 