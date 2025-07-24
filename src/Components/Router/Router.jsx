import React from 'react';
import { createBrowserRouter } from "react-router";
import App from '../../App';
import Home from '../Pages/Home';
import Login from '../AuthPages/Login';
import Register from '../AuthPages/Register';
import Dashboard from '../Dashboard/Dashboard';
import PrivateRoute from '../Auth/PrivateRoute';
import Profile from '../Dashboard/Pages/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: '/login',
          Component: Login
        },
        {
          path: '/register',
          Component: Register
        }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <Dashboard></Dashboard>
    </PrivateRoute>,
    children: [
      {
        path: '/dashboard/profile',
        Component: Profile
      }
    ]
  }
]);

