import React, { useContext } from 'react';
import logo from '../../assets/logo.png'
import { Link, NavLink } from 'react-router';
import AuthContext from '../Auth/AuthContext';


const Navbar = () => {
    const {user, loading} = useContext(AuthContext)

    return (
        <div className='border-gray-300 border-b py-2'>
            <div className='w-11/12 mx-auto flex justify-between items-center'>
                {/* logo */}
                <div className='flex items-center space-x-2 w-1/5'>
                   <Link to='/'><img className='w-10' src={logo} alt="logo" /></Link>
                    <h1 className='font-bold hidden lg:block lg:text-2xl text-red-600'>Blood Din</h1>
                </div>

                {/* links */}
                <div className='hidden lg:flex space-x-10 w-3/5 justify-center'>
                    <NavLink to='/' className={({isActive})=>`${isActive && 'font-medium text-red-600'}`}>Home</NavLink>
                    <NavLink to='/donation-request' className={({isActive})=>`${isActive && 'font-medium text-red-600'}`}>Donation Request</NavLink>
                    <NavLink to='/blog' className={({isActive})=>`${isActive && 'font-medium text-red-600'}`}>Blog</NavLink>
                </div>

                {/* auth */}
                <div className='flex space-x-2 justify-end items-center w-1/5'>
                    {
                        loading ? <span className="loading loading-spinner loading-md"></span>:
                        user?
                        <>
                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                                    <img src={user.photoURL} />
                                </div>
                            </div>
                        </>:
                        <>
                         <Link to='/login'>
                            <button className='btn btn-sm'>Login</button>
                        </Link>
                        <Link to='/register'>
                            <button className='btn btn-sm bg-red-600 text-white'>Register</button>
                        </Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;