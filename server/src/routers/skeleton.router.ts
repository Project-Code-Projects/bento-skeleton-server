import { Router } from "express";
import { getAllCountryController } from "../controllers/country.controller";
import { restaurantRegistration } from "../controllers/skeletonRestaurantRegister.controller";
import { updateRestaurantRating } from "../controllers/restaurants.controller";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";

const skeletonRouter = Router();

skeletonRouter.get("/get-all-countries", getAllCountryController); // Obsolete

skeletonRouter.post('/restaurant-register', verifyJWTMiddleware, restaurantRegistration)

skeletonRouter.put('/update-restaurant-rating/:restaurantId', verifyJWTMiddleware, updateRestaurantRating)

export default skeletonRouter;
