import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../utils/taskSlice";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

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
      onUpdate(taskData); // 📌 Use update function
    } else {
      dispatch(addTask({ id: Date.now(), ...taskData, status: "tasks" })); // Add new task
    }

    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 , margin: "5px"}}>
      <TextField label="Task Title" name="title" value={taskData.title} onChange={handleChange} required />

      <FormControl>
        <InputLabel>Priority</InputLabel>
        <Select name="priority" value={taskData.priority} onChange={handleChange}>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
      </FormControl>

      <TextField type="date" name="date" value={taskData.date} onChange={handleChange} />

      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select name="status" value={taskData.status} onChange={handleChange}>
          <MenuItem value="tasks">Tasks</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="submit" variant="contained" color="primary">{task ? "Update Task" : "Add Task"}</Button>
        <Button onClick={onClose} variant="outlined" color="secondary">Cancel</Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
