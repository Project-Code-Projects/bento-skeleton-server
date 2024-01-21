import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { getAllDeliveryRestaurant } from "../controllers/marketplace.controller";

const marketplaceRouter = Router();

// Get all the delivery-enabled restaurants
marketplaceRouter.get('/all-delivery-restaurant-list', verifyJWTMiddleware, getAllDeliveryRestaurant)

export default marketplaceRouter;
