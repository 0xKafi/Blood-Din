import React from 'react';
import logo from '../../assets/logo.png'
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div className='border-base-100 border-b py-2'>
            <div className='max-w-screen-xl mx-auto flex justify-between items-center'>
                {/* logo */}
                <div className='flex items-center space-x-2'>
                    <img className='w-10' src={logo} alt="logo" />
                    <h1 className='font-bold hidden lg:block lg:text-2xl text-red-600'>Blood Din</h1>
                </div>

                {/* links */}
                <div className='flex space-x-10'>
                    <NavLink to='/donation-request' className={({isActive})=>`${isActive && 'font-medium text-red-600'}`}>Donation Request</NavLink>
                    <NavLink to='/search' className={({isActive})=>`${isActive && 'font-medium text-red-600'}`}>Search</NavLink>
                    <NavLink to='/blog' className={({isActive})=>`${isActive && 'font-medium text-red-600'}`}>Blog</NavLink>
                </div>

                {/* auth */}
                <div className='flex space-x-2'>
                    <Link to='/login'>
                    <button className='btn btn-sm'>Login</button>
                    </Link>
                    <Link to='/register'>
                    <button className='btn btn-sm bg-red-600 text-white'>Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;