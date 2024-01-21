import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { getAllCuisineInfos, getAllDeliveryRestaurant } from "../controllers/marketplace.controller";

const marketplaceRouter = Router();

// Get all the delivery-enabled restaurants
marketplaceRouter.get('/all-delivery-restaurant-list', verifyJWTMiddleware, getAllDeliveryRestaurant)

// Get all the pickup-enabled restaurants
marketplaceRouter.get('/all-pickup-restaurant-list', verifyJWTMiddleware, getAllDeliveryRestaurant)

// Get all the cuisine's name and image
marketplaceRouter.get('/all-cuisines', verifyJWTMiddleware, getAllCuisineInfos)


export default marketplaceRouter;
