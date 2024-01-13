import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import processOrderController from "../controllers/processOrder.controller";
const processOrderRouter = Router();

// processOrderRouter.post("/", verifyJWTMiddleware, processOrderController.processOrder);
processOrderRouter.post("/new", processOrderController.sendOrderToKDS);
// processOrderRouter.post("/", processOrderController.processOrder);

export default processOrderRouter;
