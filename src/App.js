import "./styles/App.css";
import Header from "./components/header";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import React, { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders";

const promise = loadStripe(
  "pk_test_51Jr00lC4dlsIh7CeU8I1QIfhLPgpoNMJCsAeLqTwYAbPECectxAA2JtfbSvEssLojbN8jiurUcAINydOXUIQ74y600W6gbxyOG"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("this user is >>> ", authUser);

      if (authUser) {
        // the user just logged in /  the user was logged in
        console.log("first dis");
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        console.log("second dis");
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Header />
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
