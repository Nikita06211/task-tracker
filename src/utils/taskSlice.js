import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    { id: 1, title: "Complete React Assignment", status: "pending", priority: "high", date: "2025-03-28" },
    { id: 2, title: "Review PRs", status: "completed", priority: "medium", date: "2025-03-27" },
    { id: 3, title: "Fix UI Bugs", status: "pending", priority: "low", date: "2025-03-29" }
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state,action)=>{
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action)=>{
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action)=>{
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if(index !== -1){
        state.tasks[index] = action.payload; 
      }
    },
  },
});

export const {addTask, deleteTask, updateTask} = taskSlice.actions;
export default taskSlice.reducer;
