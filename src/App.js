import React, { useState } from "react";
import TaskForm from "./components/TaskForm.js";
import TaskList from "./components/TaskList";
import { Button } from "@mui/material";


const App = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div style={{ padding: 20 }}>
      <h1>Task Manager</h1>
      <Button variant="contained" onClick={() => setShowForm(true)}>New Task</Button>
      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
      <TaskList />
  </div>
  );
};

export default App;
