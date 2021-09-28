import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";
import MetaData from "./layout/MetaData";
import { connect } from "react-redux";
import { getAllProduct } from "../store/_actions/productActions";
import Product from "./product/Product";

const Home = (props) => {
  const { getAllProduct, products } = props;
  // const [product, setProduct] = useState([]);
  // const categories = ["java", "python", "javascript", "php", "c#", "c++"];

  // const handleFilter = (ctg) => {
  //   const arr = products.map((icon) => icon);
  //   const filter = arr.filter((item) => item.category === ctg);
  //   console.log(filter);
  // };

  useEffect(() => {
    getAllProduct();
  }, [getAllProduct]);

  const renderProduct = () => {
    return (
      <Fragment>
        {!products ? (
          <Container>
            <p>loading</p>
          </Container>
        ) : (
          products.length > 0 &&
          products
            .slice(0)
            .reverse()
            .map((item) => {
              return (
                <Col key={item._id}>
                  <Product item={item} />
                </Col>
              );
            })
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <MetaData title='Home' />
      <div className='text-center m-3 x-5'>
        <h3>Featured Icon</h3>
      </div>
      {/* <div className='text-center m-3 x-5'>
        {categories.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => handleFilter(item)}
              className='btn btn-outline-primary m-2'>
              {item}
            </button>
          );
        })}
      </div> */}
      <div className='product-tile-grid text-center'>
        <div className='product-tile square'>
          <Row xs={2} md={4} className='mt-1'>
            {renderProduct()}
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.data,
  };
};

export default connect(mapStateToProps, { getAllProduct })(Home);
