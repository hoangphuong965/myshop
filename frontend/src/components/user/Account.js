import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Side from "./Side";
import { loadUser, changePassword } from "../../store/_actions/userActions";
import { connect } from "react-redux";
import Message from "../layout/Message";
import ProtectedRoute from "../ProtectedRoute";
import history from "../../history";

const Account = ({ loadUser, changePassword, user, password }) => {
  const { errCode, message } = password;
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  useEffect(() => {
    loadUser();
    if (errCode === 0) {
      alert("Changed password");
      history.push("/profile");
    }
  }, [errCode, loadUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!oldPass || !newPass) {
      alert("You must fill it out completely");
    } else {
      changePassword(oldPass, newPass);
    }
  };

  // CHANGE PASSWORD
  return (
    <Container>
      <Row>
        <Side />
        <Col xs={9}>
          <h5>Account</h5>
          <h6>Edit your account settings and change your password here.</h6>
          <hr />
          Your email address is <b>{user.email}</b>
          <br />
          <br />
          {message && <Message children={message} />}
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type='text'
              name='old'
              value={oldPass}
              placeholder='Old Password'
              onChange={(e) => setOldPass(e.target.value)}
              minLength={6}
            />
            <br />
            <br />
            <input
              type='text'
              name='new'
              value={newPass}
              placeholder='New Password'
              onChange={(e) => setNewPass(e.target.value)}
              minLength={6}
            />
            <br />
            <br />
            <button className='btn btn-primary btn-sm'>Change Password</button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    password: state.changePassword,
  };
};
export default connect(mapStateToProps, { loadUser, changePassword })(
  ProtectedRoute(Account)
);
