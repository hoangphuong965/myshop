import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row } from "react-bootstrap";
import { getDetailProduct } from "../../store/_actions/productActions";
import { addItemToCart } from "../../store/_actions/cartActions";
import history from "../../history";
import { useParams } from "react-router-dom";

const ProductDetails = (props) => {
  const { getDetailProduct, product, addItemToCart, role, fetchUser } = props;
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getDetailProduct(id);
    window.scrollTo(0, 0);
  }, [getDetailProduct, id]);

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber > product.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };
  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const addToCart = () => {
    addItemToCart(id, quantity);
    history.push("/cart");
  };

  const render = () => {
    if (!product) {
      return "";
    }
    return (
      <Row xs={1} md={2}>
        <div>
          <img
            className='w-50'
            src={!product.images ? "" : product.images[0].url}
            alt={product.name}
          />
        </div>
        {/* ============================== */}
        <div className='title'>
          <h3>{product.name}</h3>
          <p id='product_id'>Product # {product._id}</p>
          <hr />
          <p id='product_price'>${product.price}</p>
          <div className='stockCounter'>
            <span
              onClick={decreaseQty}
              className='btn btn-outline-secondary btn-sm'>
              -
            </span>
            <input type='number' className='count' value={quantity} readOnly />
            <span
              onClick={increaseQty}
              className='btn btn-outline-secondary btn-sm'>
              +
            </span>
            <button
              type='button'
              id='cart_btn'
              className='btn btn-primary d-inline'
              disabled={
                product.stock === 0 ||
                role === "admin" ||
                fetchUser.role === "admin"
              }
              style={{ marginLeft: "1rem" }}
              onClick={addToCart}>
              Add to Cart
            </button>
          </div>
          <hr />
          <p>
            Status:
            <span id='stock_status'>
              {product.stock > 0 ? "In Stock" : "Out Of Stock"}
            </span>
          </p>
          <hr />
          <h4 className='mt-2'>Description:</h4>
          <p>{product.description}</p>
          <hr />
          <p id='product_seller mb-3'>
            Sold by: <strong>{product.seller}</strong>
          </p>
        </div>
      </Row>
    );
  };

  return <Fragment>{render()}</Fragment>;
};
const mapStateToProps = (state) => {
  return {
    product: state.products.data,
    role: state.auth.role,
    fetchUser: state.auth.fetchUser,
  };
};
export default connect(mapStateToProps, { getDetailProduct, addItemToCart })(
  ProductDetails
);
