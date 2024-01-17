import { Router } from "express";
import posController from "../controllers/pos.controller";
const posRouter = Router();

// Get req from Review to POS to get an Order Info using OrderId
posRouter.get('order-info/:orderId', posController.getOrderInfo)

export default posRouter;