import { Router } from "express";
import { getAllCountryController } from "../controllers/country.controller";
import { restaurantRegistration } from "../controllers/skeletonRestaurantRegister.controller";
import { createBulkReps, createBulkRestaurants, updateRestaurantRating } from "../controllers/restaurants.controller";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";

const skeletonRouter = Router();

skeletonRouter.get("/get-all-countries", getAllCountryController); // Obsolete

skeletonRouter.post('/restaurant-register', restaurantRegistration)

skeletonRouter.put('/update-restaurant-rating/:restaurantId', verifyJWTMiddleware, updateRestaurantRating)

// Save restaurants in bulk in db
skeletonRouter.post('/restaurant-in-bulk', createBulkRestaurants)
skeletonRouter.post('/reps-in-bulk', createBulkReps)

export default skeletonRouter;
