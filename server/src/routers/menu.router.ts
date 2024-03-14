import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import menuController from "../controllers/menu.controller";
const menuRouter = Router();

menuRouter.get('/one-restaurant-menu/:restaurantId', verifyJWTMiddleware, menuController.getOneRestaurantMenu)

menuRouter.get('/all-menu-categories/:restaurantId', verifyJWTMiddleware, menuController.getAllMenuCatagories)

menuRouter.get('/menu-item-details/:itemId', verifyJWTMiddleware, menuController.menuItemDetails)


export default menuRouter;