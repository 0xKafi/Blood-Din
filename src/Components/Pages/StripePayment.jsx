import React, { useContext} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import AuthContext from '../Auth/AuthContext';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
const stripePromise = loadStripe(import.meta.env.VITE_stripe_public_key);

const CheckoutForm = ({payAmount, refetch}) => {
  const stripe = useStripe();
  const elements = useElements();
  const {user, loading} = useContext(AuthContext)
  const obj = {}
  const axiosPublic = useAxiosPublic()
  
  if(loading) return <p>loading.......</p>

  const handleSubmit = async (e) => {
    e.preventDefault();
    obj.name = user.displayName,
    obj.email = user.email,
    obj.amount = payAmount
    obj.date = new Date().toISOString().split('T')[0]
    
    const { clientSecret } = await fetch("https://blood-din-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj)
    }).then(res => res.json());

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        toast.success('Payment Successful!')
        axiosPublic.post('/save-donation-history', obj)
        .then(()=>refetch())
        .catch(error => console.log(error))
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='border p-4 rounded-md'>
       <CardElement />
      </div>
      <button type="submit" disabled={!stripe} className='btn bg-black text-white mt-5'>Pay</button>
    </form>
  );
};

export default function StripePayment({amount, refetch}) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm  payAmount = {amount} refetch = {refetch}/>
    </Elements>
  );
}
