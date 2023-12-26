import { Router } from "express";
import processOrderController from "../controllers/processOrder.controller";
import verifyJWTMiddleware from "../middlewares/jwtVerify.middleware";
const processOrderRouter = Router();

processOrderRouter.post("/", verifyJWTMiddleware, processOrderController.processOrder);

export default processOrderRouter;
