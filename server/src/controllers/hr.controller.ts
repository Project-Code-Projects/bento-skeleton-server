import { Response } from "express";
import axios from "axios";
import config from "../config";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";

const chefEfficiency = async (req: JwtReqInterface, res: Response) => {
  try {
    if (req.id) {
      const efficiencyData = req.body;
      await axios.post(`${config.HR_BE_BASE_URL}/chef-efficiency/${req.restaurantId}`, efficiencyData);
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
    await axios.post(`${config.HR_BE_BASE_URL}/waiter-efficiency/${req.restaurantId}`, data)
    res.status(200).json({ message: "Data sent successfully to HR" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error while sending data to HR" });
  }
}

const hrController = { chefEfficiency, waiterEfficiency };

export default hrController;
