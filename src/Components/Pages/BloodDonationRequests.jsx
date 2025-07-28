import React, { useState } from 'react';
import { useEffect } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router';

const BloodDonationRequests = () => {
    const axiosPublic = useAxiosPublic()
    const [requestData, setRequestData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
    axiosPublic('/blood-donation-requests')
        .then(res =>{
            setRequestData(res.data)
            setLoading(false)
        })
        .catch(error => console.log(error))
    }, [])
    if(loading) return <span className="loading loading-spinner loading-md"></span>

    return (
        <div className='bg-[#f0f1f7] min-h-screen'>
        <div className='mx-auto max-w-screen-xl py-10'>
            <div className={`overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ${
                requestData.length === 0 ? 'hidden' : ''}`}>
            <table className="table">
                <thead>
                <tr>
                    <th>Recipient Info</th>
                    <th>Location</th>
                    <th>Date & Time</th>
                    <th>Blood Group</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    requestData?.map(data => <>
                        <tr>
                            <td>
                                <p>{data.recipient_name}</p>
                            </td>
                            <td>
                                <div className='flex items-center'><MapPin size={16}/> {data.upazila}, {data.district}</div>
                            </td>
                            <td>{data.date}, {data.time} UTC</td>
                            <td>{data.bloodType}</td>
                             <td>{data.status}</td>
                             <td>
                             <Link to={`/blood-donation-request/${data._id}`}>
                                <button className='btn'>view details</button>
                             </Link>   
                             </td>
                        </tr>
                    </>)
                }
                </tbody>
            </table>
        </div>
        </div>
        </div>
    );
};

export default BloodDonationRequests;