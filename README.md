# TaskMate - Simple Task Manager

A beginner-friendly React application for managing your daily tasks with a clean, intuitive interface.

## Features

- ✅ Add new tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ View task statistics
- ✅ Persistent data storage with JSON Server
- ✅ Responsive design

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd taskmates
```

2. Install dependencies:
```bash
npm install
```

3. Install JSON Server globally (if not already installed):
```bash
npm install -g json-server
```

### Running the Application

1. Start the JSON Server (database):
```bash
json-server --watch db.json --port 3001
```

2. In a new terminal, start the React app:
```bash
npm start
```

3. Open your browser and go to `http://localhost:3000`

## How to Use

1. **View Tasks**: Click "My Tasks" to see all your tasks
2. **Add Task**: Click "Add Task" to create a new task
3. **Complete Task**: Click on any task to mark it as complete/incomplete
4. **Delete Task**: Click the "Delete" button to remove a task
5. **View Stats**: Click "Stats" to see your progress

## Project Structure

```
src/
├── components/
│   ├── TaskManager.js    # Main component with state management
│   ├── TaskForm.js       # Form for adding new tasks
│   ├── TaskList.js       # Display list of tasks
│   └── *.css            # Component styles
├── App.js               # Root component
└── index.js            # Entry point
```

## Technologies Used

- **React** - Frontend framework
- **Axios** - HTTP client for API requests
- **JSON Server** - Mock REST API
- **CSS** - Custom styling

## API Endpoints

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Contributing

This is a learning project. Feel free to fork and experiment!

## License

MIT License