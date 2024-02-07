import { Response } from "express";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { findAllRestaurantCurrentUtilization, findAllRestaurantUtilizationsInRadius, findSingleRestaurantUtilization, setRestaurantUtilization } from "../models/restaurantUtilization/restaurantUtilization.query";
import { addUtilizationLog } from "../models/restaurantUtilizationLog/restaurantUtilizationLog.query";
import { validateCoordinates, validateRadius } from "../utilities/location.utility";

export async function postRestaurantUtilization (req: JwtReqInterface, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized' });

    const { restaurantId } = user;
    const { utilization } = req.body;

    if (!restaurantId|| isNaN(utilization)) return res.status(400).send({ message: 'Invalid utilization data.'});

    const result = await setRestaurantUtilization(restaurantId, utilization);
    if (result) {
      await addUtilizationLog(restaurantId, utilization);
      return res.send({ status: 'Success' })
    } else return res.status(404).send({ message: 'Restaurant not found.'});
  } catch (error) {
    console.log('Error posting utilization ⚠️ 📉', error);
    res.status(500).json({ message: (error as Error).message });
  }
}


export async function getAllCurrentUtilization (req: JwtReqInterface, res: Response) {
  try {
    // const { user } = req;
    // if (!user) return res.status(401).send({ message: 'Unauthorized' });

    const utilizations = await findAllRestaurantCurrentUtilization();
    res.send({ data: utilizations });
  } catch (error) {
    console.log('Error getting utilization ⚠️ 📉', error);
    res.status(500).json({ message: (error as Error).message });
  }
}


export async function getCurrentUtilizationByRestaurantId (req: JwtReqInterface, res: Response) {
  try {
    // const { user } = req;
    // if (!user) return res.status(401).send({ message: 'Unauthorized' });

    const { id } = req.params;
    const restaurantId = Number(id);
    const utilization = await findSingleRestaurantUtilization(restaurantId);
    if (utilization) res.send(utilization);
    else res.status(404).send({ message: 'Restaurant utilization not found.'});
  } catch (error) {
    console.log('Error getting utilization ⚠️ 📉', error);
    res.status(500).json({ message: (error as Error).message });
  }
}

export const getCurrentRestaurantUtilizationsInRadius = async (req: JwtReqInterface, res: Response) => {
  try {
      // if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

      const { lat, lng } = req.query;
      const validatedCoordinates = validateCoordinates({ lat, lng });

      // If valid coordinates are not given, default coordinates will be used. Might change later.
      const coordinates = validatedCoordinates ? validatedCoordinates : { longitude: -0.190696, latitude: 51.501930 };

      // If radius is given in query, use it, otherwise use 5KM as default
      const validatedRadius = validateRadius(req.query.radius);
      const radius = validatedRadius ? validatedRadius : 5000;

      console.log('Coordinates:', coordinates);
      console.log('Radius:', radius);

      const utilizations = await findAllRestaurantUtilizationsInRadius(coordinates, radius);
      res.send({ data: utilizations });
  } catch (error) {
      console.log('😭😭😭😭😭😭😭😭😭😭', error);
      res.status(500).json({ error: 'Internal Server Error', message: (error as Error).message });
  }
}