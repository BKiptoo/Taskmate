import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './TaskManager.css';

const TaskManager = () => {
  // State to hold all tasks
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  // State to control which section to show
  const [activeSection, setActiveSection] = useState('list');

  // API base URL
  const API_URL = 'http://localhost:3001/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      const simpleTasks = response.data.map(task => ({
        id: task.id,
        title: task.title,
        completed: task.status === 'completed'
      }));
      setTasks(simpleTasks);
      setError(null);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks. Make sure the JSON server is running.');
      setTasks([]);
    }
  };

  // Function to add a new task
  const addTask = async (taskTitle) => {
    try {
      const newTaskData = {
        title: taskTitle,
        description: '',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const response = await axios.post(API_URL, newTaskData);
      
      // Add to local state in simple format
      const newTask = {
        id: response.data.id,
        title: response.data.title,
        completed: false
      };
      
      setTasks([...tasks, newTask]);
      setActiveSection('list'); // Switch to list after adding
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task. Please try again.');
    }
  };

  // Function to toggle task completion
  const toggleTask = async (taskId) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === taskId);
      if (!taskToUpdate) return;

      const updatedStatus = taskToUpdate.completed ? 'pending' : 'completed';
      await axios.patch(`${API_URL}/${taskId}`, {
        status: updatedStatus,
        updatedAt: new Date().toISOString()
      });

      // Update local state
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  // Function to delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };


  // Error state
  if (error) {
    return (
      <div className="task-manager">
        <div className="error">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button onClick={fetchTasks} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-manager">
      {/* Simple Navigation Buttons */}
      <div className="nav-buttons">
        <button 
          className={activeSection === 'list' ? 'active' : ''}
          onClick={() => setActiveSection('list')}
        >
         My Tasks ({tasks.length})
        </button>
        <button 
          className={activeSection === 'add' ? 'active' : ''}
          onClick={() => setActiveSection('add')}
        >
          Add Task
        </button>
      </div>

      {/* Conditional rendering based on activeSection */}
      <div className="content">
        {activeSection === 'list' && (
          <TaskList 
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        )}

        {activeSection === 'add' && (
          <TaskForm onAddTask={addTask} />
        )}
      </div>
    </div>
  );
};

export default TaskManager;
