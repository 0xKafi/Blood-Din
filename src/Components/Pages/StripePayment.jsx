import React, { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import AuthContext from '../Auth/AuthContext';
import useAxiosPublic from '../Hooks/useAxiosPublic';
const stripePromise = loadStripe(import.meta.env.VITE_stripe_public_key);

const CheckoutForm = ({payAmount}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);
  const {user, loading} = useContext(AuthContext)
  const obj = {}
  const axiosPublic = useAxiosPublic()
  
  if(loading) return <p>loading.......</p>

  const handleSubmit = async (e) => {
    e.preventDefault();
    obj.name = user.displayName,
    obj.email = user.email,
    obj.amount = payAmount
    
    const { clientSecret } = await fetch("http://localhost:3000/create-payment-intent", {
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
        setSuccess(true);
        axiosPublic.post('/save-donation-history', obj)
        .then((res)=>console.log(res.data))
        .catch(error => console.log(error))
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='border p-4 rounded-md'>
       <CardElement />
      </div>
      <button type="submit" disabled={!stripe} className='btn btn-primary mt-5'>Pay</button>
      {success && <p>Payment Successful!</p>}
    </form>
  );
};

export default function StripePayment({amount}) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm  payAmount = {amount}/>
    </Elements>
  );
}
