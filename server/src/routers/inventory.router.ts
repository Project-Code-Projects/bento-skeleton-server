import { Router } from "express";
import inventoryController from "../controllers/inventory.controller";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
const inventoryRouter = Router();

inventoryRouter.get("/ingredients", verifyJWTMiddleware, inventoryController.getIngredientsFromInventory);

export default inventoryRouter;
