import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Adjust based on your state structure
  const location = useLocation();

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return element;
};

export default PrivateRoute;
