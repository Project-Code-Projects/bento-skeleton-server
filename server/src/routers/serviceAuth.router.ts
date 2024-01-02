import { Router } from "express";
import { checkServiceAccess, login } from "../controllers/auth.controller";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
const serviceAuthRouter = Router();

serviceAuthRouter.post("/login", login);
serviceAuthRouter.post("/verify", verifyJWTMiddleware, checkServiceAccess);

export default serviceAuthRouter;
