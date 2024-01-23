import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { getAllOrders, incomingOrder, updateOrderChef, updateOrderStatus } from "../controllers/order.controller";
const orderRouter = Router();

orderRouter.get('/all', verifyJWTMiddleware, getAllOrders);
orderRouter.put('/chef/:orderId', verifyJWTMiddleware, updateOrderChef);

// update order status in POS / Marketplace. Status going from KDS
orderRouter.put('/status/:orderId', verifyJWTMiddleware, updateOrderStatus);

// Send New Order data from POS+Markeplace to KDS
orderRouter.post('/incoming', verifyJWTMiddleware, incomingOrder);



export default orderRouter;