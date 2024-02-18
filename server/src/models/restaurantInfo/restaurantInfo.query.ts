import { IRestaurantInfoForDB, IRestaurantInfoFromFrontend } from "../../interfaces/RestaurantInfoInterface";
import { getCuisineArray, getMultipleRestaurantRatingInfoFromReview } from "../../utilities/marketplace.utility";
import { restaurantFiltersFactory } from "../../utilities/restaurant.utility";
import RestaurantInfoModel from "./restaurantInfo.model";

// GET Info of one restaurant using its restaurantId
export async function getOneRestaurantInfoUsingId(restaurantId: number) {
    try {
        const data = await RestaurantInfoModel.find({ restaurantId })
        return data;
    } catch (error) {
        console.log(error);
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
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
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


// Restaurants based on mode Pickup/Delivery
export async function restaurantsBasedOnMode(mode: string) {
    try {
        let finalQuery;
        if (mode === 'delivery') {
            finalQuery = { delivery: true }
        }
        else if (mode === 'pickup') {
            finalQuery = { pickup: true }
        }

        if (finalQuery) {
            const restaurantInfosResult: IRestaurantInfoForDB[] = await RestaurantInfoModel.find(finalQuery)
            return restaurantInfosResult;

        }

    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        throw new Error((error as Error).message)
    }
}



// Search with cuisine, searchTerm and mode
export async function restaurantsConsideringModeCuisineSearchTerm(mode: string, cuisine: string, searchTerm: string) {
    try {
        const regexPattern = new RegExp(searchTerm, 'i')
        const cuisineList = getCuisineArray(cuisine)
        const baseQuery = {
            restaurantName: { $regex: regexPattern },
            cuisines: { $in: cuisineList },
        }

        let finalQuery;

        if (mode === 'delivery') {
            finalQuery = { ...baseQuery, delivery: true }
        } else if (mode === 'pickup') {
            finalQuery = { ...baseQuery, pickup: true }
        }

        if (finalQuery) {
            const restaurantInfosResult: IRestaurantInfoForDB[] = await RestaurantInfoModel.find(finalQuery);
            return restaurantInfosResult;

        }

    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        throw new Error((error as Error).message)
    }
}

// Search with mode and cuisine
export async function restaurantsConsideringModeCuisine(mode: string, cuisine: string) {
    try {
        const cuisineList = getCuisineArray(cuisine)

        const baseQuery = {
            cuisines: { $in: cuisineList }
        }

        let finalQuery;

        if (mode === 'delivery') {
            finalQuery = { ...baseQuery, delivery: true }
        } else if (mode === 'pickup') {
            finalQuery = { ...baseQuery, pickup: true }
        }

        if (finalQuery) {
            const restaurantInfosResult: IRestaurantInfoForDB[] = await RestaurantInfoModel.find(finalQuery)
            return restaurantInfosResult;

        }

    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        throw new Error((error as Error).message)
    }
}

// Search with mode and searchTerm
export async function restaurantsConsideringModeSearchTerm(mode: string, searchTerm: string) {
    try {

        const regexPattern = new RegExp(searchTerm, 'i')

        const baseQuery = {
            restaurantName: { $regex: regexPattern },
        }

        let finalQuery;

        if (mode === 'delivery') {
            finalQuery = { ...baseQuery, delivery: true }
        } else if (mode === 'pickup') {
            finalQuery = { ...baseQuery, pickup: true }
        }

        if (finalQuery) {
            const restaurantInfosResult: IRestaurantInfoForDB[] = await RestaurantInfoModel.find(finalQuery)
            return restaurantInfosResult;

        }

    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        throw new Error((error as Error).message)
    }
}


export async function updateRestaurantRatingUsingId(restaurantId: number, rating: number) {
    try {
        const updatedRestaurant = await RestaurantInfoModel.findOneAndUpdate({ restaurantId }, { rating }, { new: true })
        return updatedRestaurant;

    } catch (error) {
        console.log(error);
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
        console.log(error);
        throw new Error("Error while getting restaurants in radius.");
    }
}


// The Super Route for Restaurant search with query params (mode , cuisine, searchTerm , limit, name )
export async function findRestaurantsUsingQuery(queryObject: any) {
    try {
        const filter = restaurantFiltersFactory(queryObject)
        const restaurants = await RestaurantInfoModel.find(filter, '', { limit: queryObject?.limit ? Number(queryObject?.limit) : 20 })
        return restaurants;
    } catch (error) {
        console.log(error);
        throw new Error((error as Error).message);
    }
}