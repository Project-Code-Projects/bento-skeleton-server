import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { employeeCheckIn, employeeCheckOut, getActiveChefs, getActiveWaiters } from "../controllers/employee.controller";
const employeeRouter = Router();

employeeRouter.post('/check-in', verifyJWTMiddleware, employeeCheckIn);

employeeRouter.post('/check-out', verifyJWTMiddleware, employeeCheckOut);


employeeRouter.get('/position/chef/active', verifyJWTMiddleware, getActiveChefs);

// NOT NEEDED IN POS.NEEDS FIX IN HR SIDE
employeeRouter.get('/position/waiter/active', verifyJWTMiddleware, getActiveWaiters);

export default employeeRouter;