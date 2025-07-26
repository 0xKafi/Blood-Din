import React, {useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Table from './Table';
import { Link } from 'react-router';

const UserOverview = () => {
    const [requestData, setRequestData] = useState([]);
    const axiosSecure = useAxiosSecure();

    const fetchData = () => {
        axiosSecure('/donor-donation-request')
            .then((res) => setRequestData(res.data))
            .catch((error) => console.log(error.code));
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='mt-10'>
            <div className={`overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ${
                requestData.length === 0 ? 'hidden' : ''}`}>
                <Table requestData={requestData} refetch={fetchData} />
            </div>
            {
                requestData.length === 0 ? '':
                <Link to='/dashboard/my-donation-requests'>
                    <button className='btn block mt-5 mx-auto bg-gray-900 text-white mt-'>View All Donation Request</button>
                </Link>
            }
            <p className={`text-xl text-center ${
                requestData.length === 0 ? '' : 'hidden'}`}>No Donation Request Found</p>

        </div>
    );
};

export default UserOverview;