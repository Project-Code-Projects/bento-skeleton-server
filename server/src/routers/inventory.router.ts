import { Router } from "express";
import inventoryController from "../controllers/inventory.controller";
const inventoryRouter = Router();

inventoryRouter.get("/ingredients", inventoryController.getIngredientsFromInventory);

export default inventoryRouter;
