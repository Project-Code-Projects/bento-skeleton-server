import { Router } from "express";
import inventoryController from "../controllers/inventory.controller";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
const inventoryRouter = Router();

inventoryRouter.get("/ingredients/:restaurantId", verifyJWTMiddleware, inventoryController.getIngredientsFromInventory);

inventoryRouter.get('/delivery-box/:restaurantId', verifyJWTMiddleware, inventoryController.getDeliveryBoxInfoFromInventory)

export default inventoryRouter;
