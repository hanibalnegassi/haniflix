import React, { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm'

function StripePaymentForm({ newUser }) {
  console.log(newUser);
  
  const [loading, setLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  
  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowCheckoutForm(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>
        <div style={{ marginBottom: 10, color: '#fff' }}>Card Details:</div>
      </h4>
        <Elements stripe={stripePromise}>
          <CheckoutForm password={newUser.password} email={newUser.email} username={newUser.username}/>
        </Elements>
    </form>
  );
}

export default StripePaymentForm;
