import React, { Fragment, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import Side from "./Side";
import { connect } from "react-redux";
import {
  getAllAdminProduct,
  deleteProduct,
} from "../../store/_actions/productActions";
import ProtectedAdminRoute from "../admin/ProtectedAdminRoute";
import { Link } from "react-router-dom";

const Products = ({ getAllAdminProduct, products, deleteProduct, history }) => {
  useEffect(() => {
    getAllAdminProduct();
  }, [getAllAdminProduct]);

  const deleteProductHandler = (id) => {
    let confirmAction = window.confirm("Do you want delete this product ?");
    if (confirmAction) {
      deleteProduct(id, () => {
        alert("Delete Product Success");
        history.go(0);
      });
    } else {
      return;
    }
  };

  const renderProducts = () => {
    const data = {
      columns: [
        {
          label: "Id",
          field: "id",
        },
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Price",
          field: "price",
        },
        {
          label: "Stock",
          field: "stock",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products
      .slice(0)
      .reverse()
      .map((item) => {
        return data.rows.push({
          id: item._id,
          name: item.name,
          price: item.price,
          stock: item.stock,
          actions: (
            <Fragment>
              <Link
                to={`/admin/update/product/${item._id}`}
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
        <h2>All Products</h2>
        <hr />
        <Link className='btn btn-primary small' to='/admin/product/new'>
          Create Product
        </Link>
        <br />
        <br />
        <MDBDataTable striped bordered data={renderProducts()} responsive />
      </Col>
    </Row>
  );
};
const mapStateToProps = (state) => {
  return {
    products: state.adminProduct.products,
  };
};
export default connect(mapStateToProps, { getAllAdminProduct, deleteProduct })(
  ProtectedAdminRoute(Products)
);
