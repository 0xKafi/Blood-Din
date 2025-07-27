import React, {useContext } from 'react';
import Table from './DonorPages/Table'
import UserContext from '../../Context/UserContext';

const BloodDonationRequest = () => {
    const {allDonationData, fetchAllDonation} = useContext(UserContext)

    return (
        <div className='min-h-screen bg-[#f0f1f7] px-6 pt-6'>
            <h1 className='font-bold text-2xl lg:text-4xl mb-10'>All Donation Request</h1>
            <div className={`overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ${
                allDonationData.length === 0 ? 'hidden' : ''}`}>
                <Table requestData={allDonationData} refetch={fetchAllDonation} />
            </div>
    </div>
    );
};

export default BloodDonationRequest;