import { Response } from "express";
import { AuthRequestInterface } from "../middlewares/jwtVerify.middleware";

// 1. Send needed data to kitchen
// 2. Extract and send to reduce ingred data to inventory
const processPosOrder = async (req: AuthRequestInterface, res: Response) => {
  try {
    const fullMenu = req.body.menu;
  } catch (error) {
    res.json({ message: "Error Processing Order" });
    console.log(error);
  }
};

const processPosOrderController = {
  processPosOrder,
};

export default processPosOrderController;
