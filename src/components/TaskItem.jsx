function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div className="task-item">
      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.title}
      </span>
      <div>
        <button onClick={() => onToggle(task.id, task.completed)}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
