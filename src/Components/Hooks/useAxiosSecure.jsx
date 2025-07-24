import React, { useContext } from 'react';
import AuthContext from '../Auth/AuthContext';
import axios from 'axios';

const useAxiosSecure = () => {
    const {user, loading} = useContext(AuthContext);

    if(loading) return <div>Loading</div>

    const instance = axios.create({
        baseURL: "http://localhost:3000",
        headers: {
            Authorization: `Bearer ${user?.accessToken}`
        }
    })
    return instance;
};

export default useAxiosSecure;