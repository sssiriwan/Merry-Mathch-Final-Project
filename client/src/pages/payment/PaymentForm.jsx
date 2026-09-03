import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { useState } from "react"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function PaymentForm() {
    const [sessionId , setSessionId] = useState("")
    const data = {
        "user": {
            "name": "Ploy" //data.name,
        },
        "product": {
            "name": "Shirt", //product.name
            "price": 200,
            "quantity": 1,
        }
    }

    const sentData = async () => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/checkout`, data);
        setSessionId(response.data.sessionId)
        console.log(sessionId)
        stripePromise.then(stripe => stripe.redirectToCheckout({ sessionId }))
    }

    return (
        <div>
            <form className="bg-orange-500 w-fit">
                <button onClick={sentData}>SUBMIT</button>
            </form>
        </div>
    )
}

export default PaymentForm