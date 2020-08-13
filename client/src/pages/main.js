import React, { useState, useMemo } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home"
import Login from "./login";
import Singup from "./singup";
import CartPage from "./CartPage";
import A from "./A";
import Profile from "./profile";
import App from "../App";
import { Cart } from "../Context/cart";
import { Loggin } from "../Context/loggin";

export default function Main() {
  const [value, setValue] = useState({});
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);
  
  const [auth, setAuth] = useState({});
  const providerAuth = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <Loggin.Provider value={providerAuth}>
    <Cart.Provider value={providerValue}>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/a/:id" exact component={A} />
        <Route path="/singup" exact component={Singup} />
        <Route path="/cart" exact component={CartPage} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/admin" exact component={App} />
      </Router>
    </Cart.Provider>
    </Loggin.Provider>
  );
}