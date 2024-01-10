import { Router } from "express";
import { getAllCountryController } from "../controllers/country.controller";

const skeletonRouter = Router();

skeletonRouter.get("/get-all-countries", getAllCountryController);

export default skeletonRouter;
