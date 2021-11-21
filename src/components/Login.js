import React, { useState } from "react";
import "../styles/login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    console.log(email, password);

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => alert(error));
  };

  const register = (e) => {
    e.preventDefault();

    console.log(email, password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.messege));
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://www.beautyhunter.co.th/wp-content/uploads/2017/01/Amazon-logo-copy.png"
        />
      </Link>

      <div className="login_container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={signIn} className="login_signInButton">
            Sign In
          </button>

          <p>
            By signing-in you agree to the AMAZON FAKE Clone Conditions of Use &
            Sale, Please see our Privacy Notice , our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>

          <button onClick={register} className="login_registerButton">
            Create your Amazon Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
