// Please don't change the pre-written code
// Import the necessary modules here

import { createNewOrderRepo } from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";


export const createNewOrder = async (req, res, next) => {
  // Write your code here for placing a new order
  const loggedUser = req.user._id;
  try {
    const { shippingInfo, orderedItems, user, paymentInfo, paidAt, itemsPrice, taxPrice, shippingPrice, totalPrice, orderStatus, deliveredAt } = req.body;
    const newOrder = {
      shippingInfo,
      orderedItems,
      user: loggedUser,
      paymentInfo,
      paidAt: new Date(),
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus,
      deliveredAt
    }

    const order = await createNewOrderRepo(newOrder);
    res.status(201).json({ success: true, OrderData: order });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};
