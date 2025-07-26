import React, { useContext, useState } from 'react';
import { Edit, MapPin, Trash } from 'lucide-react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import UserContext from '../../../Context/UserContext';
import district from '../../../../assets/district.json'
import upazila from '../../../../assets/upazila.json'

const Table = ({requestData, refetch}) => {
    const {donor} = useContext(UserContext)
    const [currentData, setCurrentData] = useState(null)
    const axiosPublic = useAxiosPublic()

    const handleDelete=()=>{
        const id = currentData._id
        console.log("coming")
        axiosPublic.delete(`/delete-request/${id}`)
        .then((res)=>{
             console.log(res.data)
            refetch()
        })
        .catch((error)=> console.log(error))
    }
    const handleFilter=()=>{

    }
    const handleUpdate=(e)=>{
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        const objData = Object.fromEntries(formData.entries());

        axiosPublic.patch(`/update-request/${currentData._id}`, objData )
        .then((res)=>{
             console.log(res.data)
            refetch()
        })
        .catch((error)=> console.log(error))
    }


    return (
        <>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <p className="py-4">Do you really want to delete this?</p>
                    <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-success">No, I'm Not</button>
                        <button onClick={handleDelete} className='btn btn-warning ml-3'>Yes, Continue</button>
                    </form>
                    </div>
                </div>
            </dialog>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box mx-auto">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleUpdate} className="fieldset bg-white rounded-box lg:w-md w-xs grid lg:grid-cols-2 gap-2">
                        <div>
                        <label className="label">Email</label>
                        <input type="email" className="input" defaultValue={donor?.email} name='email' required readOnly placeholder="Email" />

                        <label className="label">Name</label>
                        <input type="text" className="input" defaultValue={donor?.name} required name='name' readOnly placeholder="Name"/>

                        <label className="label">Recipient Name</label>
                        <input type="text" className="input" required defaultValue={currentData?.recipient_name} name='recipient_name' placeholder="Recipient Name"/>

                        <label className="label">Select Recipient District</label>
                        <select name="district" defaultValue={currentData?.district} className="select" required>
                        <option value="" disabled>Select Recipient District</option>
                        {
                            district.map(data => <option>{data.name}</option>)
                        }
                        </select>

                        <label className="label">Select Upazila</label>
                        <select name="upazila" defaultValue={currentData?.upazila} className="select" required>
                        <option value="" disabled>Select Upazila</option>
                        {
                            upazila.map(data => <option>{data.name}</option>)
                        }
                        </select>
                        <label className="label">Hospital Name</label>
                        <input type="text" className="input" defaultValue={currentData?.hospital_name} required name='hospital_name' placeholder="Hospital Name"/>
                        </div>
                        <div>
                        <label className="label">Address</label>
                        <input type="text" className="input" defaultValue={currentData?.address} required name='address' placeholder="Full Address"/>

                        <label className="label">Select Blood Type</label>
                        <select name="bloodType"  defaultValue={currentData?.bloodType} className="select" required>
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

                        <label className="label">Date</label>
                        <input type="date" className="input"  defaultValue={currentData?.date} required name='date'/>
                        <label className="label">Time</label>
                        <input type="time" className="input"   defaultValue={currentData?.time} required name='time'/>

                        <label className="label">Write Details Message</label>
                        <textarea name="details" className='input textarea'  defaultValue={currentData?.details} placeholder='write details message'></textarea>
                        </div>
                        <button className='btn bg-gray-900 text-white mt-2'>Submit Update</button>
                    </form>
                    </div>
                </dialog>

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
                             <td className='flex justify-end items-center space-x-4'>
                                <Edit onClick={()=>{
                                    setCurrentData(data);
                                    document.getElementById('my_modal_3').showModal()
                                }} size={20 }></Edit>
                                <Trash onClick={()=>{
                                    document.getElementById('my_modal_5').showModal()
                                }} id='my_modal_5' size={20}></Trash>
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