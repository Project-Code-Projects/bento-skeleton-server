import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { allRestaurantsData, getRestaurantsInRadius } from "../controllers/restaurants.controller";
const restaurantsRouter = Router()

restaurantsRouter.get('/all-restaurants', verifyJWTMiddleware, allRestaurantsData);
restaurantsRouter.get('/search/location', getRestaurantsInRadius);


export default restaurantsRouter;