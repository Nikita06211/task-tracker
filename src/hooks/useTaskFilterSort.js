import { useState } from "react";

const useTaskFilterSort = (tasks) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortByDate, setSortByDate] = useState("newest");

  const filteredTasks = tasks
    .filter(task => filterStatus === "all" || task.status === filterStatus)
    .filter(task => filterPriority === "all" || task.priority === filterPriority)
    .sort((a, b) => {
      if (sortByDate === "newest") return new Date(b.date) - new Date(a.date);
      if (sortByDate === "oldest") return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return {
    filteredTasks,
    filterStatus, setFilterStatus,
    filterPriority, setFilterPriority,
    sortByDate, setSortByDate
  };
};

export default useTaskFilterSort;
