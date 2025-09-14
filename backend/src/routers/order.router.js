import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status.js';
import { OrderStatus } from '../constants/order_status.js';
import { OrderModel } from '../models/order.model.js';
import auth, { isAdmin } from '../middlewares/auth.mid.js';

const router = Router();
router.use(auth);

router.post(
  '/create',
  asyncHandler(async (req, res) => {
    const requestOrder = req.body;

    if (!requestOrder.items || requestOrder.items.length <= 0) {
      res.status(HTTP_BAD_REQUEST).send('Cart Is Empty!');
      return;
    }

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

router.get(
  '/newOrderForCurrentUser',
  asyncHandler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else res.status(HTTP_BAD_REQUEST).send();
  })
);

router.post(
  '/pay',
  asyncHandler(async (req, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
      res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
      return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
  })
);

router.get(
  '/track/:id',
  asyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
  })
);

router.get(
  '/orders',
  isAdmin,
  asyncHandler(async (req, res) => {
    try {
      const orders = await OrderModel.find();
      res.send(orders);
    } catch (error) {
      res.status(HTTP_BAD_REQUEST).send('Error retrieving orders');
    }
  })
);

router.post(
  '/payOnDelivery',
  asyncHandler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
      res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
      return;
    }

    order.status = OrderStatus.PAYED_ON_DELIVERY;
    await order.save();

    res.send({ message: 'Payment on Delivery processed successfully', orderId: order._id });
  })
);

export default router;

// helper function
async function getNewOrderForCurrentUser(req) {
  return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}
