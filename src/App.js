import React from 'react';
import './App.css';
import TaskManager from './components/TaskManager';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>TaskMate</h1>
        <p>A beginner-friendly task manager</p>
      </header>
      <TaskManager />
    </div>
  );
}

export default App;
