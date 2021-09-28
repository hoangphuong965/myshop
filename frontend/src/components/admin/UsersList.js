import React, { Fragment, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import Side from "./Side";
import { connect } from "react-redux";
import {
  allUserAdmin,
  deleteUserAdmin,
  clearState,
} from "../../store/_actions/userActions";
import { Link } from "react-router-dom";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

const UsersList = ({
  allUserAdmin,
  users,
  deleteUserAdmin,
  history,
  clearState,
}) => {
  useEffect(() => {
    allUserAdmin();
    clearState();
  }, [allUserAdmin, clearState]);

  const deleteUserHandler = (id) => {
    let confirmAction = window.confirm("Do you want delete this user ?");
    if (confirmAction) {
      deleteUserAdmin(id, () => {
        history.go(0);
      });
    } else {
      return;
    }
  };

  const renderUserssList = () => {
    const data = {
      columns: [
        {
          label: "User Id",
          field: "id",
        },
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Role",
          field: "role",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    users
      .slice(0)
      .reverse()
      .map((item) => {
        return data.rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          actions: (
            <Fragment>
              <Link
                to={`/admin/update/user/${item._id}`}
                className='btn btn-outline-primary py-1 px-2 mx-2'>
                <i className='fa fa-pencil'></i>
              </Link>
              <button
                className='btn btn-outline-danger py-1 px-2'
                onClick={() => deleteUserHandler(item._id)}>
                <i className='fa fa-trash'></i>
              </button>
            </Fragment>
          ),
        });
      });

    return data;
  };

  return (
    <Row>
      <Side />
      <Col xs={10}>
        <h2>Users List</h2>
        <hr />
        <MDBDataTable striped bordered data={renderUserssList()} responsive />
      </Col>
    </Row>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.usersAdmin.users,
  };
};
export default connect(mapStateToProps, {
  allUserAdmin,
  deleteUserAdmin,
  clearState,
})(ProtectedAdminRoute(UsersList));
