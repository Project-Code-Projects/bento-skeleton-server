import { Response, Request } from "express";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { findRestaurantsUsingQuery, getMarketplaceDiscountQuery } from "../models/restaurantInfo/restaurantInfo.query";
import { getRestaurantDetailsFromDB } from "../utilities/marketplace.utility";
import { getAllCuisines } from "../models/cuisines/cuisines.query";

// GET Req from Marketplace to Skeleton to get marketplaceDiscountPercentage
export async function getMarketplaceDiscountPercentage(req: JwtReqInterface, res: Response) {
    try {
        const restaurantId = Number(req.params.restaurantId)
        const discount = await getMarketplaceDiscountQuery(restaurantId)
        res.status(200).send(discount)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message })
    }
}

// Get one restaurant's details using restaurantId . [restaurantName, img, delivery, pickup, address] 
export async function getRestaurantDetails(req: JwtReqInterface, res: Response) {
    try {
        const restaurantId = req.params.restaurantId;
        const restaurantDetails = await getRestaurantDetailsFromDB(restaurantId)
        res.status(200).send(restaurantDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message })
    }
}

// Get all the cuisine's name and image
export async function getAllCuisineInfos(req: JwtReqInterface, res: Response) {
    try {
        const cuisineData = await getAllCuisines();
        res.status(200).send(cuisineData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message })
    }
}

// The Super Route for Restaurant search with query params (mode , cuisine, searchTerm , limit, name )
export async function getRestaurantsNew(req: JwtReqInterface, res: Response) {
    try {
        const result = await findRestaurantsUsingQuery(req.query)
        res.send(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message })
    }
}

