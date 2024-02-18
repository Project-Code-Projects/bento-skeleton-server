import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { findRestaurants, getAllCuisineInfos, getRestaurantDetails, getRestaurantsNew } from "../controllers/marketplace.controller";

const marketplaceRouter = Router();


// The Super Route for Delivery and Pickup with query params (mode , cuisine, searchTerm)
// Restaurants based on cuisine, searchTerm and mode
// Restaurants based on Just mode (Pickup/Delivery)
// Restaurants based on mode and searchTerm
marketplaceRouter.get('/restaurants', verifyJWTMiddleware, findRestaurants)

marketplaceRouter.get('/restaurant-details/:restaurantId', verifyJWTMiddleware, getRestaurantDetails)

// Get all the cuisine's name and image
marketplaceRouter.get('/all-cuisines', verifyJWTMiddleware, getAllCuisineInfos)


// working here 
marketplaceRouter.get('/checking', getRestaurantsNew)

export default marketplaceRouter;
