import React, {useContext, useState } from 'react';
import Table from './DonorPages/Table'
import UserContext from '../../Context/UserContext';

const BloodDonationRequest = () => {
    const {allDonationData, fetchAllDonation} = useContext(UserContext)

    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 5;
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = allDonationData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allDonationData.length / itemPerPage);

    return (
        <div className='min-h-screen bg-[#f0f1f7] px-6 pt-6'>
            <h1 className='font-bold text-2xl lg:text-4xl mb-10'>All Donation Request</h1>
            <div className={`overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ${
                allDonationData.length === 0 ? 'hidden' : ''}`}>
                <Table requestData={currentItems} refetch={fetchAllDonation} />
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
        </div>
    );
};

export default BloodDonationRequest;