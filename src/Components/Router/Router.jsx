import React from 'react';
import { createBrowserRouter } from "react-router";
import App from '../../App';
import Home from '../Pages/Home';
import Login from '../AuthPages/Login';
import Register from '../AuthPages/Register';
import Dashboard from '../Dashboard/Dashboard';
import PrivateRoute from '../Auth/PrivateRoute';
import Profile from '../Dashboard/Pages/Profile';
import Overview from '../Dashboard/Pages/Overview';
import AllUsers from '../Dashboard/Pages/Users';
import Users from '../Dashboard/Pages/Users';
import BloodDonationRequest from '../Dashboard/Pages/BloodDonationRequest';
import ContentManagement from '../Dashboard/Pages/ContentManagement';

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
        index: true,
        Component: Overview
      },
      {
        path: '/dashboard/profile',
        Component: Profile
      },
      {
        path: '/dashboard/all-users',
        Component: Users
      },
      {
        path: '/dashboard/all-blood-donation-request',
        Component: BloodDonationRequest
      },
      {
        path: '/dashboard/content-management',
        Component: ContentManagement
      }
    ]
  }
]);

