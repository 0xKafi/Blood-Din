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
import Users from '../Dashboard/Pages/Users';
import BloodDonationRequest from '../Dashboard/Pages/BloodDonationRequest';
import ContentManagement from '../Dashboard/Pages/ContentManagement';
import CreateDonationRequest from '../Dashboard/Pages/DonorPages/CreateDonationRequest';
import MyDonationRequest from '../Dashboard/Pages/DonorPages/MyDonationRequest';
import CreateBlog from '../Dashboard/Pages/CreateBlog';
import Blog from '../Pages/Blog';
import BlogDetails from '../Pages/BlogDetails';
import BloodDonationRequests from '../Pages/BloodDonationRequests';
import BloodDonationRequestDetails from '../Pages/BloodDonationRequestDetails';
import ErrorPage from '../Pages/ErrorPage';
import Search from '../Pages/Search';
import FundingPage from '../Pages/FundingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <ErrorPage></ErrorPage>,
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
        },
        {
          path: '/blog',
          Component: Blog
        },
        {
          path: '/blog/:id',
          Component: BlogDetails
        },
        {
          path: '/blood-donation-requests',
          Component: BloodDonationRequests
        },
        {
          path: '/search',
          Component: Search,
          loader: ()=>fetch('http://localhost:3000/search-donation-request')
        },
        {
          path: '/blood-donation-request/:id',
          element: <PrivateRoute>
            <BloodDonationRequestDetails></BloodDonationRequestDetails>
          </PrivateRoute>
        },
        {
          path: '/donate-fund',
          element: <PrivateRoute>
            <FundingPage></FundingPage>
          </PrivateRoute>
        }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <Dashboard></Dashboard>
    </PrivateRoute>,
    errorElement: <ErrorPage></ErrorPage>,
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
      },
      {
        path: '/dashboard/content-management/add-blog',
        Component: CreateBlog
      },
      {
        path: '/dashboard/create-donation-request',
        Component: CreateDonationRequest
      },
      {
        path: '/dashboard/my-donation-requests',
        Component: MyDonationRequest
      }
    ]
  }
]);

