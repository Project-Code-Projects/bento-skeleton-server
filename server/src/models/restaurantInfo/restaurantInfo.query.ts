import { PipelineStage, Types } from "mongoose";
import { IRestaurantInfoFromFrontend } from "../../interfaces/RestaurantInfoInterface";
import { restaurantFiltersFactory } from "../../utilities/restaurant.utility";
import RestaurantInfoModel from "./restaurantInfo.model";

// GET Req from POS to Skeleton to get posDiscountPercentage
export async function getPosDiscountQuery(restaurantId: number) {
    try {
        const posDiscount = await RestaurantInfoModel.findOne({ restaurantId }, { posDiscountPercentage: 1, _id: 0 })
        return posDiscount
    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message)
    }
}

// GET Req from Marketplace to Skeleton to get marketplaceDiscountPercentage
export async function getMarketplaceDiscountQuery(restaurantId: number) {
    try {
        const marketplaceDiscount = await RestaurantInfoModel.findOne({ restaurantId }, { marketplaceDiscountPercentage: 1, _id: 0 })
        return marketplaceDiscount
    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message)
    }
}


// Update one restaurant info
export async function updateRestaurantInfo(restaurantId: number, data: any) {
    try {
        const updatedDocument = await RestaurantInfoModel.findOneAndUpdate({ restaurantId }, data, { new: true })
        return updatedDocument

    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message)
    }
}

// GET Info of one restaurant using its restaurantId
export async function getOneRestaurantInfoUsingId(restaurantId: number) {
    try {
        const data = await RestaurantInfoModel.find({ restaurantId })
        return data;
    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message)
    }
}


// Get All Restaurant's All Info
export async function getAllRestaurantInfo(limit: number | undefined) {
    try {
        if (limit) {
            const data = await RestaurantInfoModel.find({}, '', { limit })
            return data;
        } else {
            const data = await RestaurantInfoModel.find({})
            return data;
        }

    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message)
    }
}


// Create new Restaurant
export const postRestaurantInfo = async (data: IRestaurantInfoFromFrontend) => {
    try {
        const result = await RestaurantInfoModel.create(data)
        return result;
    } catch (error) {
        console.error(error)
        throw error;
    }
}



export async function updateRestaurantRatingUsingId(restaurantId: number, rating: number) {
    try {
        const updatedRestaurant = await RestaurantInfoModel.findOneAndUpdate({ restaurantId }, { rating }, { new: true })
        return updatedRestaurant;

    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message)
    }
}

export async function findRestaurantsInRadius({ longitude, latitude }: { longitude: number; latitude: number }, radius: number) {
    try {
        const restaurants = await RestaurantInfoModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: radius,
                },
            }
        });

        return restaurants;
    } catch (error) {
        console.error(error);
        throw new Error("Error while getting restaurants in radius.");
    }
}


export async function findRestaurantsUsingQuery(queryObject: any) {
    try {
        const filter = restaurantFiltersFactory(queryObject)
        const restaurants = await RestaurantInfoModel.find(filter, '', { limit: queryObject?.limit ? Number(queryObject?.limit) : 20 })
        const filteredRestaurants = restaurants.filter((r: any) => r.showInMarketPlace === true)
        return filteredRestaurants;
    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message);
    }
}


export async function findBulkRestaurantInfo(ids: number[], properties?: string[]) {
    try {
        const pipeline: PipelineStage[] = [
            {
                $match: {
                    restaurantId: { $in: ids }
                }
            }
        ]

        if (properties) {
            const projection: { [key: string]: number } = {}
            properties.forEach(property => projection[property] = 1);
            if (!projection['restaurantId']) projection['restaurantId'] = 1;
            pipeline.push({ $project: projection });
        }

        const data = await RestaurantInfoModel.aggregate(pipeline);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error in fetching bulk data from DB.');
    }
}