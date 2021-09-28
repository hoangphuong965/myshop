import React, { Fragment, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import Side from "./Side";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  allOrderAdmin,
  clearState,
  deleteOrderAdmin,
} from "../../store/_actions/orderActions";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

const OrdersList = ({
  allOrderAdmin,
  listOrder,
  clearState,
  deleteOrderAdmin,
  history,
}) => {
  useEffect(() => {
    allOrderAdmin();
    clearState();
  }, [allOrderAdmin, clearState]);

  const deleteProductHandler = (id) => {
    let confirmAction = window.confirm("Do you want delete this orders ?");
    if (confirmAction) {
      deleteOrderAdmin(id, () => {
        history.go(0);
      });
    } else {
      return;
    }
  };

  const renderOrdersList = () => {
    const data = {
      columns: [
        {
          label: "Order Id",
          field: "id",
        },
        {
          label: "Quantity",
          field: "quantity",
        },
        {
          label: "Amount",
          field: "amount",
        },
        {
          label: "Status",
          field: "status",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    listOrder
      .slice(0)
      .reverse()
      .map((item) => {
        return data.rows.push({
          id: item._id,
          quantity: listOrder.length,
          amount: item.totalPrice,
          status: item.orderStatus,
          actions: (
            <Fragment>
              <Link
                to={`/admin/update/orders/${item._id}`}
                className='btn btn-outline-primary py-1 px-2 mx-2'>
                <i className='fa fa-pencil'></i>
              </Link>
              <button
                className='btn btn-outline-danger py-1 px-2'
                onClick={() => deleteProductHandler(item._id)}>
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
        <h2>Orders List</h2>
        <hr />
        <MDBDataTable striped bordered data={renderOrdersList()} responsive />
      </Col>
    </Row>
  );
};
const mapStateToProps = (state) => {
  return {
    listOrder: state.order.allOrderAdmin,
  };
};
export default connect(mapStateToProps, {
  allOrderAdmin,
  clearState,
  deleteOrderAdmin,
})(ProtectedAdminRoute(OrdersList));
