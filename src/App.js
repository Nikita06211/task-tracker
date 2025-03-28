import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskBoard from "./components/TaskBoard";
import { Button } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: 20 }}>
        <h1>Task Manager</h1>
        <Button variant="contained" onClick={() => setShowForm(true)}>New Task</Button>
        {showForm && <TaskForm onClose={() => setShowForm(false)} />}
        <TaskBoard />
      </div>
    </DndProvider>
  );
};

export default App;
