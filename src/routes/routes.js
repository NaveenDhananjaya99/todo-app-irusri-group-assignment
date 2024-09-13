import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginView from '../pages/auth/login/loginView';
import Dashboard from '../pages/dashboard';
import PrivateRoute from './privateRoute';
import SignUp from '../pages/auth/signup';


const RoutesList = () => (
  <Routes>
    <Route path="/login" element={<LoginView />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
  
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default RoutesList;
