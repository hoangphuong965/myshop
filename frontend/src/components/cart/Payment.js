import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { createOrder } from "../../store/_actions/orderActions";
import ProtectedRoute from "../ProtectedRoute";
import CheckoutStep from "./CheckoutStep";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { loadUser } from "../../store/_actions/userActions";

const Payment = ({ loadUser, user, createOrder, cartItems, shippingInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.querySelector(".pay_btn").disabled = true;
    let res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      res = await axios.post("/api/v1/payment/process", paymentData, config);
      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert(result.error.message);
        document.querySelector(".pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          createOrder(order);
          localStorage.removeItem("cartItems");
          window.location.replace("/success");
        } else {
          alert("There is some issue while payment processing");
        }
      }
    } catch (error) {
      document.querySelector(".pay_btn").disabled = false;
      alert(error);
    }
  };

  const render = () => {
    return (
      <Container
        style={{
          width: "360px",
          padding: "2rem 2rem 2rem 2rem",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Card Number</Form.Label> <br />
            <CardNumberElement type='text' required={true} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Card Expiry</Form.Label> <br />
            <CardExpiryElement type='text' required={true} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Card CVC</Form.Label> <br />
            <CardCvcElement type='text' required={true} />
          </Form.Group>

          <Button type='submit' className='btn btn-primary my-2 block pay_btn'>
            Pay - ${orderInfo && orderInfo.totalPrice}
          </Button>
        </Form>
      </Container>
    );
  };
  return (
    <Fragment>
      <CheckoutStep step1 step2 step3 />
      {render()}
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    shippingInfo: state.cart.shippingInfo,
    cartItems: state.cart.cartItems,
  };
};
export default connect(mapStateToProps, { createOrder, loadUser })(
  ProtectedRoute(Payment)
);
