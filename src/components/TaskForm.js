import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../utils/taskSlice";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Paper } from "@mui/material";

const TaskForm = ({ task, onUpdate, onClose }) => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({ title: "", priority: "medium", date: "", status: "tasks" });

  useEffect(() => {
    if (task) setTaskData(task); // Pre-fill for edit mode
  }, [task]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) return alert("Title cannot be empty!");

    if (task) {
      onUpdate(taskData);
    } else {
      dispatch(addTask({ id: Date.now(), ...taskData, status: "tasks" }));
    }

    onClose();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1300,
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "10px",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(17, 23, 29, 0.9)", // Dark transparent background
          border: "2px solid #64b5f6", // Blue border
          color: "#90caf9", // Blue text
        }}
      >
        <TextField
          label="Task Title"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          required
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#64b5f6" }, // Blue border
              "&:hover fieldset": { borderColor: "#90caf9" },
            },
            "& label, & input": { color: "#90caf9" }, // Blue text
          }}
        />

        <FormControl fullWidth>
          <InputLabel sx={{ color: "#90caf9" }}>Priority</InputLabel>
          <Select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#64b5f6" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
              "& .MuiSelect-select": { color: "#90caf9" },
            }}
          >
            <MenuItem value="high" sx={{ color: "#90caf9" }}>High</MenuItem>
            <MenuItem value="medium" sx={{ color: "#90caf9" }}>Medium</MenuItem>
            <MenuItem value="low" sx={{ color: "#90caf9" }}>Low</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="date"
          name="date"
          value={taskData.date}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#64b5f6" },
              "&:hover fieldset": { borderColor: "#90caf9" },
            },
            "& label, & input": { color: "#90caf9" },
          }}
        />

        <FormControl fullWidth>
          <InputLabel sx={{ color: "#90caf9" }}>Status</InputLabel>
          <Select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#64b5f6" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
              "& .MuiSelect-select": { color: "#90caf9" },
            }}
          >
            <MenuItem value="tasks" sx={{ color: "#90caf9" }}>Tasks</MenuItem>
            <MenuItem value="pending" sx={{ color: "#90caf9" }}>Pending</MenuItem>
            <MenuItem value="completed" sx={{ color: "#90caf9" }}>Completed</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            {task ? "Update Task" : "Add Task"}
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskForm;
