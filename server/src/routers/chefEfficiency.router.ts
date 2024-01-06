import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import hrController from "../controllers/hr.controller";
const chefEfficiency = Router();

chefEfficiency.post("/chef-efficiency", verifyJWTMiddleware, hrController.chefEfficiency);

export default chefEfficiency;
