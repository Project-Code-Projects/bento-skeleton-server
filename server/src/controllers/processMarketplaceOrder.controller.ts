import { Response } from "express";
import { AuthRequestInterface } from "../middlewares/jwtVerify.middleware";

const processMarketplaceOrder = (req: AuthRequestInterface, res: Response) => {
  //...........
};

const processMarketplaceOrderController = {
  processMarketplaceOrder,
};

export default processMarketplaceOrderController;
