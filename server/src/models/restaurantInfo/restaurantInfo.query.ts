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

// Getting all Delivery enabled restaurants [Need to add restaurant likes and individual menu item Offer  ]
export async function allDeliveryRestaurants() {
    try {
        // Selecting what fields we want
        const result = await RestaurantInfoModel.find({ delivery: true }).select('restaurantName restaurantLogo')
        return result;
    } catch (error) {
        console.log(error)
        throw new Error((error as Error).message)
    }
}

// Getting all Pickup enabled restaurants [Need to add restaurant likes and individual menu item Offer  ]
export async function allPickupRestaurants() {
    try {
        const result = await RestaurantInfoModel.find({ pickup: true }).select('restaurantName restaurantLogo')
        return result;
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