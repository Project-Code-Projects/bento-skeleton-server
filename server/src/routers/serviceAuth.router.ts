import { Router } from "express";
import { checkServiceAccess, login } from "../controllers/auth.controller";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { getTokenFromStore, redirectToService } from "../controllers/service.controller";
const serviceAuthRouter = Router();

// From Silo-backend to Skeleton
serviceAuthRouter.post("/verify", verifyJWTMiddleware, checkServiceAccess);

// From skeleton frontend to skeleton backend
serviceAuthRouter.get("/redirect/:service", verifyJWTMiddleware, redirectToService);

// From Silo-backend to Skeleton
serviceAuthRouter.get("/token/:code", getTokenFromStore);

export default serviceAuthRouter;
