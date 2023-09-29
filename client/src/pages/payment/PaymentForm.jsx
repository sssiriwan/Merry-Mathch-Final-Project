import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { useState } from "react"
import Stripe from "stripe"
const stripePromise = await loadStripe('pk_test_51NuREbDE5qIJST4wBU3c9FaSJkBtGcgcjUJRKRx4Cqe42PRShSqKQQ7XAzzUGLbJZqZuc5mQvqm4EVgEnGPR9cHJ00dQLkX6zc')

const stripe = new Stripe('pk_test_51NuREbDE5qIJST4wBU3c9FaSJkBtGcgcjUJRKRx4Cqe42PRShSqKQQ7XAzzUGLbJZqZuc5mQvqm4EVgEnGPR9cHJ00dQLkX6zc')

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
        const response = await axios.post('http://localhost:4000/api/checkout', data);
        setSessionId(response.data.sessionId)
        console.log(sessionId)
        stripePromise.redirectToCheckout({ sessionId })
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