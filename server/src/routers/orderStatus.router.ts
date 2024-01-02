import { RequestHandler, Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import sendOrderStatusFromKDS from "../controllers/orderStatus.controller";
const orderStatusRouter = Router();

orderStatusRouter.post("/", verifyJWTMiddleware, sendOrderStatusFromKDS as any);

export default orderStatusRouter;
