import React, { Fragment, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../store/_actions/cartActions";
import { clearState } from "../../store/_actions/productActions";

const Cart = ({ cartItems, addItemToCart, removeItemFromCart, clearState }) => {
  const total = cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  const removeItem = (id) => {
    removeItemFromCart(id);
  };

  const increaseQty = (id, qty, stock) => {
    const newQty = qty + 1;
    if (newQty > stock) return;
    addItemToCart(id, newQty);
  };
  const decreaseQty = (id, qty) => {
    const newQty = qty - 1;
    if (newQty <= 0) return;
    addItemToCart(id, newQty);
  };

  useEffect(() => {
    clearState();
  }, [clearState]);

  const render = () => {
    return (
      <Fragment>
        {cartItems.length > 0 ? (
          <Row>
            <Col sm={8}>
              {cartItems.map((item) => {
                return (
                  <Fragment key={item.id}>
                    <Row>
                      <Fragment>
                        <Col sm>
                          <img
                            src={!item.image ? "" : item.image}
                            alt=''
                            style={{ width: "100px" }}
                          />
                        </Col>
                        <Col sm>
                          <Link to={`/product/${item.id}`}>
                            {item.name.split(" ").slice(0, 6).join(" ") + "..."}
                          </Link>
                        </Col>
                        <Col>
                          <div className='stockCounter'>
                            <span
                              onClick={() =>
                                decreaseQty(item.id, item.quantity)
                              }
                              className='btn btn-outline-secondary btn-sm'>
                              -
                            </span>
                            <input
                              type='number'
                              className='count'
                              value={item.quantity}
                              readOnly
                            />
                            <span
                              onClick={() =>
                                increaseQty(item.id, item.quantity, item.stock)
                              }
                              className='btn btn-outline-secondary btn-sm'>
                              +
                            </span>
                          </div>
                        </Col>
                        <Col sm>
                          ${item.price}
                          <small
                            style={{ cursor: "pointer" }}
                            onClick={() => removeItem(item.id)}>
                            <br />
                            <i>remove</i>
                          </small>
                        </Col>
                      </Fragment>
                    </Row>
                    <br />
                  </Fragment>
                );
              })}
            </Col>
            <Col sm={4}>
              <div
                style={{
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  padding: "1rem 2rem",
                }}>
                <p>Summary:</p>
                <hr />
                Subtotal: <b>{subtotal}</b>(Units)
                <br />
                Total: <b>${Number(total)}</b>
                <br />
                <a href='/shipping' className='btn btn-primary my-2 block'>
                  Check Out
                </a>
              </div>
            </Col>
          </Row>
        ) : (
          <h3 className='text-center'>
            Cart Empty <br />
          </h3>
        )}
      </Fragment>
    );
  };

  return <div>{render()}</div>;
};
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};
export default connect(mapStateToProps, {
  addItemToCart,
  removeItemFromCart,
  clearState,
})(Cart);
