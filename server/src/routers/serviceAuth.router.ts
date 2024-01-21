import { Router } from "express";
import { checkServiceAccess, login } from "../controllers/auth.controller";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { generateJwtTokenForClientApps, getTokenFromStore, getUserInfoByToken, redirectToService } from "../controllers/service.controller";
const serviceAuthRouter = Router();

// From Silo-backend to Skeleton
serviceAuthRouter.post("/verify", verifyJWTMiddleware, checkServiceAccess);

// From skeleton frontend to skeleton backend
serviceAuthRouter.get("/redirect/:service", verifyJWTMiddleware, redirectToService);

// From Silo-backend to Skeleton
serviceAuthRouter.get("/token/:code", getTokenFromStore);

// Get user info using jwt token
serviceAuthRouter.get("/user-from-token", verifyJWTMiddleware, getUserInfoByToken);

// Get JWT for Marketplace [One Time Use]
serviceAuthRouter.get('/client-apps-token', generateJwtTokenForClientApps)

export default serviceAuthRouter;
