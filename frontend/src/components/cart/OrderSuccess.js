import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

const OrderSuccess = () => {
  return (
    <Container className='text-center'>
      <h3>Thank you 😚</h3>
      <h4>Order Successfully</h4>
      <Link to='/'>Go Back Home</Link>
    </Container>
  );
};

export default ProtectedRoute(OrderSuccess);
