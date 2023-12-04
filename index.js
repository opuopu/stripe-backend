const express = require("express");
const app = express();
const cors  = require('cors')
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:[
    'http://localhost:5173'
  ]
}))
const port = 3000;
const stripe  = require('stripe')('sk_test_51JxCs8L9MVzlfyPWBrdSppNnP55RJcU7VgaaVh7yzA4GQOkGp8HuZKPkEw1XUE8Q52PVkPmrvV9pX0voNBghZEqe00j7GeJonW')
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const calculateOrderAmount = (items) => {

  return 1500;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  console.log("body",req.body)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
  });
  console.log(paymentIntent)

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

