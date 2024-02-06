import { Response } from "express";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { setRestaurantUtilization } from "../models/restaurantUtilization/restaurantUtilization.query";
import { addUtilizationLog } from "../models/restaurantUtilizationLog/restaurantUtilizationLog.query";

export async function postRestaurantUtilization (req: JwtReqInterface, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized' });

    const { restaurantId } = user;
    const { utilization } = req.body;

    if (!restaurantId|| isNaN(utilization)) return res.status(400).send({ message: 'Invalid utilization data.'});

    const result = await setRestaurantUtilization(restaurantId, utilization);
    await addUtilizationLog(restaurantId, utilization);
    if (result) return res.send({ status: 'Success' });
    else return res.status(404).send({ message: 'Restaurant not found.'});
  } catch (error) {
    console.log('Error posting utilization ⚠️ 📉', error);
    res.status(500).json({ message: (error as Error).message });
  }
}