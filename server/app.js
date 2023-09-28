import express from "express";
import authRouter from "./apps/auth.js";
import cors from "cors"
import bodyParser from "body-parser";
import adminRouter from "./apps/admin.js";
import postRouter from "./apps/posts.js";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "./utils/supabaseClient.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = 'whsec_ddb1543e8e3bea9cb412fe7f46a8eed1fc6003c552f0f2231cf67fbce9d70e76'

async function init() {
    
  const app = express();
  const port = 4000;

  app.use(cors())
  app.use(bodyParser.json())

  app.use("/auth", authRouter);
  app.use('/admin', adminRouter)
  app.use('/post', postRouter )

  // INTENT
  const calculateOrderAmount = (items) => {
    return 1400;
  }
  app.post('/create-payment-intent', async (req,res) => {
    const { items } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'thb',
      automatic_payment_methods: {
        enabled: true,
      }
    })

    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  })

  app.get("/", (req,res) => {
    res.send("hi sawasdee")
  });

  app.get("*", (req,res) => {
    res.status(404).send("Not found")
  })
  
  app.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
}

init();





  
// app.get('/api/order/:id', async (req,res) => {
//   const orderId = req.params.id;
//   const { data } = await supabase.from('payment').select('*').eq('order_id', orderId).single();
//   return res.json({
//     data
//   })
// })

// app.post('/api/checkout', express.json(), async (req,res) => {
//   const { user, product } = req.body
//   const orderId = uuidv4();
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'] ,
//     line_items: [
//       {
//         price_data: {
//           currency: 'thb',
//           product_data: {
//             name: product.name,
//           },
//           unit_amount: product.price * 100,
//         },
//         quantity: product.quantity,
//       },
//     ],
//     mode: 'payment',
//     success_url: `http://localhost:5173/profile?id=${orderId}`,
//     cancel_url: 'http://localhost:5173/package',
//   })

//   const orderData = {
//     username: user.name,
//     order_id: orderId,
//     session_id: session.id,
//     status: session.status
//   }
//   const result = await supabase.from('payment').insert([orderData]).select();

//   return res.json({
//     user,
//     product,
//     result,
//     sessionId: session.id,
//   })
// })

// app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
//   const sig = req.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     res.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   switch (event.type) {
//     case 'checkout.session.completed':
//       const paymentData = event.data.object;
//       const sessionId = paymentData.id
//       const { data } = await supabase.from('payment').update({ status: paymentData.status }).eq('session_id', sessionId);
//       console.log(data)
//       break;
//   }
//   console.log(`Unhandled event type ${event.type}`);

//   res.send();
// });