import { Router } from "express";
import inventoryController from "../controllers/inventory.controller";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
const inventoryRouter = Router();

// Get all Ingredients from Inventory of A Restaurant
inventoryRouter.get("/ingredients/:restaurantId", verifyJWTMiddleware, inventoryController.getIngredientsFromInventory);

// Get all Packaging/Delivery-box info from Inventory of a restaurant
inventoryRouter.get('/delivery-box/:restaurantId', verifyJWTMiddleware, inventoryController.getDeliveryBoxInfoFromInventory)

export default inventoryRouter;
