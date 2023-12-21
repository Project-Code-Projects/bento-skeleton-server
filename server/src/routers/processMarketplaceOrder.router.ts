import { Router } from "express";
import processMarketplaceOrderController from "../controllers/processMarketplaceOrder.controller";
const processMarketplaceOrderRouter = Router();

processMarketplaceOrderRouter.post("/", processMarketplaceOrderController.processMarketplaceOrder);

export default processMarketplaceOrderRouter;
