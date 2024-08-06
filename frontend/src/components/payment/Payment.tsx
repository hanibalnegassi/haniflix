import CheckoutForm from "./CheckoutForm";
// import { useStripe } from "@stripe/react-stripe-js";
function Payment({ clientSecret }: { clientSecret: string }) {
  // const stripe = useStripe();

  return (
    <div className="m-auto ">
      <CheckoutForm />
    </div>
  );
}

export default Payment;
