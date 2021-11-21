import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import "../styles/header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      console.log("sige in");
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="https://www.esyon.de/wp-content/uploads/2016/11/Amazon-Logo-weiß.png"
        />
      </Link>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_optionLineOne">
              hello {!user ? "Guest" : user.email}
            </span>
            <span className="header_optionLinetwo">
              {user ? "Sign out" : "Sign in"}
            </span>
          </div>
        </Link>

        <div className="header_option">
          <span className="header_optionLineOne">returns</span>
          <span className="header_optionLinetwo">& Order</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">your</span>
          <span className="header_optionLinetwo">prime</span>
        </div>

        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLinetwo header_basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
