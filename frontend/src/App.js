import React, { useEffect, useState } from "react";
import { Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import history from "./history";
import "./App.css";
import "./bootstrap.min.css";
import { connect } from "react-redux";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import User from "./components/user/User";
import { fetchUser } from "./store/_actions/userActions";
import History from "./components/user/History";
import Account from "./components/user/Account";
import ForgotPassword from "./components/user/ForgotPassword";
import UpdatePassword from "./components/user/UpdatePassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import Payment from "./components/cart/Payment";
import axios from "axios";
import Dashboard from "./components/admin/Dashboard";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ConfirmOrders from "./components/cart/ConfirmOrders";
import OrderSuccess from "./components/cart/OrderSuccess";
import Products from "./components/admin/Products";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import UpdateOrders from "./components/admin/UpdateOrders";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";

const App = (props) => {
  const { fetchUser } = props;
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    fetchUser();
    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, [fetchUser]);
  return (
    <Router history={history}>
      <Header />
      <main className='py-3'>
        <Container style={{ marginTop: "5rem" }}>
          <Route path='/' exact component={Home} />
          <Route path='/product/:id/' exact component={ProductDetails} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/profile' exact component={User} />
          <Route path='/history' exact component={History} />
          <Route path='/account' exact component={Account} />
          <Route path='/forgot' exact component={ForgotPassword} />
          <Route
            path='/password/update/:token'
            exact
            component={UpdatePassword}
          />
          <Route path='/cart' exact component={Cart} />
          <Route path='/shipping' exact component={Shipping} />
          <Route path='/confirm' exact component={ConfirmOrders} />
          <Route path='/success' exact component={OrderSuccess} />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Route path='/payment' exact component={Payment} />
            </Elements>
          )}
          <Route path='/admin/dashboard' exact component={Dashboard} />
          <Route path='/admin/products' exact component={Products} />
          <Route path='/admin/product/new' exact component={NewProduct} />
          <Route
            path='/admin/update/product/:id'
            component={UpdateProduct}
            exact
          />
          <Route path='/admin/orders/all' exact component={OrdersList} />
          <Route
            path='/admin/update/orders/:id'
            exact
            component={UpdateOrders}
          />
          <Route path='/admin/users' exact component={UsersList} />
          <Route path='/admin/update/user/:id' exact component={UpdateUser} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};
const mapStateToProps = (state) => {
  // console.log(state);
  return {};
};
export default connect(mapStateToProps, { fetchUser })(App);
