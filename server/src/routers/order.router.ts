import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { getAllOrders, updateOrderStatus } from "../controllers/order.controller";
const orderRouter = Router();

orderRouter.get('/all', verifyJWTMiddleware, getAllOrders);
orderRouter.put('/status', verifyJWTMiddleware, updateOrderStatus);

export default orderRouter;