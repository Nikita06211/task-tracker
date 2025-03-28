import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography } from "@mui/material";

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map(task => (
        <Card key={task.id} style={{ margin: "10px 0" }}>
          <CardContent>
            <Typography variant="h6">{task.title}</Typography>
            <Typography>Status: {task.status}</Typography>
            <Typography>Priority: {task.priority}</Typography>
            <Typography>Due Date: {task.date}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
