import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { allRestaurantsData, getBulkRestaurantRating, getRestaurantsInRadius, oneRestaurantInfo } from "../controllers/restaurants.controller";
const restaurantsRouter = Router()

restaurantsRouter.get('/one-restaurant/:restaurantId', oneRestaurantInfo)
restaurantsRouter.get('/all-restaurants', verifyJWTMiddleware, allRestaurantsData);
restaurantsRouter.get('/search/location', getRestaurantsInRadius);
restaurantsRouter.post('/search/bulk/rating', getBulkRestaurantRating);


export default restaurantsRouter;