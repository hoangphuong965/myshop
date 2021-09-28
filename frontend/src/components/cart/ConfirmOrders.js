import React, { Fragment, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { loadUser } from "../../store/_actions/userActions";
import ProtectedRoute from "../ProtectedRoute";
import CheckoutStep from "./CheckoutStep";

const ConfirmOrders = ({ user, cartItems, shippingInfo, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);
  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    window.location.replace("/payment");
  };
  const render = () => {
    return (
      <Fragment>
        <Row>
          <Col sm={8}>
            <h4>Shipping Info</h4>
            <b>Name</b>: <span>{user && user.name}</span>
            <br />
            <b>Phone</b>: <span>{shippingInfo.phoneNo}</span>
            <br />
            <b>Address</b>:{" "}
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
            <hr />
            {cartItems.map((item) => (
              <Fragment key={item.id}>
                <div className='my-1' key={item.product}>
                  <div className='row'>
                    <div className='col-4 col-lg-2'>
                      <img src={item.image} alt='' height='45' width='65' />
                    </div>
                    <div className='col-5 col-lg-6'>{item.name}</div>
                    <div className='col-4 col-lg-4 mt-4 mt-lg-0'>
                      <p>
                        {item.quantity} x ${item.price} ={" "}
                        <b>${(item.quantity * item.price).toFixed(2)}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <br />
              </Fragment>
            ))}
          </Col>
          <Col sm={4}>
            <div
              style={{
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                padding: "1rem 2rem",
              }}>
              <p>Summary:</p>
              <hr />
              Subtotal: <b>${itemsPrice.toFixed(2)}</b>
              <br />
              Shipping: <b>${shippingPrice}</b>
              <br />
              Tax: <b>${taxPrice}</b>
              <br />
              Total: <b>${totalPrice}</b>
              <br />
              <button
                onClick={processToPayment}
                className='btn btn-primary my-2 block'>
                Payment
              </button>
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  };
  return (
    <div>
      <CheckoutStep step1 step2 />
      {render()}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
    shippingInfo: state.cart.shippingInfo,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, { loadUser })(
  ProtectedRoute(ConfirmOrders)
);
