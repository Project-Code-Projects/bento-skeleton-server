import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { checkIfEmployeeCheckedIn, employeeCheckIn, employeeCheckOut, getActiveChefs, getActiveWaiters } from "../controllers/employee.controller";
const employeeRouter = Router();

employeeRouter.post('/check-in', verifyJWTMiddleware, employeeCheckIn);

employeeRouter.post('/check-out', verifyJWTMiddleware, employeeCheckOut);

employeeRouter.get('/is-checked-in', verifyJWTMiddleware, checkIfEmployeeCheckedIn)

employeeRouter.get('/position/chef/active', verifyJWTMiddleware, getActiveChefs);
employeeRouter.get('/position/waiter/active', verifyJWTMiddleware, getActiveWaiters);

export default employeeRouter;