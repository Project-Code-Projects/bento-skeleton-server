import { Request, Response } from "express";
import { JwtVerifiedReqInterface } from "../interfaces/JwtVerifiedReqInterface";
import axios from "axios";
import config from "../config";

const chefEfficiency = async (req: JwtVerifiedReqInterface, res: Response) => {
  try {
    if (req.user) {
      const efficiencyData = req.body;
      await axios.post(`${config.HR_BE_BASE_URL}/chef-efficiency`, efficiencyData);
      res.status(200).json({ message: "Data sent successfully to HR" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error while sending data to HR" });
  }
};

const hrController = { chefEfficiency };

export default hrController;
