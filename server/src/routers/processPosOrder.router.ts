import { Router } from "express";
import processPosOrderController from "../controllers/processPOSOrder.controller";
const processPosOrderRouter = Router();

processPosOrderRouter.post("/", processPosOrderController.processPosOrder);

export default processPosOrderRouter;
