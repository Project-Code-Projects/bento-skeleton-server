import { IRatingAddedRestaurantInterface, IRestaurantInfoFromFrontend } from "../../interfaces/RestaurantInfoInterface";
import { getMultipleRestaurantRatingInfoFromReview } from "../../utilities/marketplace.utility";
import RestaurantInfoModel from "./restaurantInfo.model";

// Get All Restaurant's All Info
export async function getAllRestaurantInfo() {
    try {
        const data = await RestaurantInfoModel.find({})
        return data;
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
            const restaurantInfosResult: IRatingAddedRestaurantInterface[] = await RestaurantInfoModel.find(finalQuery)

            const restaurantIdsArray: number[] = restaurantInfosResult.map((restaurant) => restaurant.restaurantId)

            //Commenting this because Zerin Apu didnt make the route to get rating info of multiple restaturant yet.
            /*            const ratingInfosOfRestaurants = await getMultipleRestaurantRatingInfoFromReview(restaurantIdsArray)
                       if (ratingInfosOfRestaurants) {
                           ratingInfosOfRestaurants.forEach((singleRestaurantRating: any) => {
                               const matchingRestaurant = restaurantInfosResult.find((r) => r.restaurantId === singleRestaurantRating.restaurantId)
                               if (matchingRestaurant) {
                                   matchingRestaurant.rating = singleRestaurantRating
                               }
                           })
                       } */

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
            const restaurantInfosResult: IRatingAddedRestaurantInterface[] = await RestaurantInfoModel.find(finalQuery);

            const restaurantIdsArray: number[] = restaurantInfosResult.map((restaurant) => restaurant.restaurantId)


            //Commenting this because Zerin Apu didnt make the route to get rating info of multiple restaturant yet.
            /*             const ratingInfosOfRestaurants = await getMultipleRestaurantRatingInfoFromReview(restaurantIdsArray)
            
                        if (ratingInfosOfRestaurants) {
                            ratingInfosOfRestaurants.forEach((singleRestaurantRating: any) => {
                                const matchingRestaurant = restaurantInfosResult.find((r) => r.restaurantId === singleRestaurantRating.restaurantId)
                                if (matchingRestaurant) {
                                    matchingRestaurant.rating = singleRestaurantRating
                                }
                            })
                        }
             */

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
            const restaurantInfosResult: IRatingAddedRestaurantInterface[] = await RestaurantInfoModel.find(finalQuery)

            const restaurantIdsArray: number[] = restaurantInfosResult.map((restaurant) => restaurant.restaurantId)

            //Commenting this because Zerin Apu didnt make the route to get rating info of multiple restaturant yet.

            /*        const ratingInfosOfRestaurants = await getMultipleRestaurantRatingInfoFromReview(restaurantIdsArray)
                   if (ratingInfosOfRestaurants) {
                       ratingInfosOfRestaurants.forEach((singleRestaurantRating: any) => {
                           const matchingRestaurant = restaurantInfosResult.find((r) => r.restaurantId === singleRestaurantRating.restaurantId)
                           if (matchingRestaurant) {
                               matchingRestaurant.rating = singleRestaurantRating
                           }
                       })
                   } */

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
            const restaurantInfosResult: IRatingAddedRestaurantInterface[] = await RestaurantInfoModel.find(finalQuery)

            const restaurantIdsArray: number[] = restaurantInfosResult.map((restaurant) => restaurant.restaurantId)


            //Commenting this because Zerin Apu didnt make the route to get rating info of multiple restaturant yet.
            /*         const ratingInfosOfRestaurants = await getMultipleRestaurantRatingInfoFromReview(restaurantIdsArray)
                    if (ratingInfosOfRestaurants) {
                        ratingInfosOfRestaurants.forEach((singleRestaurantRating: any) => {
                            const matchingRestaurant = restaurantInfosResult.find((r) => r.restaurantId === singleRestaurantRating.restaurantId)
                            if (matchingRestaurant) {
                                matchingRestaurant.rating = singleRestaurantRating
                            }
                        })
                    } */

            return restaurantInfosResult;

        }

    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        throw new Error((error as Error).message)
    }
}