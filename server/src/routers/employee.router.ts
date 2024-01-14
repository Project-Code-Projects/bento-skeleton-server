import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { employeeCheckIn, employeeCheckOut } from "../controllers/employee.controller";
const employeeRouter = Router();

employeeRouter.post('/check-in', verifyJWTMiddleware, employeeCheckIn);
employeeRouter.post('/check-out', verifyJWTMiddleware, employeeCheckOut);

export default employeeRouter;