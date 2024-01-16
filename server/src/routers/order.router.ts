import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
const orderRouter = Router();

orderRouter.get('/all', verifyJWTMiddleware);

export default orderRouter;