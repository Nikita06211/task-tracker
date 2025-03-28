import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../utils/taskSlice";
import TaskForm from "./TaskForm";
import { List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  
  const [editTask, setEditTask] = useState(tasks.length > 0 ? tasks[0] : null);
  const [isEditing, setIsEditing] = useState(false); 
  return (
    <Box>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => { setEditTask(task); setIsEditing(true); }}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => dispatch(deleteTask(task.id))}>
                <Delete color="error" />
              </IconButton>
            </>
          }>
            <ListItemText primary={task.title} secondary={`Priority: ${task.priority} | Due: ${task.date}`} />
          </ListItem>
        ))}
      </List>

      {isEditing && <TaskForm task={editTask} onClose={() => setIsEditing(false)} />}
    </Box>
  );
};

export default TaskList;
