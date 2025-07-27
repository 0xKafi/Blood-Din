import React, { useContext } from 'react';
import { DollarSign, HeartHandshake, Users } from 'lucide-react';
import UserContext from '../../Context/UserContext';

const AdminOverview = () => {
    const {allDonationData, allUsers} = useContext(UserContext)

    return (
        <div>
            <div className='mt-10 grid lg:grid-cols-3 gap-8'>
                <div className="bg-white flex items-center gap-8 py-6 px-8 rounded-md border border-gray-200">
                    <div className="h-12 w-12 flex items-center justify-center rounded bg-purple-200">
                        <Users className="h-6 w-6 text-purple-700" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-xl text-gray-700">Total Donors</h2>
                        <p className="text-xl font-bold text-gray-900">{allUsers.length}</p>
                    </div>
                </div>
                <div className="bg-white flex items-center gap-8 py-6 px-8 rounded-md border border-gray-200">
                    <div className="h-12 w-12 flex items-center justify-center rounded bg-green-200">
                        <DollarSign className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-xl text-gray-700">Total Funding</h2>
                        <p className="text-xl font-bold text-gray-900">15600$</p>
                    </div>
                </div>

                <div className="bg-white flex items-center gap-8 py-6 px-8 rounded-md border border-gray-200">
                    <div className="h-12 w-12 flex items-center justify-center rounded bg-red-200">
                        <HeartHandshake className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-xl text-gray-700">Blood Donation Request</h2>
                        <p className="text-xl font-bold text-gray-900">{allDonationData.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;