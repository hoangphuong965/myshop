import React from "react";
import { Link } from "react-router-dom";
const Product = ({ item }) => {
  return (
    <Link to={`/product/${item._id}/`}>
      <div className='product-tile-link-wrapper'>
        <div className='product-tile-image'>
          <img src={item.images[0].url} alt='' />
        </div>
        <div className='product-tile-details'>
          <b className='product-tile-title'>{item.name}</b>
          <br />
          <p className='product-tile-price'>${item.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
