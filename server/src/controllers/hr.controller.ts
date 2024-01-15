import { Response } from "express";
import { JwtVerifiedReqInterface } from "../interfaces/JwtVerifiedReqInterface";
import { hrPostChefEfficiency } from "../utilities/hr.utility";

const chefEfficiency = async (req: JwtVerifiedReqInterface, res: Response) => {
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

const hrController = { chefEfficiency };

export default hrController;
