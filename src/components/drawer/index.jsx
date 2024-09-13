import React, { useState } from 'react';
import { Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText, Drawer, useTheme, useMediaQuery, Typography, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from '@mui/icons-material/Inbox';

const EnhancedDrawer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          backgroundColor: "#DCDCDC",
          boxShadow: theme.shadows[4],
          padding: 2,
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Task Dashboards
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {['Board 01', 'Board 02', 'Board 03', 'Board 04', 'Board 05'].map((text, index) => (
         <Box sx={{
            backgroundColor:  selectedIndex === index?"#B8B8B8":"",
            borderRadius:2
         }}>
             <ListItem
            button
            key={index}
            selected={selectedIndex === index}
           
            onClick={() => handleListItemClick(index)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.action.selected, // or any color you prefer
                '&:hover': {
                  backgroundColor: theme.palette.action.selected, // keep the selected color on hover
                },
              },
              // Optional: Add hover effect for non-selected items
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
         </Box>
        ))}
      </List>
      <Divider />
      <List>
        {['Menu 01', 'Menu 02', 'Menu 03', 'Menu 04', 'Menu 05'].map((text, index) => (
          <ListItem
            button
            key={text}
            selected={selectedIndex === index + 5} // Adjust index to be unique
            onClick={() => handleListItemClick(index + 5)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.action.selected, // or any color you prefer
                '&:hover': {
                  backgroundColor: theme.palette.action.selected, // keep the selected color on hover
                },
              },
              // Optional: Add hover effect for non-selected items
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default EnhancedDrawer;
