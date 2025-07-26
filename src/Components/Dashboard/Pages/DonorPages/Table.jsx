import React from 'react';
import { Edit, MapPin, Trash } from 'lucide-react';

const Table = ({requestData}) => {
    return (
        <>
            <div className='flex justify-between p-5 font-bold'>
                <p>Donation Request Table</p>
                <div>
                    Filter:
                    <select name="filter" defaultValue='All' onChange={(e)=>handleFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
            </div>
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Recipient Info</th>
                    <th>Location</th>
                    <th>Date & Time</th>
                    <th>Blood Group</th>
                    <th>Status</th>
                    <th>Info</th>
                    <th className='text-right'>Action</th>
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
                            <td>
                                {data.date}, {data.time} UTC
                            </td>
                            <td>
                                {data.bloodType}
                             </td>
                             <td>
                                {data.status}
                             </td>
                             {
                                data.status === 'inprogress'?
                                <td>

                                </td>:
                                <td>-</td>
                             }
                             <td className='flex justify-end space-x-4'>
                                <Edit size={20 }></Edit>
                                <Trash size={20}></Trash>
                             </td>
                        </tr>
                    </>)
                }
                </tbody>
            </table>
        </>
    );
};

export default Table;