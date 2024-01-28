import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import hrController from "../controllers/hr.controller";
const hrRouter = Router();

hrRouter.post("/chef-efficiency", verifyJWTMiddleware, hrController.chefEfficiency);
hrRouter.post('/waiter-efficiency', verifyJWTMiddleware, hrController.waiterEfficiency)
hrRouter.post('/review-info/:restaurantId', hrController.reviewInfoForHR)

export default hrRouter;

