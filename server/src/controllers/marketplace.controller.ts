import { Response, json } from "express";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { allDeliveryRestaurants } from "../models/restaurantInfo/restaurantInfo.query";
import { testDummy } from "../utilities/marketplace.utility";

// Get All Delivery Enabled Restaurants
export async function getAllDeliveryRestaurant(req: JwtReqInterface, res: Response) {
    try {
        const data = await allDeliveryRestaurants();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: (error as Error).message });
    }
}



















// Apu Showed this to teach relation error handling
export async function testingError(req: JwtReqInterface, res: Response) {
    try {
        const { num } = req.body;
        const isEven = await testDummy(num);
        res.send(isEven);
    } catch (error) {
        console.log(error);
        // res.status(500).json({ message: (error as Error).message });
        res.status(500).json({ message: (error as Error).message })
    }
}