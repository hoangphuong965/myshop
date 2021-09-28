const orderService = require("../services/orderService");

// Create a new order => api/v1/order/new
exports.newOrder = async (req, res) => {
  const order = await orderService.newOrderService(req);
  res.status(201).json({
    success: true,
    order,
  });
};

// get my order = api/v1/orders/me
exports.myOrder = async (req, res) => {
  const id = req.user.id;
  const orders = await orderService.myOrderService(id);
  res.status(200).json({
    orders,
  });
};

// ========================ADMIN=====================

// get all order (admin) => api/v1/admin/orders/all
exports.allOrder = async (req, res) => {
  let allOrder = await orderService.allOrderService();
  res.status(200).json({
    allOrder,
  });
};

// update proessing order (admin) => api/v1/admin/order/:id
exports.updateOrder = async (req, res) => {
  const id = req.params.id;
  const orderStatus = req.body.orderStatus;
  const updateOrder = await orderService.updateOrderService(id, orderStatus);
  res.status(201).json({
    updateOrder,
  });
};

// delete order = api/v1/admin/order/:id
exports.deleteOrder = async (req, res) => {
  const id = req.params.id;
  const deleteOrder = await orderService.deleteOrderService(id);
  res.status(200).json({
    deleteOrder,
  });
};

// get signle order = api/v1/admin/order/:id
exports.getAdminSingleOrders = async (req, res) => {
  const id = req.params.id;
  const order = await orderService.getSingleOrderService(id);
  res.status(200).json({
    order,
  });
};
