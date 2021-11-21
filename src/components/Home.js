import React from "react";
import "../styles/home.css";
import Product from "../components/product.js";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          src="https://images.squarespace-cdn.com/content/v1/53d8f79ae4b08c0419252c46/1597158143963-7O03ZBETAIK1V7YNUFRX/Sketch_02_03.jpg?format=1000w"
          alt=""
          className="home_image"
        />

        <div className="home_row">
          <Product
            id="123456789"
            title="Avanger"
            price={29.99}
            image="https://cdn.shopify.com/s/files/1/0057/3728/3618/products/53198_480x.progressive.jpg?v=1614961253"
            rating={5}
          />
          <Product
            id="449524823"
            title="Avanger"
            price={29.99}
            image="https://cdn.shopify.com/s/files/1/0057/3728/3618/products/53198_480x.progressive.jpg?v=1614961253"
            rating={5}
          />
          <Product
            id="481454474"
            title="Avanger"
            price={29.99}
            image="https://cdn.shopify.com/s/files/1/0057/3728/3618/products/53198_480x.progressive.jpg?v=1614961253"
            rating={5}
          />
        </div>

        <div className="home_row">
          <Product
            id="123456789"
            title="Avanger"
            price={29.99}
            image="https://cdn.shopify.com/s/files/1/0057/3728/3618/products/53198_480x.progressive.jpg?v=1614961253"
            rating={5}
          />
          <Product
            id="481454474"
            title="Avanger"
            price={29.99}
            image="https://cdn.shopify.com/s/files/1/0057/3728/3618/products/53198_480x.progressive.jpg?v=1614961253"
            rating={5}
          />
        </div>

        <div className="home_row">{/* /* <Product/> */}</div>
      </div>
    </div>
  );
}

export default Home;
