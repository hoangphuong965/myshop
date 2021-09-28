import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={{}}>
      <Container>
        <hr />
        <Row>
          <Col className='text-center py-3'>Copyright &copy; My Shop 🛒</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
