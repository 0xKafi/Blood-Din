import React, { useContext } from 'react';
import AuthContext from '../../Auth/AuthContext';
import AdminOverview from './AdminOverview';
import useRole from '../../Hooks/useRole';
import UserOverview from './DonorPages/UserOverview';

const Overview = () => {
    const {user} = useContext(AuthContext)
    const {role} = useRole()
    return (
        <div className='min-h-screen bg-[#f0f1f7] px-6 pt-6'>
            <h1 className='font-bold text-2xl lg:text-4xl'>Welcome Back, <span className='bg-red-700 text-white px-2'>{user.displayName}!</span></h1>
            {
                role === 'admin' &&   <AdminOverview></AdminOverview>
            }
            {
                role === 'donor' && <UserOverview></UserOverview>
            }
        </div>
    );
};

export default Overview;