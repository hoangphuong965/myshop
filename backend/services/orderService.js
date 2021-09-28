const Order = require("../models/order");
const Product = require("../models/product");

exports.newOrderService = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
      } = req.body;
      const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
      });
      resolve({
        order,
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.getSingleOrderService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const singleOrder = await Order.findById(id).populate(
        "user",
        "name email"
      );
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Not found order",
        });
      } else {
        resolve({
          singleOrder,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.myOrderService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const myOrder = await Order.find({ user: id });
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Not found order",
        });
      } else {
        resolve({
          myOrder,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.allOrderService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let orders = await Order.find().populate("user", "name email");
      let totalAmount = 0;
      orders.forEach((order) => {
        totalAmount += order.totalPrice;
      });
      resolve({
        totalAmount,
        orders,
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateOrderService = (id, orderStatus) => {
  return new Promise(async (resolve, reject) => {
    try {
      let updateOrder = await Order.findById(id);
      if (updateOrder.orderStatus === "delivered") {
        resolve({
          message: "You have already delivered this order",
        });
      } else if (updateOrder.orderStatus === "shipping") {
        updateOrder.orderStatus = orderStatus;
        await updateOrder.save();
        resolve({
          message: "Sucessfully",
        });
      } else {
        updateOrder.orderItems.forEach(async (item) => {
          await updateStock(item.productId, item.quantity);
        });
        updateOrder.orderStatus = orderStatus;
        updateOrder.deliveredAt = Date.now();
        await updateOrder.save();
        resolve({
          message: "Sucessfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.deleteOrderService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Order.findByIdAndDelete(id);
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Not found order",
        });
      } else {
        resolve({
          message: "Delete Successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateStock = async (productId, quantity) => {
  let product = await Product.findById(productId);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
};
