import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { moveTask } from "../utils/taskSlice";
import useEditTask from "../hooks/useEditTask";
import useTaskFilterSort from "../hooks/useTaskFilterSort";
import TaskForm from "./TaskForm";
import SortFilterMenu from "./SortFilterMenu";
import { Box, Paper, Typography } from "@mui/material";

const TaskBoard = () => {
  const allTasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const { editTask, isEditing, startEditing, handleUpdate, cancelEditing } = useEditTask();
  const {
    filteredTasks, filterStatus, setFilterStatus, filterPriority, setFilterPriority,
    sortByDate, setSortByDate
  } = useTaskFilterSort(allTasks);

  const TaskItem = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "TASK",
      item: { id: task.id, status: task.status },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <Paper
        ref={drag}
        onClick={() => startEditing(task)}
        sx={{
          padding: 1,
          margin: "5px",
          cursor: "grab",
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: task.status === "completed" ? "#90EE90" : "#FFD700",
        }}
      >
        {task.title}
      </Paper>
    );
  };

  const TaskColumn = ({ status, title, tasks }) => {
    const [{ isOver }, drop] = useDrop({
      accept: "TASK",
      drop: (item) => dispatch(moveTask({ id: item.id, newStatus: status })),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    return (
      <Paper
        ref={drop}
        sx={{
          flex: 1,
          padding: 2,
          minHeight: 250,
          backgroundColor: isOver ? "#E0E0E0" : "#F5F5F5",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        {status === "tasks" && (
          <SortFilterMenu
            setSortByDate={setSortByDate}
            setFilterStatus={setFilterStatus}
            setFilterPriority={setFilterPriority}
          />
        )}
        {tasks.map(task => <TaskItem key={task.id} task={task} />)}
      </Paper>
    );
  };

  return (
    <Box display="flex" justifyContent="space-around" padding={2}>
      <TaskColumn status="tasks" title="Tasks" tasks={filteredTasks} />
      <TaskColumn status="pending" title="Pending" tasks={allTasks.filter(task => task.status === "pending")} />
      <TaskColumn status="completed" title="Completed" tasks={allTasks.filter(task => task.status === "completed")} />
      
      {isEditing && <TaskForm task={editTask} onUpdate={handleUpdate} onClose={cancelEditing} />}
    </Box>
  );
};

export default TaskBoard;
