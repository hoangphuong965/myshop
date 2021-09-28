import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Side from "./Side";
import {
  getSingleUserAdmin,
  updateUserAdmin,
} from "../../store/_actions/userActions";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

const UpdateUser = ({
  getSingleUserAdmin,
  match,
  user,
  history,
  updateUserAdmin,
}) => {
  const [role, setRole] = useState("");
  const id = match.params.id;

  const roles = ["admin", "user"];

  useEffect(() => {
    getSingleUserAdmin(id);
  }, [getSingleUserAdmin, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserAdmin(id, role, () => {
      alert("Role change successful");
      history.push("/admin/users");
    });
  };

  return (
    <Row>
      <Side />
      <Col xs={10}>
        <h2>Update User</h2>
        <hr />
        <div className='px-3'>
          <b>Name: </b> {user.name}
          <br />
          <b>Email: </b> {user.email}
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <b>Role: </b>
            <span>
              <select
                style={{ width: "100px", display: "inherit" }}
                required
                className='form-control'
                disabled={user.email === "admin@gmail.com" ? true : false}
                value={role}
                onChange={(e) => setRole(e.target.value)}>
                <option value=''>{user.role}</option>
                {roles.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </span>
            <br />
            <button
              disabled={user.email === "admin@gmail.com" ? true : false}
              className='btn btn-primary mt-2'>
              Confirm
            </button>
          </form>
        </div>
      </Col>
    </Row>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.usersAdmin.user,
  };
};
export default connect(mapStateToProps, {
  getSingleUserAdmin,
  updateUserAdmin,
})(ProtectedAdminRoute(UpdateUser));
