import React, { Fragment, useEffect } from "react";
import ProtectedRoute from "../ProtectedRoute";
import { loadUser } from "../../store/_actions/userActions";
import { connect } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import Side from "./Side";

const User = ({ loadUser, user }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  const render = () => {
    return (
      <Container>
        <Row>
          <Side />
          <Col xs={9}>
            <h5>My Profile</h5>
            <hr />
            <strong>Name</strong>:{" "}
            <span style={{ textTransform: "capitalize" }}>{user.name}</span>
            <br />
            <br />
            <strong>Email</strong>: <span>{user.email}</span>
            <br />
            <br />
            <strong>Joined On</strong>:{" "}
            <span>{String(user.createdAt).substring(0, 10)}</span>
          </Col>
        </Row>
      </Container>
    );
  };

  return <Fragment>{render()}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { loadUser })(ProtectedRoute(User));
