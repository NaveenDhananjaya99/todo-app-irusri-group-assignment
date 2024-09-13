import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTaskStatus } from '../../redux/slices/taskAction';


const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTask] = useState([]);
  const declaredtasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
   if(declaredtasks?.length>0){
   setTask(declaredtasks)
   }
  }, [declaredtasks])
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask({ title: newTask, status: 'Not Started' }));
      setNewTask('');
    }
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateTaskStatus({ id, status }));
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Task Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h6" gutterBottom>
          My Tasks
        </Typography>

        {/* Task Input */}
        <Box mb={2}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task name"
          />
          <Button variant="contained" color="primary" startIcon={<AddCircleIcon />} onClick={handleAddTask}>
            Add Task
          </Button>
        </Box>

        {/* Task List */}
        {tasks.map((task) => (
          <Box key={task.id} display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography>{task.title}</Typography>
            <Box>
              <Button
                variant="outlined"
                onClick={() => handleStatusChange(task.id, 'Not Started')}
                disabled={task.status === 'Not Started'}
              >
                Not Started
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleStatusChange(task.id, 'In Progress')}
                disabled={task.status === 'In Progress'}
              >
                In Progress
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleStatusChange(task.id, 'Done')}
                disabled={task.status === 'Done'}
              >
                Done
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
