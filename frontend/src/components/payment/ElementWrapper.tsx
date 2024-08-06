import * as React from "react";
import { loadStripe } from "@stripe/stripe-js";
import logo from "@/assets/logo.svg";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
// import { useStripe } from "@stripe/react-stripe-js";
export function ElementWrapper({ children }: { children: React.ReactNode }) {
  const [stripePromise, setStripePromise] = React.useState<any>(null);
  const [clientSecret, setClientSecret] = React.useState<string>("");
  const [publishableKey, setPublishableKey] = React.useState("");

  React.useEffect(() => {
    axios.get("/payment/getConfig").then((res) => {
      console.log(res);
      // setPublishableKey(res?.data?.publishableKey);
      setStripePromise(loadStripe(res?.data?.publishableKey));
    });
    // fetch("/config").then(async (r) => {
    //   const { publishableKey } = await r.json();
    //   setStripePromise(loadStripe(publishableKey));
    // });
  }, []);

  React.useEffect(() => {
    axios
      .post("/payment/createPaymentIntent", {
        currency: "AED",
      })
      .then((res) => {
        console.log(res);
        setClientSecret(res?.data?.clientSecret);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="m-auto ">
      {clientSecret && stripePromise ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          {children}
        </Elements>
      ) : (
        <div className="relative aspect-square m-auto w-[10rem] tablet:w-[12rem] animate-bounce animate-pulse"></div>
      )}
    </div>
  );
}

export default ElementWrapper;
