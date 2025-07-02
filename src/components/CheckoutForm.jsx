import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { saveOrder } from "../api/user";
import useEcomStore from "../store/ecom-stotr";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutForm = () => {

  const token = useEcomStore((e) => e.token);
  const clear = useEcomStore((e) => e.clearCart);
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setMessage(null);

    const payload = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    console.log("pay", payload);
    if (payload.error) {
      setMessage(payload.error.message || "เกิดข้อผิดพลาดในการชำระเงิน");
      console.log(payload.error);
      toast.error("เกิดข้อผิดพลาดในการชำระเงิน");
    }

    else if (payload.paymentIntent?.status === "succeeded") {


      try {
        await saveOrder(token, payload);
        clear(); // ✅ ล้างตะกร้าสินค้าเมื่อบันทึกคำสั่งซื้อสำเร็จ
        toast.success("บันทึกคำสั่งซื้อสำเร็จ");
        navigate("/user/history"); // ✅ ไปหน้า History เมื่อสำเร็จ
      } catch (err) {
        console.error(err);
        setMessage("บันทึกคำสั่งซื้อไม่สำเร็จ");
      }
    } else {
      
      toast.error("สถานะการชำระเงินไม่สำเร็จ");
      setMessage("สถานะการชำระเงินไม่สำเร็จ");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-4 mt-24">
        <PaymentElement />
      </div>

      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="bg-teal-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? "กำลังชำระ..." : "ชำระเงิน"}
      </button>

      {message && <div className="text-sm text-red-500 mt-2">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
