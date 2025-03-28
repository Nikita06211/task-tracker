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
  reducers: {},
});

export default taskSlice.reducer;
