import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    });
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleComplete = async (id, completed) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed })
    });
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !completed } : t));
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggle={toggleComplete}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
