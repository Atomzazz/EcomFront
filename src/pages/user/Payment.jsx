import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";

import { payment } from "../../api/stripe";

import useEcomStore from '../../store/ecom-stotr'
import CheckoutForm from "../../components/CheckoutForm";
const stripePromise = loadStripe("pk_test_51Rb0C9BHvSuDBN8ENzMIbHBSbDuKjJjfQULhPiwl8gt2vhMDOuTxLslbx4zsujRi1vIeZyCllEfcmimB9koLydao00DWzXJNfn");

const Payment = () => {
  const token = useEcomStore((e) => e.token);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    payment(token)
      .then((res) => {
        
        setClientSecret(res.data.clientSecret)

      })
      .catch((err) => {
        console.log(err);

      })

  }, [])

  const appearance = {
    theme: 'stripe', // ใช้ default theme: 'stripe', 'night', 'flat', 'none'
  }

  const loader = 'auto'
  return (
    <div className='py-10 mb-10'>
      {clientSecret && (
        <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )


}

export default Payment