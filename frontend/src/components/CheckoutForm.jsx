import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import ErrorDialog from './popup/ErrorPopup'

function CheckoutForm({ password, email, username }) {
  const [priceId, setPriceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Set priceId using the environment variable
    setPriceId(import.meta.env.VITE_APP_STRIPE_SUBSCRIPTION_PRICE_ID);
  }, []);

  const stripe = useStripe();
  const elements = useElements();

const createSubscription = async () => {
  setIsLoading(true);
  setError("")

  try {
    if (!stripe) {
      throw new Error("Stripe failed to load. Please refresh the page.");
    }
    console.log("stripe loaded", stripe)
    
    const cardElement = elements.getElement(CardElement);
    
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        email,
        email,
      },
    });

    if (error) {
      throw new Error(error.message);
      setError(error.message)
    }

    const response = await fetch("http://localhost:8800/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: { email, password, username },
        payment_method: paymentMethod,
      }),
    });


    const data = await response.json();

    console.log(data)

    if (data.err) {
      setError(data.err.message)
    }

    if (!response.ok) {
      throw new Error(data.statusText || "Failed to subscribe");
    }

    // Subscription successful
    alert("Success! Check your email for the invoice.");
  } catch (error) {
    setError(error.message || "Something went wrong");
    if (!stripe) {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  } finally {
    setIsLoading(false);
  }
};



  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#333',
        '::placeholder': {
          color: '#ccc',
        },
      },
      invalid: {
        color: '#e74c3c',
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="grid gap-4 m-auto">
      <CardElement options={cardElementOptions} />
      {error && <div className="text-red-500">{error}</div>}
      <button onClick={createSubscription} style={{ marginTop: "20px", marginBottom: "5px", color: "#fff" }} type="submit" disabled={!stripe || isLoading}>
        {isLoading ? "Processing..." : "Subscribe"}
      </button>
    </div>
  );
}

export default CheckoutForm;
