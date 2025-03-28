import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../utils/taskSlice";

const useEditTask = () => {
  const dispatch = useDispatch();
  const [editTask, setEditTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = (task) => {
    setEditTask(task);
    setIsEditing(true);
  };

  const handleUpdate = (updatedTask) => {
    dispatch(updateTask(updatedTask));
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  return { editTask, isEditing, startEditing, handleUpdate, cancelEditing };
};

export default useEditTask;
