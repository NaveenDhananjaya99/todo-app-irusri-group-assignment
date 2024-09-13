import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  useMediaQuery,
  DialogContentText,
  AvatarGroup,
  Avatar,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip,
} from "@mui/material";

function TaskEdit({ openDialog, handleDialogClose, taskToEdit }) {
  const [selectedTask, setSelectedTask] = useState({
    title: "",
    description: "",
  });
  const isMobile = useMediaQuery("(max-width:600px)");

  // When the dialog opens, initialize the task with the taskToEdit prop
  useEffect(() => {
    if (taskToEdit) {
      setSelectedTask(taskToEdit);
    }
  }, [taskToEdit]);

  // Handle task update logic
  const handleUpdateTask = () => {
    if (selectedTask.title.trim()) {
      console.log("Updated Task:", selectedTask); // You can add logic to save the updated task
      handleDialogClose(); // Close the dialog after saving
    }
  };

  const subTasks = ["Sub-task 1", "Sub-task 2", "Sub-task 3"];

  return (
    <Dialog
      open={openDialog}
      onClose={handleDialogClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Grid container xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Edit Task - {selectedTask?.title}
          </Typography>
          <Chip
            label="UX stages"
            sx={{
              backgroundColor: "#FFECC7",
              color: "#FF8A00",
              fontWeight: "bold",
              mb: 2,
              ml: 3,
            }}
          />
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} direction={isMobile ? "column" : "row"}>
          {/* Left side: Task form */}
          <Grid item xs={12} md={8}>
            <DialogContentText>
              Update the task's title and description below.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Task Title"
              type="text"
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              value={selectedTask?.title || ""}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, title: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Task Description"
              multiline
              rows={7}
              type="text"
              fullWidth
              variant="outlined"
              value={selectedTask?.description || ""}
              onChange={(e) =>
                setSelectedTask({
                  ...selectedTask,
                  description: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                padding: isMobile ? "8px 0" : "16px",
                backgroundColor: "#F5F5F5",
                borderRadius: 5,
              }}
            >
              {/* Contributors */}

              {/* Sub-tasks */}
              <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                Sub-tasks
              </Typography>
              {subTasks.map((subTask, index) => (
                <Card key={index} sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Grid container alignItems="center">
                      {/* Sub-task description on the left */}
                      <Grid item xs={10}>
                        <Typography>{subTask}</Typography>
                      </Grid>
                      {/* Checkbox on the right */}
                      <Grid item xs={2} container justifyContent="flex-end">
                        <FormControlLabel
                          control={<Checkbox />}
                          label=""
                          sx={{ marginRight: 0 }} // Remove default margin from FormControlLabel
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
          <Box sx={{ padding: isMobile ? "8px 0" : "16px", mt:isMobile?0: -9 }}>
            <Typography variant="h6" gutterBottom>
              Contributors
            </Typography>
            <AvatarGroup max={7}>
              <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
              <Avatar src="https://randomuser.me/api/portraits/women/2.jpg" />
              <Avatar src="https://randomuser.me/api/portraits/men/3.jpg" />
              <Avatar src="https://randomuser.me/api/portraits/men/4.jpg" />
              <Avatar src="https://randomuser.me/api/portraits/men/5.jpg" />
            </AvatarGroup>
          </Box>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="error" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleUpdateTask} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskEdit;
