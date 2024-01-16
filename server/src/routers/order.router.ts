import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { getAllOrders } from "../controllers/order.controller";
const orderRouter = Router();

orderRouter.get('/all', verifyJWTMiddleware, getAllOrders);

export default orderRouter;