import React, { useContext, useEffect, useState } from 'react';
import UserContext from './UserContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import AuthContext from '../Auth/AuthContext';

const UserProvider = ({children}) => {
    const {loading} = useContext(AuthContext)
    const [donorLoading, setDonorLoading] = useState(true)
    const [donor, setDonor] = useState(null)
    const axiosSecure = useAxiosSecure()
    const [allDonationData, setAllDonationData] = useState([]);
    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])


    useEffect(()=>{
        if(!loading){
            axiosSecure('/user')
            .then((res)=>{
                setDonor(res.data)
                setDonorLoading(false)
            })
            .catch(error => console.log(error))
        }
    }, [loading, axiosSecure])

    const fetchAllDonation = () => {
        axiosSecure('/all-donation-request')
            .then((res) => setAllDonationData(res.data))
            .catch((error) => console.log(error));
    };

        useEffect(() => {
            if (!loading) {
                fetchAllDonation();
            }
        }, [loading]);

    const fetchUsers = async () => {
    try {
        const res = await axiosSecure('/users');
            setUsers(res.data);
            setAllUsers(res.data);
        } catch (error) {
            console.log(error.code);
        }
    };

    useEffect(() => {
        if(!loading){
            fetchUsers();
        }
    }, [loading]);

    const obj = {
        donor,
        donorLoading,
        allDonationData,
        fetchAllDonation,
        users,
        allUsers,
        fetchUsers,
        setUsers
    }

    return (
        <UserContext.Provider value={obj}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;