import { Router } from "express";
import { getServices, login } from "../controllers/auth.controller";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/services", verifyJWTMiddleware, getServices);

export default authRouter;
