import { ButtonDemo } from "@/components/base/button/Button";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import "../../App.css";
import { usePackage } from "@/contexts/packageProvider";
import axios from "axios";
import { supabase } from "@/utils/supabaseClient";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { packageId } = usePackage();
  console.log(packageId, "ไอดี");

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUserProfile = async () => {
    const result = await axios.get("http://localhost:4000/post/profile");
    setUserId(result.data.data.user_id);
  };

  useEffect(() => {
    getUserProfile();
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userId)

    const checkPurchase = await supabase
      .from("purchase")
      .select("*")
      .eq("user_id", userId)
      .select();
    console.log(checkPurchase.data);
    if (checkPurchase.data.length == 0) {
      const response = await axios.post("http://localhost:4000/post/purchase", {
        packageId: packageId,
      });
      console.log(response);
    } else {
      console.log("อัปเดตแพคเป็นอันนี้", packageId)
      const updatePackage = {
        package_id: packageId,
        purchase_date: new Date(),
      };
      const { data, error } = await supabase
        .from("purchase")
        .update(updatePackage)
        .eq("user_id", userId);
      
    }

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/membership-success",
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form className="" id="payment-form" onSubmit={handleSubmit}>
      <div className="px-5 py-7">
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PaymentElement
          className="pt-5"
          id="payment-element"
          options={paymentElementOptions}
        />
      </div>
      <div className="flex items-center justify-around pb-5">
        {message && <div className="text-pred-600 font-bold">{message}</div>}
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <ButtonDemo id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Payment Confirm"
            )}
          </ButtonDemo>
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;
