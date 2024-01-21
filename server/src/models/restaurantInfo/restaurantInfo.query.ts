import { IRestaurantInfo } from "../../interfaces/RestaurantInfoInterface";
import RestaurantInfoModel from "./restaurantInfo.model";

export const postRestaurantInfo = async (data: IRestaurantInfo) => {
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
        let baseQuery;
        if (mode === 'delivery') {
            baseQuery = { delivery: true }
        }
        else if (mode === 'pickup') {
            baseQuery = { pickup: true }
        }
        if (baseQuery) {
            const result = await RestaurantInfoModel.find(baseQuery).select('restaurantName restaurantLogo')
            return result;
        }
    } catch (error) {
        console.log(error);
        throw new Error((error as Error).message)
    }
}



// Search with cuisine, searchTerm and mode
export async function restaurantsConsideringModeCuisineSearchTerm(mode: string, cuisine: string, searchTerm: string) {
    try {
        const regexPattern = new RegExp(searchTerm, 'i')

        const baseQuery = {
            restaurantName: { $regex: regexPattern },
            cuisines: { $in: [cuisine] }
        }

        let finalQuery;

        if (mode === 'delivery') {
            finalQuery = { ...baseQuery, delivery: true }
        } else if (mode === 'pickup') {
            finalQuery = { ...baseQuery, pickup: true }
        }

        if (finalQuery) {
            const result = await RestaurantInfoModel.find(finalQuery);
            return result;
        }

    } catch (error) {
        console.log(error);
        throw new Error((error as Error).message)
    }
}

// Search with mode and cuisine
export async function restaurantsConsideringModeCuisine(mode: string, cuisine: string) {
    try {
        const baseQuery = {
            cuisines: { $in: [cuisine] }
        }

        let finalQuery;

        if (mode === 'delivery') {
            finalQuery = { ...baseQuery, delivery: true }
        } else if (mode === 'pickup') {
            finalQuery = { ...baseQuery, pickup: true }
        }

        if (finalQuery) {
            const result = await RestaurantInfoModel.find(finalQuery)
            return result
        }

    } catch (error) {
        console.log(error);
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
            const result = await RestaurantInfoModel.find(finalQuery)
            return result;
        }

    } catch (error) {
        console.log(error);
        throw new Error((error as Error).message)
    }
}