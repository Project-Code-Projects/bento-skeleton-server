import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { getAllCuisineInfos, getMarketplaceDiscountPercentage, getRestaurantDetails, getRestaurantsNew } from "../controllers/marketplace.controller";
const marketplaceRouter = Router();


marketplaceRouter.get("/marketplace-discount-percentage/:restaurantId", verifyJWTMiddleware, getMarketplaceDiscountPercentage)

marketplaceRouter.get('/restaurants', verifyJWTMiddleware, getRestaurantsNew)

marketplaceRouter.get('/restaurant-details/:restaurantId', verifyJWTMiddleware, getRestaurantDetails)

marketplaceRouter.get('/all-cuisines', verifyJWTMiddleware, getAllCuisineInfos)

export default marketplaceRouter;
