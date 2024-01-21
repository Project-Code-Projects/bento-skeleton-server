import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { findRestaurants, getAllCuisineInfos, getAllDeliveryRestaurant } from "../controllers/marketplace.controller";

const marketplaceRouter = Router();

// Get all the delivery-enabled restaurants
marketplaceRouter.get('/all-delivery-restaurant-list', verifyJWTMiddleware, getAllDeliveryRestaurant)

// All delivery restaurants list for specific Cuisine
// marketplaceRouter.get('/')



// The Super Route for Delivery and Pickup with query params (mode , cuisine, searchTerm)
marketplaceRouter.get('/restaurants', verifyJWTMiddleware, findRestaurants)


// Get all the pickup-enabled restaurants
marketplaceRouter.get('/all-pickup-restaurant-list', verifyJWTMiddleware, getAllDeliveryRestaurant)

// Get all the cuisine's name and image
marketplaceRouter.get('/all-cuisines', verifyJWTMiddleware, getAllCuisineInfos)



export default marketplaceRouter;
