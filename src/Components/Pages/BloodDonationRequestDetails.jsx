import React, { useContext, useEffect, useState} from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useParams } from 'react-router';
import UserContext from '../Context/UserContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const BloodDonationRequestDetails = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const params = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const {donor} = useContext(UserContext)

    const reFetch = () =>{
        axiosPublic(`/blood-donation-request/${params.id}`)
        .then(res =>{
            console.log(res.data)
            setData(res.data)
            setLoading(false)
        })
        .catch(error => console.log(error))
    }

    useEffect(()=>{
        reFetch()
    }, [])

    const handleRequest=(e)=>{
        e.preventDefault()
        const obj = {
            'donor_email' : donor.email,
            'donor_name' : donor.name,
            'status' : 'inprogress'
        }
        axiosSecure.patch(`/add-donor-info/${params.id}`, obj)
            .then(res =>{
                console.log(res.data)
                reFetch()
            })
            .catch(error => console.log(error))
    }

    if(loading) return <span className="loading loading-spinner loading-md"></span>
    return (
        <div className='max-w-screen-xl mx-auto flex justify-center items-center pt-10'>
                    <dialog id="my_modal_3" className="modal">
                    <div className="modal-box mx-auto">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleRequest} className="fieldset bg-white rounded-box w-xs">
                        <label className="label">Email</label>
                        <input type="email" className="input" defaultValue={donor?.email} name='email' required readOnly placeholder="Email" />

                        <label className="label">Name</label>
                        <input type="text" className="input" defaultValue={donor?.name} required name='name' readOnly placeholder="Name"/>

                        <button className='btn bg-gray-900 text-white mt-2'>Submit Update</button>
                    </form>
                    </div>
                </dialog>
            {
                <div className="card w-full max-w-lg shadow bg-base-100 border border-base-300 p-4">
                <div className="card-body space-y-2">
                    <h2 className="card-title text-xl font-semibold text-primary">
                    Blood Request - ({data.bloodType})
                    </h2>

                    <div>
                    <p><span className="font-semibold">Recipient:</span> {data.recipient_name}</p>
                    <p><span className="font-semibold">Hospital:</span> {data.hospital_name}</p>
                    <p><span className="font-semibold">Address:</span> {data.address}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                    <p><span className="font-semibold">District:</span> {data.district}</p>
                    <p><span className="font-semibold">Upazila:</span> {data.upazila}</p>
                    <p><span className="font-semibold">Date:</span> {data.date}</p>
                    <p><span className="font-semibold">Time:</span> {data.time}</p>
                    <p><span className="font-semibold">Status:</span> 
                        <span className={`ml-1 badge ${data.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                        {data.status}
                        </span>
                    </p>
                    </div>

                    <p><span className="font-semibold">Details:</span> {data.details}</p>

                    <div className="mt-4 text-sm text-gray-500">
                    <p>Requested by: {data.name} ({data.email})</p>
                    <p>Requested on: {new Date(data.req_date).toLocaleString()}</p>
                    </div>
                </div>
                <button onClick={()=>{
                        document.getElementById('my_modal_3').showModal()
                }} className='btn bg-black text-white'>Donate</button>
                </div>
            }
        </div>
    );
};

export default BloodDonationRequestDetails;