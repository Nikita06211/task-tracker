import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [
    { id: 1, title: "Complete React Assignment", status: "pending", priority: "high", date: "2025-03-28" },
    { id: 2, title: "Review PRs", status: "completed", priority: "medium", date: "2025-03-27" },
    { id: 3, title: "Fix UI Bugs", status: "pending", priority: "low", date: "2025-03-29" }
  ];
};

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: loadTasksFromLocalStorage() }, 
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks); 
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks); 
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToLocalStorage(state.tasks); 
      }
    },
    moveTask: (state, action) => {
      const { id, newStatus } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.status = newStatus;
        saveTasksToLocalStorage(state.tasks); 
      }
    },
  },
});

export const { addTask, deleteTask, updateTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
