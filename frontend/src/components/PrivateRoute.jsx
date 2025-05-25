import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute() {
  const { user, loading } = useAuth();

  // If still loading, render nothing or a loading indicator
  if (loading) {
    return <div>Loading...</div>; 
  }

  // If user is logged in, render the child routes
  if (user) {
    return <Outlet />;
  }

  // If user is not logged in, redirect to the login page
  return <Navigate to="/login" />;
} 