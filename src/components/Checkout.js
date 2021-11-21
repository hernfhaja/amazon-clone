import React from "react";
import { useStateValue } from "../StateProvider";
import "../styles/checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="http://www.ads-now.com/wp-content/uploads/2019/03/ADsNOW_BNR-ADs-01-1024x256.jpg"
        ></img>

        <div>
          <h3>Hello , {user?.email}</h3>
          <h2 className="checkout_title">Your shoping Basket</h2>
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

      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
