import React, {useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Table from './Table';

const MyDonationRequest = () => {
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
        <div className='min-h-screen bg-[#f0f1f7] px-6 pt-6'>
            <h1 className='font-bold text-2xl lg:text-4xl mb-10'>My Donation Request</h1>
            <div className={`overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ${
                requestData.length === 0 ? 'hidden' : ''}`}>
                <Table requestData={requestData} refetch={fetchData} />
            </div>
            {
                
            }
    </div>
    );
};

export default MyDonationRequest;