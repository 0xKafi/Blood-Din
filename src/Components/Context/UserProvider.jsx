import React, { useContext, useEffect, useState } from 'react';
import UserContext from './UserContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import AuthContext from '../Auth/AuthContext';

const UserProvider = ({children}) => {
    const {loading} = useContext(AuthContext)
    const [donorLoading, setDonorLoading] = useState(true)
    const [donor, setDonor] = useState(null)
    const axiosSecure = useAxiosSecure()

    useEffect(()=>{
        if(!loading){
            axiosSecure('/user')
            .then((res)=>{
                console.log(res.data)
                setDonor(res.data)
                setDonorLoading(false)
            })
            .catch(error => console.log(error))
        }
    }, [loading, axiosSecure])

    const obj = {
        donor,
        donorLoading
    }

    return (
        <UserContext.Provider value={obj}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;