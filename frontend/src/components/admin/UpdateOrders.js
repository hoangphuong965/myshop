import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Side from "./Side";
import {
  updateOrderAdmin,
  getSingleOrderAdmin,
} from "../../store/_actions/orderActions";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

const UpdateOrders = ({
  getSingleOrderAdmin,
  match,
  info,
  updateOrderAdmin,
  history,
}) => {
  const [orderStatus, setOrderStatus] = useState("");
  const stts = ["shipping", "delivered"];
  const id = match.params.id;

  useEffect(() => {
    getSingleOrderAdmin(id);
  }, [getSingleOrderAdmin, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id, orderStatus);
    updateOrderAdmin(id, orderStatus, () => {
      alert("Update Orders Success");
      history.push("/admin/orders/all");
    });
  };
  return (
    <Row>
      <Side />
      <Col xs={8}>
        <h2>Orders # {info._id}</h2>
        <hr />
        <h5>Shiping Info:</h5>
        <div className='px-3'>
          <b>Name: </b> {info.user && info.user.name}
          <br />
          <b>Phone: </b> {info.shippingInfo && info.shippingInfo.phoneNo}
          <br />
          <b>Adress: </b> {info.shippingInfo && info.shippingInfo.address},
          {info.shippingInfo && info.shippingInfo.country}
          <br />
          <b>ZipCode: </b>
          {info.shippingInfo && info.shippingInfo.postalCode}
        </div>
        <br />
        <h5>Payment:</h5>
        <div className='px-3'>
          <b>Status: </b>{" "}
          {info.paymentInfo && info.paymentInfo.status !== "succeeded"
            ? "unpaid"
            : "paid"}
          <br />
        </div>
        <div className='px-3'>
          <b>Orders Status: </b> {info.orderStatus}
        </div>
        <hr />
        <h5>List of products: </h5>
        <div className='px-3'>
          <Row>
            <table className='table table-hover '>
              <thead>
                <tr className='table-info'>
                  <th scope='col'>img</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {info.orderItems &&
                  info.orderItems.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>
                          <img
                            src={item.image}
                            alt=''
                            style={{ width: "50px" }}
                          />
                        </td>
                        <td className='mx-4'>{item.name}</td>
                        <td className='mx-4'>{item.quantity} icon</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </Row>
        </div>
      </Col>
      <Col xs={2}>
        <Form onSubmit={handleSubmit}>
          <h4>Select Status</h4>
          <div className='form-group mb-3'>
            <select
              required
              className='form-control'
              value={orderStatus}
              disabled={info.orderStatus === "delivered" ? true : false}
              onChange={(e) => setOrderStatus(e.target.value)}>
              <option value=''>{info.orderStatus}</option>
              {stts.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <button
              type='submit'
              disabled={info.orderStatus === "delivered" ? true : false}
              className='btn btn-primary block mt-3'>
              Update Status
            </button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
const mapStateToProps = (state) => {
  return {
    info: state.order.singleOrders,
  };
};
export default connect(mapStateToProps, {
  getSingleOrderAdmin,
  updateOrderAdmin,
})(ProtectedAdminRoute(UpdateOrders));
