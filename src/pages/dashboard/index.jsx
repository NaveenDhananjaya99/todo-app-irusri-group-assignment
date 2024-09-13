import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Card,
  CardContent,
  Chip,
  Grid2,
  Avatar,
  AvatarGroup,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTaskStatus } from "../../redux/slices/taskAction";
import {
  MoreVert,
  Visibility,
  ChatBubbleOutline,
  Edit,
} from "@mui/icons-material";
import TaskEdit from "./components/tesk-edit-popup";
import EnhancedDrawer from "../../components/drawer";
import { logout } from "../../redux/slices/authAction";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newTask, setNewTask] = useState("");

  const tasks = useSelector((state) => state.task.task);
  const dispatch = useDispatch();
  const [menuAnchorEl, setMenuAnchorEl] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const navigate = useNavigate();
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen = (task) => {
    setTaskToEdit(task); // Set the task to edit
    setOpenDialog(true); // Open the dialog
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle menu open
  const handleMenuOpen = (event, taskId) => {
    setMenuAnchorEl((prevState) => ({
      ...prevState,
      [taskId]: event.currentTarget,
    }));
  };

  // Handle menu close
  const handleMenuClose = (taskId) => {
    setMenuAnchorEl((prevState) => ({ ...prevState, [taskId]: null }));
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      dispatch(
        addTask({
          title: newTask.title,
          description: newTask.description,
          status: "Incomplete",
        })
      );
      setNewTask({ title: "", description: "" });
    }
  };
  const handleStatusChange = (id, status) => {
    dispatch(updateTaskStatus({ id, status }));
  };

  const renderTasksByStatus = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <Card
          variant="outlined"
          key={task.id}
          sx={{
            width: 300,
            padding: 2,
            borderRadius: "16px",
            boxShadow: 3,
            mb: 2,
          }}
        >
          {/* UX Stages Tag */}
          <Grid2 container justifyContent="space-between">
            <Chip
              label="UX stages"
              sx={{
                backgroundColor: "#FFECC7",
                color: "#FF8A00",
                fontWeight: "bold",
                mb: 2,
              }}
            />
            <IconButton
              size="small"
              onClick={(e) => handleMenuOpen(e, task.id)}
            >
              <MoreVert />
            </IconButton>
            {/* Menu */}
            <Menu
              anchorEl={menuAnchorEl[task.id]} // Bind menu to specific task
              open={Boolean(menuAnchorEl[task.id])}
              onClose={() => handleMenuClose(task.id)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {task.status != "Incomplete" && (
                <MenuItem
                  onClick={() => {
                    handleStatusChange(task.id, "Incomplete");
                    handleMenuClose(task.id);
                  }}
                >
                  To Do
                </MenuItem>
              )}

              {task.status != "In Progress" && (
                <MenuItem
                  onClick={() => {
                    handleStatusChange(task.id, "In Progress");
                    handleMenuClose(task.id);
                  }}
                >
                  In Progress
                </MenuItem>
              )}
              {task.status != "Completed" && (
                <MenuItem
                  onClick={() => {
                    handleStatusChange(task.id, "Completed");
                    handleMenuClose(task.id);
                  }}
                >
                  Completed
                </MenuItem>
              )}
            </Menu>
          </Grid2>

          {/* Title and Description */}
          <CardContent sx={{ padding: 0 }}>
            <Typography variant="h6" component="div">
              {task.title}
              {task.id}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 3,
                textOverflow: "ellipsis",
              }}
            >
              {task.description}
            </Typography>
          </CardContent>

          {/* Progress */}
          <Box sx={{ mt: 2 }}>
            <Chip
              label="2/8"
              variant="outlined"
              sx={{
                borderRadius: "8px",
                borderColor: "green",
                color: "green",
                fontSize: "1rem",
              }}
            />
          </Box>

          {/* Avatars */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <AvatarGroup max={3}>
                <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
                <Avatar src="https://randomuser.me/api/portraits/women/2.jpg" />
                <Avatar src="https://randomuser.me/api/portraits/men/3.jpg" />
                <Avatar src="https://randomuser.me/api/portraits/men/3.jpg" />
                <Avatar src="https://randomuser.me/api/portraits/men/3.jpg" />
              </AvatarGroup>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="small">
                  <Visibility fontSize="small" />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  2
                </Typography>
                <IconButton size="small" sx={{ ml: 1 }}>
                  <ChatBubbleOutline fontSize="small" />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  0
                </Typography>
                <IconButton
                  size="small"
                  sx={{ ml: 1 }}
                  onClick={() => handleDialogOpen(task)}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Icons */}
        </Card>
      ));
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F8F8F8" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#F0F0F0",
          color: "black",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Board 01
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Profile Picture"
              src="https://randomuser.me/api/portraits/men/1.jpg" // Replace with your image path or URL
              sx={{ width: 40, height: 40, ml: 2 }}
            />
            <Button
              color="inherit"
              onClick={() => {logout()
                navigate('/');
              }} // Replace with your logout function
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <EnhancedDrawer />
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <EnhancedDrawer />
        </Drawer>
      </Box>
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Box mb={2} display="flex" gap={2}>
          <TextField
            label="Task Title"
            variant="outlined"
            fullWidth
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            label="Task Description"
            variant="outlined"
            fullWidth
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={handleAddTask}
          >
            Add Task
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">
              Incomplete</Typography>
              {renderTasksByStatus("Incomplete")}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">In Progress</Typography>
              {renderTasksByStatus("In Progress")}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Completed</Typography>
              {renderTasksByStatus("Completed")}
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <TaskEdit
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        taskToEdit={taskToEdit}
      />
    </Box>
  );
};

export default Dashboard;
