import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function Payment() {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        }).then((res) => res.json()).then((data) => setClientSecret(data.clientSecret))
    }, [])

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    }

    return (
        <div>
            <h1>asdasd</h1>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )

}

export default Payment