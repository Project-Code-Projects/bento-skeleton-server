import { Response } from "express";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { getAllRestaurantInfo } from "../models/restaurantInfo/restaurantInfo.query";

export async function allRestaurantsData(req: JwtReqInterface, res: Response) {
    try {
        const data = await getAllRestaurantInfo();
        res.status(200).send(data)

    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        res.status(500).json({ message: (error as Error).message })
    }
}