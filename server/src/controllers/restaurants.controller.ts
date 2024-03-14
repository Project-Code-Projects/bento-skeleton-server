import { Request, Response } from "express";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { findBulkRestaurantInfo, findRestaurantsInRadius, getAllRestaurantInfo, getOneRestaurantInfoUsingId, postRestaurantInfo, updateRestaurantInfo, updateRestaurantRatingUsingId } from "../models/restaurantInfo/restaurantInfo.query";
import RestaurantInfoModel from "../models/restaurantInfo/restaurantInfo.model";
import RestaurantRepModel from "../models/restaurantRepInfo/restaurantRepInfo.model";
import { validateCoordinates, validateRadius } from "../utilities/location.utility";
import { validateBulkIds } from "../utilities/validator.utility";


// Update One Restaurant
export async function updateOneRestaurantController(req: JwtReqInterface, res: Response) {
    try {
        const restaurantId = Number(req.params.restaurantId)
        const dataToUpdate = req.body
        const result = await updateRestaurantInfo(restaurantId, dataToUpdate)
        res.status(200).send(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message })
    }
}


// GET one restaurant's full info's using its restaurantId 
export async function oneRestaurantInfo(req: Request, res: Response) {
    try {
        const restaurantId = Number(req.params.restaurantId)
        const restaurantInfo = await getOneRestaurantInfoUsingId(restaurantId)
        res.status(200).send(restaurantInfo)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message })
    }
}


export async function allRestaurantsData(req: JwtReqInterface, res: Response) {
    try {
        const limit = Number(req.query.limit)
        const data = await getAllRestaurantInfo(limit);
        res.status(200).send(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message })
    }
}

export async function updateRestaurantRating(req: JwtReqInterface, res: Response) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
        const restaurantId = Number(req.params.restaurantId)
        const newRating = Number(req.body.rating)
        const updatedRestaurantInfo = await updateRestaurantRatingUsingId(restaurantId, newRating)
        res.status(201).json({ message: 'Rating Updated Successfully', data: updatedRestaurantInfo })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message })
    }
}

export const createBulkRestaurants = async (req: Request, res: Response) => {
    try {
        const savedBulkRestoInfo = await RestaurantInfoModel.create(req.body)
        if (savedBulkRestoInfo) {
            res.status(201).json({ message: 'All Good', data: savedBulkRestoInfo });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createBulkReps = async (req: Request, res: Response) => {
    try {
        const savedBulkReps = await RestaurantRepModel.create(req.body)
        if (savedBulkReps) {
            res.status(201).json({ message: "created", data: savedBulkReps })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const getRestaurantsInRadius = async (req: JwtReqInterface, res: Response) => {
    try {
        const { lat, lng } = req.query;
        const validatedCoordinates = validateCoordinates({ lat, lng });
        const coordinates = validatedCoordinates ? validatedCoordinates : { longitude: -0.190696, latitude: 51.501930 };
        const validatedRadius = validateRadius(req.query.radius);
        const radius = validatedRadius ? validatedRadius : 5000;
        const restaurants = await findRestaurantsInRadius(coordinates, radius);
        res.send({ data: restaurants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', message: (error as Error).message });
    }
}

export async function getBulkRestaurantRating(req: Request, res: Response) {
    try {
        const { ids } = req.body;
        if (!validateBulkIds(ids)) return res.status(400).send({ message: 'Invalid data.' });
        const ratings = await findBulkRestaurantInfo(ids, ['rating']);
        res.send(ratings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', message: (error as Error).message });
    }
}