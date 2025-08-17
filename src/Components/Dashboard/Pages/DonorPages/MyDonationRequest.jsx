import React, {useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Table from './Table';

const MyDonationRequest = () => {
    const [requestData, setRequestData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 5;
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = requestData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(requestData.length / itemPerPage);

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
                <Table requestData={currentItems} refetch={fetchData} />
            </div>
            {
                totalPages >= 2 ?
                <div className='flex items-center justify-center mt-2'>
                    <div className="join">
                        <button disabled={currentPage === 1} onClick={()=> setCurrentPage(currentPage-1)} className='join-item btn'>Prev</button>
                        <button className='join-item btn'>{currentPage}</button>
                        <button disabled={currentPage === totalPages} onClick={()=> setCurrentPage(currentPage+1)} className='join-item btn'>Next</button>
                    </div>
                </div>
                :''
            }
            {
                <p className={`text-xl text-center ${
                requestData.length === 0 ? '' : 'hidden'}`}>No Donation Request Found</p>
            }
    </div>
    );
};

export default MyDonationRequest;