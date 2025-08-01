import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from db.json
  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await fetch("http://localhost:3001/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    getTasks();
  }, []);

// This will handle deletion of task
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
    }
  };

    // This will handle completion of task
  const toggleComplete = async (id, completed) => {
    try {
      const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed })
      });
      if (!res.ok) throw new Error("Failed to update task");
      setTasks(tasks.map(task => task.id === id ? { ...task, completed: !completed } : task));
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
    }
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
