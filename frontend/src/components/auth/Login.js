import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../history";
import { login } from "../../store/_actions/userActions";
import Message from "../layout/Message";

const Login = (props) => {
  const { login, errCode, errMessage, isAuthenticated } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (errCode === 1) {
      history.push("/login");
    }
    if (isAuthenticated) {
      history.push("/");
    }
  }, [errCode, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, () => {
      history.push("/");
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Sign In</h3>
      {errCode === 1 && <Message children={errMessage} />}
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
      <div>
        <Link to='/forgot'>
          <i>Forgot Password </i>😏
        </Link>
      </div>
      <br />
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
export default connect(mapStateToProps, { login })(Login);
