import React from 'react';
import useRole from '../Hooks/useRole';
import { Link, Outlet } from 'react-router';
import logo from '../../assets/logo.png';

const Dashboard = () => {
    const {role, loading} = useRole()

    if(loading) return <div className='h-screen flex justify-center items-center'>
             <span className="loading loading-spinner loading-xl"></span>
        </div>


    // if(role === 'admin') return <>admin</>
    // else if(role === 'moderator') return <>moderator</>
    // if(role === 'donor') return <>donor</>


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
                className="h-6 w-6"
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

        <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard/profile">My Profile</Link></li>
          <li><Link to="/dashboard/settings">Settings</Link></li>
        </ul>
      </div>
    </div>
    );
};

export default Dashboard;