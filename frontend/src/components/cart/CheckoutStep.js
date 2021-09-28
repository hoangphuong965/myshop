import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckoutStep = ({ step1, step2, step3 }) => {
  return (
    <Nav className='justify-content-center'>
      <Nav.Item className='mx-4'>
        {step1 ? (
          <Link to='/shipping'>
            <p>Shipping</p>
          </Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className='mx-4'>
        {step2 ? (
          <Link to='/confirm'>
            <p>Confirm Order </p>
          </Link>
        ) : (
          <p disabled>Confirm Order</p>
        )}
      </Nav.Item>

      <Nav.Item className='mx-4'>
        {step3 ? (
          <Link to='/payment'>
            <p>Payment </p>
          </Link>
        ) : (
          <p disabled>Payment</p>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutStep;
