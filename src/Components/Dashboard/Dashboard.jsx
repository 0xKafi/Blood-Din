import React from 'react';
import useRole from '../Hooks/useRole';
import { Link, Outlet, NavLink } from 'react-router';
import logo from '../../assets/logo.png';
import { HeartHandshake, LayoutDashboard, Users, FilePen, User } from 'lucide-react';

const Dashboard = () => {
    const {role, loading} = useRole()

    if(loading) return <div className='h-screen flex justify-center items-center'>
             <span className="loading loading-spinner loading-xl"></span>
        </div>


    // if(role === 'admin') return <>admin</>
    // else if(role === 'moderator') return <>moderator</>



    return (
    <div className="drawer lg:drawer-open">
      {/* Drawer toggle input */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-white lg:hidden">
          <div className="flex-none">
            {/* Menu button only on small screens */}
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2">
                <Link to='/'><img className='w-10' src={logo} alt="logo" /></Link>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
      {/* Sidebar */}
      <div className="drawer-side">
        {/* Overlay on small devices */}
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <ul className="menu p-6 w-80 min-h-full bg-base-100 text-base-content lg:text-md font-medium space-y-2">
          <li><NavLink to="/dashboard" end className={({isActive})=>`${isActive && 'bg-black/85 text-white'} py-2`}><LayoutDashboard size={16} />Dashboard</NavLink></li>
        {
            role === "admin" && 
            <>
                <li><NavLink to="/dashboard/all-users" className={({isActive})=>`${isActive && 'bg-black/85 text-white'} py-2`}><Users size={16} />All Users</NavLink></li>
                <li><NavLink to="/dashboard/all-blood-donation-request" className={({isActive})=>`${isActive && 'bg-black/85 text-white'} py-2`}><HeartHandshake size={16} />Blood Donation Request</NavLink></li>
                <li><NavLink to="/dashboard/content-management" className={({isActive})=>`${isActive && 'bg-black/85 text-white'} py-2`}><FilePen size={16} />Content Management</NavLink></li>
            </>
        }
        {
            role === "donor" && 
            <>
                <li><NavLink to="/dashboard/my-donation-requests" className={({isActive})=>`${isActive && 'bg-black/85 text-white'} py-2`}><Users size={16} />My Donation Request</NavLink></li>
                <li><NavLink to="/dashboard/create-donation-request" className={({isActive})=>`${isActive && 'bg-black/85 text-white'} py-2`}><Users size={16} />Create Donation Request</NavLink></li>
            </>
        }
        <li><NavLink to="/dashboard/profile" className={({isActive})=>`${isActive && 'bg-black/85 text-white'} py-2`}><User size={16} />Profile</NavLink></li>
        </ul>
      </div>
    </div>
    );
};

export default Dashboard;