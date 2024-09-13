import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user:null,
  error: null,

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) =>{
      console.log('loginSuccess', state);
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    updateLocation: (state, action) => {
      console.log('loginSuccess', state);
      state.isLoggedIn = true;
      state.selected_location = action.payload;
      state.error = null;
    },
    
    loginFailure(state, action) {
      console.log('loginFailure', state);
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.payload;
    },
    logout(state) {
      console.log('logout', state);
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
    clearLoginSuccess: (state) => {
      state.loginSuccess = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout ,clearLoginSuccess,updateLocation} = authSlice.actions;

export default authSlice.reducer;
