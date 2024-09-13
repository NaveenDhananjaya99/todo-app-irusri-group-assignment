import { createSlice } from '@reduxjs/toolkit';

let taskId = 1;

const initialState = {
    task:[],
    error: null,
  
  };
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.task.push({ id: taskId++, title: action.payload.title, status: 'Not Started' });
    },
    updateTaskStatus: (state, action) => {
      const task =   state.task.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },
});

export const { addTask, updateTaskStatus } = tasksSlice.actions;

export default tasksSlice.reducer;