import express from "express";
import dotenv from "dotenv";
import authRouter from "./apps/auth.js";
import cors from "cors";
import bodyParser from "body-parser";
import adminRouter from "./apps/admin.js";
import postRouter from "./apps/posts.js";
import Stripe from "stripe";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use('/admin', adminRouter)
app.use('/post', postRouter)

// INTENT
const calculateOrderAmount = (items) => {
  return 1400;
}
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

app.post('/create-payment-intent', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe secret key not configured" });
    }
    const { items } = req.body;
    console.log(req.body)
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
})

app.get("/", (req,res) => {
  res.send("hi sawasdee")
});

app.get("*", (req,res) => {
  res.status(404).send("Not found")
})

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
}

export default app;