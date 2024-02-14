import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { allRestaurantsData, getRestaurantsInRadius, oneRestaurantInfo } from "../controllers/restaurants.controller";
const restaurantsRouter = Router()

restaurantsRouter.get('/one-restaurant/:restaurantId', oneRestaurantInfo)
restaurantsRouter.get('/all-restaurants', verifyJWTMiddleware, allRestaurantsData);
restaurantsRouter.get('/search/location', getRestaurantsInRadius);


export default restaurantsRouter;