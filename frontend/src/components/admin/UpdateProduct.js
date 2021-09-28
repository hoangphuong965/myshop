import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Side from "./Side";
import {
  getDetailProduct,
  updateProduct,
} from "../../store/_actions/productActions";
import { connect } from "react-redux";
import ProtectedAdminRoute from "../admin/ProtectedAdminRoute";

const UpdateProduct = ({
  history,
  getDetailProduct,
  product,
  match,
  updateProduct,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["java", "python", "javascript", "php", "c#", "c++"];

  const id = match.params.id;

  useEffect(() => {
    if (product && product._id !== id) {
      getDetailProduct(id);
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setSeller(product.seller);
      setStock(product.stock);
      setOldImages(product.images);
    }
  }, [getDetailProduct, id, product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length > 0) {
      updateProduct(
        id,
        {
          name,
          price,
          description,
          category,
          stock,
          seller,
          images,
        },
        () => {
          alert("Update Product Success");
          window.location.replace("/admin/products");
        }
      );
    } else {
      updateProduct(
        id,
        {
          name,
          price,
          description,
          category,
          stock,
          seller,
        },
        () => {
          alert("Update Product Success");
          window.location.replace("/admin/products");
        }
      );
    }
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArr) => [...oldArr, reader.result]);
          setImages((oldArr) => [...oldArr, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Row>
      <Side />
      <Col xs={10}>
        <h2>Update Product</h2>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              value={price || ""}
              onChange={(e) => setPrice(e.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group>
            <div className='form-group mb-3'>
              <Form.Label>Select category</Form.Label>
              <select
                required
                className='form-control'
                value={category || ""}
                onChange={(e) => setCategory(e.target.value)}>
                <option value=''>None</option>
                {categories.map((category) => (
                  <option key={category} value={category || ""}>
                    {category.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type='number'
              value={stock || ""}
              onChange={(e) => setStock(e.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Seller Name</Form.Label>
            <Form.Control
              type='text'
              value={seller || ""}
              onChange={(e) => setSeller(e.target.value)}
              required={true}
            />
          </Form.Group>
          {oldImages &&
            oldImages.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.url}
                className='mt-3 mr-2'
                width='55'
                height='52'
              />
            ))}
          <br />
          {imagesPreview.map((img, index) => (
            <img
              src={img}
              key={index}
              alt='Images Preview'
              className='mt-3 mr-2'
              width='55'
              height='52'
            />
          ))}
          <Form.Group className='mb-3'>
            <Form.Label>Images</Form.Label>
            <br />
            <Form.Control
              type='file'
              onChange={onChange}
              multiple
              // required={true}
            />
          </Form.Group>
          <Button type='submit'>UPDATE</Button>
        </Form>
      </Col>
    </Row>
  );
};
const mapStateToProps = (state) => {
  return {
    product: state.products.data,
  };
};
export default connect(mapStateToProps, { getDetailProduct, updateProduct })(
  ProtectedAdminRoute(UpdateProduct)
);
