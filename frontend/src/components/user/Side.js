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
      <Link to='/profile'>Profile</Link>
      <br />
      <Link to='/history'>Purchase history</Link>
      <br />
      <Link to='/account'>Account</Link>
    </Col>
  );
};

export default Side;
