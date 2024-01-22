import { Response } from "express";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { restaurantsBasedOnMode, restaurantsConsideringModeCuisine, restaurantsConsideringModeCuisineSearchTerm, restaurantsConsideringModeSearchTerm } from "../models/restaurantInfo/restaurantInfo.query";
import { getRestaurantDetailsFromDB, testDummy } from "../utilities/marketplace.utility";
import { getAllCuisines } from "../models/cuisines/cuisines.query";

// Get one restaurant's details using restaurantId . [restaurantName, img, delivery, pickup, address] (need to add rating)
export async function getRestaurantDetails(req: JwtReqInterface, res: Response) {
    try {
        const restaurantId = req.params.restaurantId;
        const restaurantDetails = await getRestaurantDetailsFromDB(restaurantId)
        res.status(200).send(restaurantDetails);
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


// Get Restaurants List based on Mode, Cuisine, SearchTerm 
// [NEED TO FIX-- > Get Rating / Like info from Review of each found restaurant and attach it with the final result]
export async function findRestaurants(req: JwtReqInterface, res: Response) {
    try {


        const mode = (req.query.mode as string).toLowerCase()

        const cuisine = req.query.cuisine as string
        const searchTerm = req.query.searchTerm as string;

        if (mode && cuisine && searchTerm) {
            const data = await restaurantsConsideringModeCuisineSearchTerm(mode, cuisine, searchTerm)
            return res.status(200).send(data)
        }
        else if (mode && cuisine && !searchTerm) {
            const data = await restaurantsConsideringModeCuisine(mode, cuisine)
            return res.status(200).send(data)
        }
        else if (mode && searchTerm && !cuisine) {
            const data = await restaurantsConsideringModeSearchTerm(mode, searchTerm);
            return res.status(200).send(data)
        }
        else if (mode && !searchTerm && !cuisine) {
            const data = await restaurantsBasedOnMode(mode)
            return res.status(200).send(data);
        }


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