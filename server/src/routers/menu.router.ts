import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import menuController from "../controllers/menu.controller";
const menuRouter = Router();

// Get req from POS
menuRouter.get('one-restaurant-menu', verifyJWTMiddleware, menuController.getOneRestaurantMenu)

export default menuRouter;