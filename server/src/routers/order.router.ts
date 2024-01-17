import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { getAllOrders, incomingOrder, updateOrderChef, updateOrderStatus } from "../controllers/order.controller";
const orderRouter = Router();

orderRouter.get('/all', verifyJWTMiddleware, getAllOrders);
orderRouter.put('/status/:orderId', verifyJWTMiddleware, updateOrderStatus);
orderRouter.put('/chef/:orderId', verifyJWTMiddleware, updateOrderChef);
orderRouter.post('/incoming', verifyJWTMiddleware, incomingOrder);

export default orderRouter;