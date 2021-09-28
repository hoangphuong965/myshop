import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const getAllProductService = async () => {
  return await axios.get(`/api/v1/products`, config);
};

export const getDetailProductService = async (id) => {
  return await axios.get(`/api/v1/product/${id}`, config);
};

export const getAllAdminProductService = async () => {
  return await axios.get(`/api/v1/admin/products`, config);
};

export const createNewProductService = async (productData) => {
  return await axios.post("/api/v1/admin/product/new", productData, config);
};

export const deleteProductService = async (id) => {
  return await axios.delete(`/api/v1/admin/product/${id}`, config);
};

export const updateProductService = async (id, data) => {
  return await axios.put(`/api/v1/admin/product/${id}`, data, config);
};
