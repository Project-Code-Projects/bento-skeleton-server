import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import hrController from "../controllers/hr.controller";
const employeeEfficiency = Router();

employeeEfficiency.post("/chef-efficiency", verifyJWTMiddleware, hrController.chefEfficiency);
employeeEfficiency.post('/waiter-efficiency', verifyJWTMiddleware, hrController.waiterEfficiency)

export default employeeEfficiency;
