import React from 'react';
import { createBrowserRouter } from "react-router";
import App from '../../App';
import Home from '../Pages/Home';
import Login from '../AuthPages/Login';
import Register from '../AuthPages/Register';

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
  }
]);

