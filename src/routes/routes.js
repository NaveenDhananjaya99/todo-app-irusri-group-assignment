import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginView from '../pages/auth/login/loginView';
import Dashboard from '../pages/dashboard';


const RoutesList = () => (
  <Routes>
    <Route path="/" element={<LoginView />} />
    <Route path="/dashboard" element={<Dashboard />} />
  
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default RoutesList;
