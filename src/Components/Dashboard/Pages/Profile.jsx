import React, { useEffect, useState } from 'react';
import district from '../../../assets/district.json'
import upazila from '../../../assets/upazila.json'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { EditIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import Loading from '../../Utils/Loading';

const Profile = () => {
    const axiosSecure = useAxiosSecure()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(()=>{
        axiosSecure('/user')
        .then((res)=>{
            setUser(res.data)
            setLoading(false)
        })
    },[])

    if(loading){
        return <Loading></Loading>
    }

    const handleUpdate = (e) =>{
        e.preventDefault()
        const name = e.target.userName.value;
        const image = e.target.url.value;
        const blood_type = e.target.bloodType.value;
        const district = e.target.district.value;
        const upazila = e.target.upazila.value;

        const userObj = {
            name,
            image,
            blood_type,
            district,
            upazila,
        }
            axiosSecure.patch('/user', userObj)
            .then(()=>{
                toast.success('Profile Updated')
                setIsDisabled(true)
            })
            .catch(error => toast.error(error.code))
    }

    return (
        <div className='w-full mx-auto min-h-screen bg-[#f0f1f7]'>
            <div className='mx-auto w-full flex justify-center items-center mt-20'>
                <div className='flex flex-col justify-center items-center py-4 w-sm shadow bg-white'>
                    <div className='flex self-end px-10 items-center'>
                        <p className='font-bold text-xl mr-25'>Profile</p>
                        <button onClick={()=>setIsDisabled(!isDisabled)}>
                            <EditIcon size={20}></EditIcon>
                        </button>
                    </div>
                    <form onSubmit={handleUpdate} className="fieldset bg-white rounded-box w-xs">
                        <label className="label">Email</label>
                        <input type="email" defaultValue={user?.email} className="input" name='email' required placeholder="Email" disabled={isDisabled} />

                        <label className="label">Name</label>
                        <input type="text" className="input"defaultValue={user?.name}  required name='userName' placeholder="Name" disabled={isDisabled}/>

                        <label className="label">Photo Url</label>
                        <input type="text" className="input" defaultValue={user?.image} required name='url' placeholder="Photo Url" disabled={isDisabled}/>

                        <label className="label">Select Blood Type</label>
                        <select name="bloodType" defaultValue={user.blood_type} className="select" required disabled={isDisabled}>
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

                        <label className="label">Select District</label>
                        <select name="district" defaultValue={user.district} className="select" required disabled={isDisabled}>
                        <option value="" disabled>Select District</option>
                        {
                            district.map(data => <option>{data.name}</option>)
                        }
                        </select>

                        <label className="label">Select Upazila</label>
                        <select name="upazila" defaultValue={user.upazila} className="select" required disabled={isDisabled}>
                        <option value="" disabled>Select Upazila</option>
                        {
                            upazila.map(data => <option>{data.name}</option>)
                        }
                        </select>
                        <button className={`${isDisabled? 'hidden': 'block'} btn bg-gray-900 text-white mt-4`}>Update Profile</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;