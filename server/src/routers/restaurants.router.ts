import { Router } from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
import { allRestaurantsData } from "../controllers/restaurants.controller";
const restaurantsRouter = Router()

restaurantsRouter.get('/all-restaurants', verifyJWTMiddleware, allRestaurantsData)


export default restaurantsRouter;