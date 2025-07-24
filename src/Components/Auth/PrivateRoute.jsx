import React, { useContext } from 'react';
import AuthContext from '../Auth/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user, loading} = useContext(AuthContext)

    if(loading){
        return <div className='h-screen flex justify-center items-center'>
             <span className="loading loading-spinner loading-xl"></span>
        </div>
    }

    if(user){
        return children;
    }
    else{
        console.log(location)
        return <Navigate state={location?.pathname} to='/login'></Navigate>
    }

};
export default PrivateRoute;