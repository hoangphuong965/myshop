import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return <Alert style={{ color: "#880000" }}>{children}</Alert>;
};

export default Message;
