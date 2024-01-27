import { Request, Response } from "express";

import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { hrPostChefEfficiency, hrPostOrderReview, hrPostWaiterEfficiency } from "../utilities/hr.utility";

const chefEfficiency = async (req: JwtReqInterface, res: Response) => {
  try {
    if (req.user) {
      const efficiencyData = req.body;
      console.log('efficiency data coming from kDS to Go to HR 🤩🤩🤩🤩🤩🤩🤩', efficiencyData);
      await hrPostChefEfficiency(efficiencyData, req.user.token);
      res.status(200).json({ message: "Data sent successfully to HR" });
    }
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    res.status(500).json({ error: "Internal server error while sending data to HR" });
  }
};

const waiterEfficiency = async (req: JwtReqInterface, res: Response) => {
  try {
    const data = req.body;
    if (req.user) {
      const result = await hrPostWaiterEfficiency(data, req.user?.token)
      res.status(200).json({ message: "Data sent successfully to HR" });
    }
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    res.status(500).json({ error: "Internal server error while sending data to HR" });
  }
}

const reviewInfoForHR = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;
    const reviewData = req.body;
    const postToHrResult = await hrPostOrderReview(reviewData, restaurantId)
    res.status(201).send(postToHrResult);
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    res.status(500).json({ error: "Internal server error while sending data to HR" });
  }


}

const hrController = { chefEfficiency, waiterEfficiency, reviewInfoForHR, };

export default hrController;
