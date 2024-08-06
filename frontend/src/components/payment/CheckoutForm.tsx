import { PaymentElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import logo from "@/assets/logo.svg";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: `${window.location.origin}/`,
        return_url: `${window.location.origin}/checkout/payment/success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else if (!error) {
      console.log("successful");
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };
  return (
    <div className="rounded-lg  p-4 bg-white shadow-2xl">
      <>
        <form className="m-auto" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" />
          <button
            className="bg-mainBrown w-full py-2 text-white font-bold rounded-md"
            disabled={isProcessing || !stripe || !elements}
            id="submit"
          >
            <span id="button-text">
              {isProcessing ? "Processing ... " : "Pay now"}
            </span>
          </button>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </form>
      </>
    </div>
  );
}
