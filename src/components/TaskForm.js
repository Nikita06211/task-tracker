import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../utils/taskSlice";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

const TaskForm = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({ title: "", priority: "medium", date: "" });

  useEffect(() => {
    if (task) setTaskData(task); 
  }, [task]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) return alert("Title cannot be empty!");

    if (task) {
      dispatch(updateTask(taskData));
    } else {
      dispatch(addTask({ id: Date.now(), ...taskData, status: "pending" })); 
    }

    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}>
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

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="submit" variant="contained" color="primary">{task ? "Update Task" : "Add Task"}</Button>
        <Button onClick={onClose} variant="outlined" color="secondary">Cancel</Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
