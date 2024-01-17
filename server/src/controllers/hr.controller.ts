import { Response } from "express";

import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { hrPostChefEfficiency } from "../utilities/hr.utility";

const chefEfficiency = async (req: JwtReqInterface, res: Response) => {
  try {
    if (req.user) {
      const efficiencyData = req.body;
      await hrPostChefEfficiency(efficiencyData, req.user.token);
      res.status(200).json({ message: "Data sent successfully to HR" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error while sending data to HR" });
  }
};

const waiterEfficiency = async (req: JwtReqInterface, res: Response) => {
  try {
    const data = req.body;
    // this will be happening in utility file
    // await axios.post(`${config.HR_BE_BASE_URL}/waiter-efficiency/${req.restaurantId}`, data)
    res.status(200).json({ message: "Data sent successfully to HR" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error while sending data to HR" });
  }
}

const hrController = { chefEfficiency, waiterEfficiency };

export default hrController;
