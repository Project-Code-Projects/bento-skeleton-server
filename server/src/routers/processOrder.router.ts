import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import processOrderController from "../controllers/processOrder.controller";
const processOrderRouter = Router();

// processOrderRouter.post("/new", verifyJWTMiddleware, processOrderController.processOrder);
// processOrderRouter.post("/", processOrderController.processOrder);
processOrderRouter.post("/brand-new", verifyJWTMiddleware, processOrderController.newProcessOrder);


export default processOrderRouter;
