import React, { useContext } from 'react';
import logo from '../../assets/logo.png'
import { Link, NavLink } from 'react-router';
import AuthContext from '../Auth/AuthContext';
import toast from 'react-hot-toast';
import { AlignRight, MenuIcon } from 'lucide-react';


const Navbar = () => {
    const {user, loading, signOutUser, setUser} = useContext(AuthContext)

    const handleSignOut=()=>{
        signOutUser()
        .then(()=>{
            toast.success('LogOut Successfully!')
            setUser(null)
        })
        .catch((error)=>{
            toast.error(error.code)
        })
    }

    return (
        <div className='border-gray-300 border-b py-2 sticky z-50 top-0 bg-white'>
            <div className='w-11/12 lg:max-w-screen-xl mx-auto flex justify-between items-center'>
                {/* logo */}
                <div className='flex items-center space-x-2 w-1/2 lg:w-1/5'>
                   <Link to='/'><img className='w-10' src={logo} alt="logo" /></Link>
                    <h1 className='font-bold hidden lg:block lg:text-2xl text-red-600'>Blood Din</h1>
                </div>

                {/* links */}
                <div className='hidden lg:flex space-x-10 w-3/5 justify-center'>
                    <NavLink to='/' className={({isActive})=>`${isActive && 'font-medium text-red-600'}`}>Home</NavLink>
                    <NavLink to='/blood-donation-requests' className={({isActive})=>`${isActive && 'font-medium text-red-600'}`}>Blood Donation Request</NavLink>
                    <NavLink to='/blog' className={({isActive})=>`${isActive && 'font-medium text-red-600'}`}>Blog</NavLink>
                    <NavLink to='/donate-fund' className={({isActive})=>`${isActive && 'font-medium text-red-600'}`}>Funding Page</NavLink>
                </div>

                {/* auth */}
                <div className='flex space-x-2 justify-end items-center w-1/2 lg:w-1/5'>
                    {
                        loading ? <span className="loading loading-spinner loading-md"></span>:
                        user?
                        <>
                        <div className="dropdown dropdown-end mr-0">
                        <div tabIndex={0} role="button">
                            <div className="avatar">
                                <div className="ring-red-700  ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                                    <img src={user.photoURL} />
                                </div>
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-auto p-2 shadow-sm">
                            <li>
                                <Link to='/dashboard'>
                                    <button>Dashboard</button>
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleSignOut}>LogOut</button>
                            </li>
                        </ul>
                        </div>
                        </>:
                        <div className='lg:flex space-x-2 mr-0 hidden'>
                         <Link to='/login'>
                            <button className='btn btn-sm'>Login</button>
                        </Link>
                        <Link to='/register'>
                            <button className='btn btn-sm bg-red-600 text-white'>Register</button>
                        </Link>
                        </div>
                    }
                    <nav className='lg:hidden ml-2'>
                    <div className="drawer drawer-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button"> 
                            <MenuIcon size={40}></MenuIcon>
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-auto p-4">
                            <NavLink to='/' className={({isActive})=>`${isActive && 'font-medium text-red-600'} my-1`}>Home</NavLink>
                            <NavLink to='/blood-donation-requests' className={({isActive})=>`${isActive && 'font-medium text-red-600'} my-1`}>Blood Donation Request</NavLink>
                            <NavLink to='/blog' className={({isActive})=>`${isActive && 'font-medium text-red-600'} my-1`}>Blog</NavLink>
                            <NavLink to='/donate-fund' className={({isActive})=>`${isActive && 'font-medium text-red-600'} my-1`}>Funding Page</NavLink>
                            {
                                user? "" :
                                <>
                            <Link to='/login'><button className='btn btn-sm w-20 my-1'>Login</button></Link>
                            <Link to='/register'><button className='btn btn-sm w-20 bg-red-600 text-white'>Register</button></Link>
                                </>
                            }
                        </ul>
                    </div>
                    </div>
                </nav>
                </div>
 
            </div>
        </div>
    );
};

export default Navbar;