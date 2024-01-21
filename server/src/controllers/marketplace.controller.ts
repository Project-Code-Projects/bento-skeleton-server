import { Response } from "express";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { allDeliveryRestaurants, allPickupRestaurants, restaurantsConsideringModeCuisineSearchTerm } from "../models/restaurantInfo/restaurantInfo.query";
import { testDummy } from "../utilities/marketplace.utility";
import { getAllCuisines } from "../models/cuisines/cuisines.query";

// Get All Delivery Enabled Restaurants
export async function getAllDeliveryRestaurant(req: JwtReqInterface, res: Response) {
    try {
        const data = await allDeliveryRestaurants();
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: (error as Error).message });
    }
};

// Get All Pickup Enabled Restaurants
export async function getAllPickupRestaurant(req: JwtReqInterface, res: Response) {
    try {
        const data = await allPickupRestaurants();
        res.send(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: (error as Error).message })
    }
}

// Get all the cuisine's name and image
export async function getAllCuisineInfos(req: JwtReqInterface, res: Response) {
    try {
        const cuisineData = await getAllCuisines();
        res.status(200).send(cuisineData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: (error as Error).message })
    }
}


export async function findRestaurants(req: JwtReqInterface, res: Response) {
    try {


        const mode = (req.query.mode as string).toLowerCase()

        const cuisine = req.query.cuisine as string
        const searchTerm = req.query.searchTerm as string;

        if (mode && cuisine && searchTerm) {
            const data = await restaurantsConsideringModeCuisineSearchTerm(mode, cuisine, searchTerm)
            return res.status(200).send(data)
        }
        else if (mode && cuisine && !searchTerm) { }
        else if (!cuisine && searchTerm) { }


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: (error as Error).message })

    }




}







/* if (mode === 'delivery') {
    if (cuisine && searchTerm) {

    } else if (cuisine && !searchTerm) { }
    else if (!cuisine && searchTerm) { }
}
else if (mode === 'pickup') {
    if (cuisine && searchTerm) {

    } else if (cuisine && !searchTerm) {

    } else if (!cuisine && searchTerm) {

    }
} */















// --------------------------------------------------------------------------------------------------------------
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