import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { forgotPassword } from "../../store/_actions/userActions";
import history from "../../history";
import Message from "../layout/Message";

const ForgotPassword = ({ isAuthenticated, forgotPassword, message }) => {
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  const handleOnsubmit = (e) => {
    e.preventDefault();
    forgotPassword(email);
    setEmail("");
  };

  // FORGOT PASSWORD VS SEND MAIL (not login)
  return (
    <Container>
      <Row>
        <Col sm></Col>
        <Col
          sm
          style={{
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            padding: "2rem 2rem 2rem 2rem",
          }}>
          {message && <Message children={message} />}
          <h5>Forgot Password</h5>
          <form onSubmit={(e) => handleOnsubmit(e)}>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required={true}
            />
            <br />
            <br />
            <button
              variant='primary'
              type='submit'
              className='btn btn-primary btn-sm '>
              Submit
            </button>
          </form>
        </Col>
        <Col sm></Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    message: state.forgotPassword.message,
  };
};
export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
