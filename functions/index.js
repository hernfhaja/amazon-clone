const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Jr00lC4dlsIh7CepinokDxWlsVfEiaGf68ncPiSnPKKrVsH6c6kpvbPATsg95uOyLDHAax4kLySVtehpoSseNxK001vHNu9Ko"
);
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) =>
  response.status(200).send("sss hello world")
);

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Recieved Boom for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // submits of the currency
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
    paymentIntent: paymentIntent,
  });
});

app.post("/payments/test", async (request, response) => {
  const test = request.query.total;
  console.log(test);
  response.status(201).send("hello good 200" + test);
});

// - Listen command
exports.api = functions.https.onRequest(app);

//example endpoint
//http://localhost:5001/clone-e0539/us-central1/api
