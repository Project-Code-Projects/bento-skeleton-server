import { Response } from "express";
import { AuthRequestInterface } from "../middlewares/jwtVerify.middleware";

const processPosOrder = (req: AuthRequestInterface, res: Response) => {};

const processPosOrderController = {
  processPosOrder,
};

export default processPosOrderController;
