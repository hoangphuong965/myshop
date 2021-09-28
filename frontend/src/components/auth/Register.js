import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import history from "../../history";
import { register } from "../../store/_actions/userActions";
import Message from "../layout/Message";

const Register = (props) => {
  const { register, errCode, errMessage, isAuthenticated } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (errCode === 1) {
      history.push("/register");
    }
    if (isAuthenticated) {
      history.push("/");
    }
  }, [errCode, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password, () => {
      window.location.replace("/");
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h3>Register</h3>
      {errCode === 1 && <Message>{errMessage}</Message>}
      <Form.Group className='mb-3'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='name'
          placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};
const mapStateToProps = (state) => {
  return {
    errCode: state.auth.errCode,
    errMessage: state.auth.errMessage,
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, { register })(Register);
