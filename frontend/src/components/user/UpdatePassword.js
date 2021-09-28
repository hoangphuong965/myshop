import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { updatePassword } from "../../store/_actions/userActions";
import Message from "../layout/Message";
import history from "../../history";

const UpdatePassword = ({
  match,
  updatePassword,
  message,
  isAuthenticated,
}) => {
  // UPDATE NEW PASSWORD AFTER RECEIVE MAIL (not login)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = match.params.token;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  });

  const handleOnsubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password does not match");
    } else {
      updatePassword(password, token, () => {
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      });
    }
  };

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
          <h5>New Password</h5>
          {message && <Message children={message} />}{" "}
          <form onSubmit={(e) => handleOnsubmit(e)}>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='New Password'
              required={true}
              minLength={6}
            />
            <br />
            <br />
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm New Password'
              required={true}
              minLength={6}
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
    message: state.updatePassword.message,
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, { updatePassword })(UpdatePassword);
