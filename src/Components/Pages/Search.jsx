import React, { useEffect, useState } from 'react';
import district from '../../assets/district.json'
import upazila from '../../assets/upazila.json'
import { useLoaderData } from 'react-router';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router';

const Search = () => {
    const data = useLoaderData();
    const [filteredData, setFilteredData] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        const blood_type = e.target.bloodType.value;
        const district = e.target.district.value;
        const upazila = e.target.upazila.value;

        console.log(data, 1);
        const filteredData1 = data?.filter((item) => {
            return (
            (item.bloodType === blood_type) &&
            (item.district === district) &&
            (item.upazila === upazila)
            );
        });

        setFilteredData(filteredData1); // ✅ This updates the UI
        console.log(filteredData1);
    };

    return (
        <div className='bg-[#f0f1f7] min-h-screen'>
            <div className={`mx-auto w-full flex justify-center items-center py-10`}>
                <div className='flex flex-col justify-center items-center py-4 w-sm shadow bg-white'>
                    <form onSubmit={handleSubmit} className="fieldset bg-white rounded-box w-xs gap-2">
                        <div>
                        <label className="label">Select Blood Type</label>
                        <select name="bloodType" defaultValue="" className="select" required>
                            <option value="" disabled>Select Blood Type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>

                        <label className="label">Select Recipient District</label>
                        <select name="district" defaultValue="" className="select" required>
                        <option value="" disabled>Select District</option>
                        {
                            district.map(data => <option>{data.name}</option>)
                        }
                        </select>

                        <label className="label">Select Upazila</label>
                        <select name="upazila" defaultValue="" className="select" required>
                        <option value="" disabled>Select Upazila</option>
                        {
                            upazila.map(data => <option>{data.name}</option>)
                        }
                        </select>
                        </div>
                        <button className='btn bg-gray-900 text-white mt-2'>Submit Request</button>
                    </form>
                </div>
            </div>
            <div className={`overflow-x-auto max-w-screen-xl mx-auto rounded-box border border-base-content/5 bg-base-100 ${
                filteredData === null ? 'hidden' : ''}`}>
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
                    filteredData?.map(data => <>
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
    );
};

export default Search;