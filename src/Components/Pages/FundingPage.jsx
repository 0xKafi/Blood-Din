import React, { useEffect, useState } from 'react';
import StripePayment from './StripePayment';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loading from '../Utils/Loading';

const FundingPage = () => {
    const [amount, setAmount] = useState(0)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosSecure = useAxiosSecure()

    const refetch =()=>{
        axiosSecure('/get-transaction-data')
        .then((res)=>{
            setData(res.data);
            setLoading(false)
        })
    }

    useEffect(()=>{
        refetch()
    }, [])
    

    return (
        <div className='bg-[#f0f1f7] min-h-screen'>

        <dialog id="my_modal_5" className="modal">
            <div className="modal-box">
                <div className='w-sm border border-base-300 p-4 rounded-md'>
                    <h1 className='font-medium text-xl py-2'>Simple Stripe Checkout</h1>
                    <label className='text-sm text-black/60'>Amount</label>
                    <br />
                    <input type="number" required  placeholder='Enter Amount (min: 5$)' className='border p-3 rounded-md w-full mb-1' onChange={(e)=>setAmount(e.target.value*100)} min={5} />
                    <label className='text-sm text-black/60'>Card Details</label>
                    <StripePayment amount={amount} refetch={refetch} />
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            </dialog>

            <div className='max-w-screen-xl w-11/12 mx-auto'>
                <h1 className='text-4xl font-bold pt-10'>Funding Page</h1>
                <div className='flex justify-end'>
                    <button onClick={()=>
                        document.getElementById('my_modal_5').showModal()
                    }className='btn bg-black text-white mt-5'>Donate Fund</button>
                </div>
                {
                    loading? <Loading></Loading>:
                        <div className={`mt-10 overflow-x-auto rounded-box border max-w-screen-xl mx-auto border-base-content/5 bg-base-100 ${
                            data === null ? 'hidden' : ''}`}>
                                <p className='p-4 font-bold'>Donation History</p>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th className='text-center'>Amount</th>
                                <th className='text-end'>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data?.map(data => <>
                                    <tr>
                                        <td>{data.name}</td>
                                        <td className='text-center'>
                                            <span className='rounded-full text-xs px-3 py-1 bg-green-100 text-green-800 font-bold'>{data.amount/100}.00 $</span>
                                        </td>
                                        <td className='text-right'>{data.date}</td>
                                    </tr>
                                </>)
                            }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
};

export default FundingPage;