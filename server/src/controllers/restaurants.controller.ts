import { Response } from "express";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { getAllRestaurantInfo, updateRestaurantRatingUsingId } from "../models/restaurantInfo/restaurantInfo.query";

export async function allRestaurantsData(req: JwtReqInterface, res: Response) {
    try {
        const data = await getAllRestaurantInfo();
        res.status(200).send(data)

    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        res.status(500).json({ message: (error as Error).message })
    }
}


export async function updateRestaurantRating(req: JwtReqInterface, res: Response) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' })

        const restaurantId = Number(req.params.restaurantId)
        const newRating = Number(req.body.rating)

        const updatedRestaurantInfo = updateRestaurantRatingUsingId(restaurantId, newRating)
        res.status(201).json({ message: 'Rating Updated Successfully', data: updatedRestaurantInfo })

    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        res.status(500).json({ message: (error as Error).message })
    }
}