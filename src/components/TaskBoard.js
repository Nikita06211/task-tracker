import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { moveTask } from "../utils/taskSlice";
import useEditTask from "../hooks/useEditTask";
import TaskForm from "./TaskForm";
import { Box, Paper, Typography } from "@mui/material";

const TaskBoard = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const { editTask, isEditing, startEditing, handleUpdate, cancelEditing } = useEditTask();

  const TaskItem = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "TASK",
      item: { id: task.id },
      collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    return (
      <Paper
        ref={drag}
        onClick={() => startEditing(task)} 
        sx={{
          padding: 1,
          margin: "15px",
          cursor: "grab",
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: task.status === "completed" ? "#90EE90" : "#FFD700",
        }}
      >
        {task.title}
      </Paper>
    );
  };

  const TaskColumn = ({ status, title }) => {
    const [{ isOver }, drop] = useDrop({
      accept: "TASK",
      drop: (item) => dispatch(moveTask({ id: item.id, newStatus: status })),
      collect: monitor => ({ isOver: monitor.isOver() }),
    });

    return (
      <Paper
        ref={drop}
        sx={{
          flex: 1,
          padding: 2,
          minHeight: 200,
          backgroundColor: isOver ? "#E0E0E0" : "#F5F5F5",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        {tasks
          .filter(task => task.status === status)
          .map(task => <TaskItem key={task.id} task={task} />)}
      </Paper>
    );
  };

  return (
    <Box display="flex" justifyContent="space-around" padding={2}>
      <TaskColumn status="tasks" title="Tasks" />
      <TaskColumn status="pending" title="Pending" />
      <TaskColumn status="completed" title="Completed" />
      
      {isEditing && <TaskForm task={editTask} onUpdate={handleUpdate} onClose={cancelEditing} />}
    </Box>
  );
};

export default TaskBoard;
