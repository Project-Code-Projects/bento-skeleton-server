import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import menuController from "../controllers/menu.controller";
const menuRouter = Router();

// Get req to Get All The Menu Items of a restaurant
menuRouter.get('/one-restaurant-menu/:restaurantId', verifyJWTMiddleware, menuController.getOneRestaurantMenu)

// To get all categories from Menu Builder
menuRouter.get('/all-menu-categories/:restaurantId', verifyJWTMiddleware, menuController.getAllMenuCatagories)

// To get details of one menu item using itemId
menuRouter.get('/menu-item-details/:itemId', verifyJWTMiddleware, menuController.menuItemDetails)


export default menuRouter;