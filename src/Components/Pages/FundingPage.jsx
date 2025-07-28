import React, { useState } from 'react';
import StripePayment from './StripePayment';

const FundingPage = () => {
    const [amount, setAmount] = useState(0)
    return (
        <div className='bg-[#f0f1f7] min-h-screen'>
            <div className='max-w-screen-xl mx-auto'>
                <h1 className='text-4xl font-bold pt-10'>Funding Page</h1>
                <button className='btn btn-primary'>Donate Fund</button>

                <div className='py-20 w-sm border px-4 rounded-md mt-5'>
                    <h1 className='font-medium text-xl py-2'>Simple Stripe Checkout</h1>
                    <label>Amount</label>
                    <input type="number"  placeholder='Enter Amount (min: 5$)' className='input mb-1' onChange={(e)=>setAmount(e.target.value*100)} min={5} />
                    <StripePayment amount={amount} />
                </div>
            </div>
        </div>
    );
};

export default FundingPage;