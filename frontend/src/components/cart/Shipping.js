import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import history from "../../history";
import { saveShippingInfo } from "../../store/_actions/cartActions";
import ProtectedRoute from "../ProtectedRoute";
import CheckoutStep from "./CheckoutStep";

const Shipping = ({ shippingInfo, saveShippingInfo }) => {
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
  const [country, setCountry] = useState(shippingInfo.country || "");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    saveShippingInfo({ address, city, postalCode, phoneNo, country });
    history.push("/confirm");
  };

  const render = () => {
    return (
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Address</Form.Label> <br />
          <Form.Control
            type='text'
            placeholder='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required={true}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>City</Form.Label> <br />
          <Form.Control
            type='text'
            placeholder='City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required={true}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>PostalCode</Form.Label> <br />
          <Form.Control
            type='text'
            placeholder='PostalCode'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required={true}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Phone</Form.Label> <br />
          <Form.Control
            type='text'
            placeholder='Phone'
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required={true}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <label>Country</label> <br />
          <Form.Control
            type='text'
            placeholder='Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required={true}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Confirm
        </Button>
      </Form>
    );
  };
  return (
    <div>
      <CheckoutStep step1 />
      {render()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shippingInfo: state.cart.shippingInfo,
  };
};
export default connect(mapStateToProps, { saveShippingInfo })(
  ProtectedRoute(Shipping)
);
