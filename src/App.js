import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskBoard from "./components/TaskBoard";
import { Button, Box, Typography } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <Box 
        sx={{ 
          width: "100vw", 
          height: "100vh", 
          backgroundColor: "#121212", 
          color: "darkcyan", 
          display: "flex", 
          flexDirection: "column", 
          overflow: "hidden" 
        }}
      >
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            padding: "16px", 
            backgroundColor: "#1E1E1E",
            flexShrink: 0 
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>Task Manager</Typography>
          <Button 
            variant="contained" 
            onClick={() => setShowForm(true)} 
            sx={{ backgroundColor: "darkcyan", color: "#121212" }}
          >
            + New Task
          </Button>
        </Box>
        <Box 
          sx={{ 
            flexGrow: 1, 
            overflow: "hidden", 
            display: "flex", 
            flexDirection: "column" 
          }}
        >
          {showForm && (
            <Box 
              sx={{ 
                position: "absolute", 
                width: "100vw", 
                height: "100vh", 
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                zIndex: 10 
              }}
            >
              <TaskForm onClose={() => setShowForm(false)} />
            </Box>
          )}
          <TaskBoard />
        </Box>
      </Box>
    </DndProvider> 
  );
};

export default App;
