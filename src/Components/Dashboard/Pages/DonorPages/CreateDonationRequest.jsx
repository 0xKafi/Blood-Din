import React, { useContext } from 'react';
import district from '../../../../assets/district.json'
import upazila from '../../../../assets/upazila.json'
import UserContext from '../../../Context/UserContext';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const CreateDonationRequest = () => {

    const {donor} = useContext(UserContext)
    const axiosPublic = useAxiosPublic()

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form); 

        const data = Object.fromEntries(formData.entries());
        data.status = 'pending'
        data.req_date = new Date()

        axiosPublic.post('/create-donation', data)
        .then((res)=> console.log(res.data))
        .catch((error)=> console.log(error.code))
    };

    return (
        <div className='w-full mx-auto min-h-screen bg-[#f0f1f7]'>
            <p className={`${donor.status === 'active' ? 'hidden': ''} text-xl font-bold`}>
                Your Account is blocked
            </p>
            <div className={`mx-auto w-full flex justify-center items-center mt-20 ${donor.status === 'active' ? '': 'hidden'}`}>
                <div className='flex flex-col justify-center items-center py-4 lg:w-lg w-sm shadow bg-white'>
                    <form onSubmit={handleSubmit} className="fieldset bg-white rounded-box lg:w-md w-xs grid lg:grid-cols-2 gap-2">
                        <div>
                        <label className="label">Email</label>
                        <input type="email" className="input" defaultValue={donor?.email} name='email' required readOnly placeholder="Email" />

                        <label className="label">Name</label>
                        <input type="text" className="input" defaultValue={donor?.name} required name='name' readOnly placeholder="Name"/>

                        <label className="label">Recipient Name</label>
                        <input type="text" className="input" required name='recipient_name' placeholder="Recipient Name"/>

                        <label className="label">Select Recipient District</label>
                        <select name="district" defaultValue="" className="select" required>
                        <option value="" disabled>Select Recipient District</option>
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
                        <label className="label">Hospital Name</label>
                        <input type="text" className="input" required name='hospital_name' placeholder="Hospital Name"/>
                        </div>
                        <div>
                        <label className="label">Address</label>
                        <input type="text" className="input" required name='address' placeholder="Full Address"/>

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

                        <label className="label">Date</label>
                        <input type="date" className="input" required name='date'/>
                        <label className="label">Time</label>
                        <input type="time" className="input" required name='time'/>

                        <label className="label">Write Details Message</label>
                        <textarea name="details" className='input textarea' placeholder='write details message'></textarea>
                        </div>
                        <button className='btn bg-gray-900 text-white mt-2'>Submit Request</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateDonationRequest;