import React, { useState } from "react";
import { Typography, Menu, MenuItem, Box } from "@mui/material";

const SortFilterMenu = ({ setSortByDate, setFilterStatus, setFilterPriority }) => {
  const [anchorElSort, setAnchorElSort] = useState(null);
  const [anchorElFilter, setAnchorElFilter] = useState(null);

  const handleSortClick = (event) => setAnchorElSort(event.currentTarget);
  const handleFilterClick = (event) => setAnchorElFilter(event.currentTarget);
  const handleClose = () => {
    setAnchorElSort(null);
    setAnchorElFilter(null);
  };

  return (
    <Box display="flex" justifyContent="space-between" sx={{ padding: "8px" }}>
      <Typography 
        variant="h6" 
        onClick={handleSortClick}
        sx={{
          cursor: "pointer", 
          backgroundColor: "#f0f0f0",
          padding: "8px 12px", 
          borderRadius: "5px",
          "&:hover": { backgroundColor: "#e0e0e0" }
        }}
      >
        Sort
      </Typography>
      <Menu anchorEl={anchorElSort} open={Boolean(anchorElSort)} onClose={handleClose}>
        <MenuItem onClick={() => { setSortByDate("newest"); handleClose(); }}>Newest First</MenuItem>
        <MenuItem onClick={() => { setSortByDate("oldest"); handleClose(); }}>Oldest First</MenuItem>
      </Menu>

      <Typography 
        variant="h6" 
        onClick={handleFilterClick}
        sx={{
          cursor: "pointer", 
          backgroundColor: "#f0f0f0",
          padding: "8px 12px", 
          borderRadius: "5px",
          "&:hover": { backgroundColor: "#e0e0e0" }
        }}
      >
        Filter
      </Typography>
      <Menu anchorEl={anchorElFilter} open={Boolean(anchorElFilter)} onClose={handleClose}>
        <MenuItem onClick={() => { setFilterStatus("all"); handleClose(); }}>Status: All</MenuItem>
        <MenuItem onClick={() => { setFilterStatus("tasks"); handleClose(); }}>Status: Tasks</MenuItem>
        <MenuItem onClick={() => { setFilterStatus("pending"); handleClose(); }}>Status: Pending</MenuItem>
        <MenuItem onClick={() => { setFilterStatus("completed"); handleClose(); }}>Status: Completed</MenuItem>
        <MenuItem onClick={() => { setFilterPriority("all"); handleClose(); }}>Priority: All</MenuItem>
        <MenuItem onClick={() => { setFilterPriority("high"); handleClose(); }}>Priority: High</MenuItem>
        <MenuItem onClick={() => { setFilterPriority("medium"); handleClose(); }}>Priority: Medium</MenuItem>
        <MenuItem onClick={() => { setFilterPriority("low"); handleClose(); }}>Priority: Low</MenuItem>
      </Menu>
    </Box>
  );
};

export default SortFilterMenu;
