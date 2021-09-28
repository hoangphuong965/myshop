import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Side from "./Side";
import { getAllAdminProduct } from "../../store/_actions/productActions";
import { allOrderAdmin } from "../../store/_actions/orderActions";
import { allUserAdmin } from "../../store/_actions/userActions";
import { Link } from "react-router-dom";
import ProtectedAdminRoute from "../admin/ProtectedAdminRoute";

const Dashboard = ({
  getAllAdminProduct,
  products,
  listOrder,
  allOrderAdmin,
  allUserAdmin,
  users,
}) => {
  useEffect(() => {
    getAllAdminProduct();
    allOrderAdmin();
    allUserAdmin();
  }, [allOrderAdmin, allUserAdmin, getAllAdminProduct]);

  let total = listOrder.reduce((acc, item) => item.totalPrice + acc, 0);

  let outOfStock = 0;
  products.forEach((item) => {
    if (item.stock === 0) {
      outOfStock += 1;
    }
  });

  return (
    <Row>
      <Side />
      <Col xs={10}>
        <h2>Dashboard</h2>
        <hr />
        <Row>
          <Col>
            <div className='text-center alert-info p-3'>
              <h3>Total Amount</h3>
              <b>${total}</b>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <div className='text-center alert-success'>
              <div className='p-3'>
                <h4>Products</h4>
                <b>{products.length}</b>
              </div>
              <button type='button' className=' btn alert-success block'>
                <Link to='/admin/products'> View Detail</Link>
              </button>
            </div>
          </Col>
          <Col>
            <div className='text-center alert-primary'>
              <div className='p-3'>
                <h4>Orders</h4>
                <b>{listOrder.length}</b>
              </div>
              <button type='button' className='btn alert-primary block'>
                <Link to='/admin/orders/all'> View Detail</Link>
              </button>
            </div>
          </Col>
          <Col>
            <div className='text-center alert-warning'>
              <div className='p-3'>
                <h4>Users</h4>
                <b>{users.length}</b>
              </div>
              <button type='button' className='btn alert-warning block'>
                <Link to='/admin/users'>View Detail</Link>
              </button>
            </div>
          </Col>
          <Col>
            <div className='text-center alert-info'>
              <div className='p-3'>
                <h4>Out of Stock</h4>
                <b>{outOfStock}</b>
              </div>
              <button type='button' className='btn alert-info block'>
                View Detail
              </button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.adminProduct.products,
    listOrder: state.order.allOrderAdmin,
    users: state.usersAdmin.users,
  };
};

export default connect(mapStateToProps, {
  getAllAdminProduct,
  allOrderAdmin,
  allUserAdmin,
})(ProtectedAdminRoute(Dashboard));
