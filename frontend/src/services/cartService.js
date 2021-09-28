import axios from "axios";

const config = {
  header: {
    "Content-Type": "application/json",
  },
};

export const addItemService = (id) => {
  return axios.get(`/api/v1/product/${id}`, config);
};
