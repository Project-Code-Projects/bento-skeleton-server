import { Router } from "express";
import { getAllCountryController } from "../controllers/country.controller";
import { restaurantRegistration } from "../controllers/skeletonRestaurantRegister.controller";

const skeletonRouter = Router();

skeletonRouter.get("/get-all-countries", getAllCountryController); // Obsolete

skeletonRouter.post('/restaurant-register', restaurantRegistration)

export default skeletonRouter;
