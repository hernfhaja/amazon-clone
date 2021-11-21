import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import "../styles/payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import axios from "../axios";
import { db } from "../firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [paymentIntent, setPaymentIntent] = useState("");

  useEffect(() => {
    //generate the special stripe sevret which allows us to charge a customer

    const getClientSecret = async () => {
      console.log(getBasketTotal(basket));
      const response = await axios({
        method: "post",
        //stripe expects the total in a currencues submits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
      setPaymentIntent(response.data.paymentIntent);
    };

    getClientSecret();
  }, [basket]);

  console.log("The secret is >>>", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({}) => {
        //paymentIntent = payment confirmation
        console.log("from then" + user?.uid);
        console.log("paymentIntent" + paymentIntent.id);
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    setDisabled(event.emty);
    setError(event.error ? event.error.messege : "");
  };

  return (
    <div className="payment">
      <div className="payment_conteainer">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* payment section - delovery address */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>88/88 klongsam</p>
            <p>Pathumthani Thailand</p>
          </div>
        </div>

        {/* payment section - review item */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delovery</h3>
          </div>
          <div className="payment_title">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* payment section - payment method */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />

                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy NoW"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
