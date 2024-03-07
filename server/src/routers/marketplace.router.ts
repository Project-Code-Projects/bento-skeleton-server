import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { getAllCuisineInfos, getMarketplaceDiscountPercentage, getRestaurantDetails, getRestaurantsNew } from "../controllers/marketplace.controller";

const marketplaceRouter = Router();


// GET Req from Marketplace to Skeleton to get marketplaceDiscountPercentage
marketplaceRouter.get("/marketplace-discount-percentage/:restaurantId", verifyJWTMiddleware, getMarketplaceDiscountPercentage)

// The Super Route for Delivery and Pickup with query params (mode , cuisine, searchTerm)
marketplaceRouter.get('/restaurants', verifyJWTMiddleware, getRestaurantsNew)

marketplaceRouter.get('/restaurant-details/:restaurantId', verifyJWTMiddleware, getRestaurantDetails)

// Get all the cuisine's name and image
marketplaceRouter.get('/all-cuisines', verifyJWTMiddleware, getAllCuisineInfos)



export default marketplaceRouter;

// https://sak-skeleton-samiya-kazi.koyeb.app/marketplace/marketplace-discount-percentage/1