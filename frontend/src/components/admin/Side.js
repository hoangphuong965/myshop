import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Side = () => {
  return (
    <Col
      xs={2}
      style={{
        borderRight: "1.5px solid #D2D4D5",
        height: "100vh",
      }}>
      <Link to='/admin/dashboard'>Dashboard</Link>
      <br />
      <br />
      <Link to='/admin/products'>Products</Link>
      <br />
      <br />
      <Link to='/admin/orders/all'>Orders</Link>
      <br />
      <br />
      <Link to='/admin/users'>Users</Link>
    </Col>
  );
};

export default Side;
