import axios, { AxiosError } from "axios";
import RestaurantInfoModel from "../models/restaurantInfo/restaurantInfo.model";
import config from "../config";


// Get orders data from Marketplace
export async function getMarketplaceOrderData(restaurantId: number) {
    try {
        const res = await axios.get(`${config.MARKETPLACE_BE_BASE_URL}/orders/processing/${restaurantId}`)
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
    }
}


// Get all the data for a restaurant from Skeleton DB by using its ID + Get the rating info of that restaurant from REVIEW
export async function getRestaurantDetailsFromDB(restaurantId: string) {
    try {
        const parsedToNumberRestaurantId = parseInt(restaurantId);
        const dataFromSkeletonDB = await RestaurantInfoModel.findOne({ restaurantId: parsedToNumberRestaurantId })
        //Commented this because rating routes in zerin apu's side is not ready. currently providing data excluding rating
        /*    const ratingData = await getOneRestaurantRatingFromReview(parsedToNumberRestaurantId);
           if (dataFromSkeletonDB && ratingData) {
               const result = { ...dataFromSkeletonDB, ratingData };
               return result;
           } */
        return dataFromSkeletonDB;

    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        throw new Error((error as Error).message)
    }
}


// Get the rating info of ONE restaurant from REVIEW using its id
export async function getOneRestaurantRatingFromReview(restaurantId: Number) {
    try {
        const ratingDataFromReview = await axios.get<any>(`${config.REVIEW_BE_BASE_URL}/one-restaurant-rating/${restaurantId}`)
        return ratingDataFromReview.data;
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message)

    }
}

// Get the rating of a GROUP of restaurants from REVIEW by providing an array of id's

export async function getMultipleRestaurantRatingInfoFromReview(restaurantIdArray: number[]) {
    try {
        const res = await axios.post<any>(`${config.REVIEW_FE_BASE_URL}/multiple-restaurant-rating`, restaurantIdArray)
        return res.data;
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
    }
}

// To send updated order STATUS to marketplace from POS
export async function marketplaceUpdateOrderStatus(token: string, orderId: string, status: string) {
    try {
        await axios.put(`${config.MARKETPLACE_BE_BASE_URL}/order-status/${orderId}`, status, { headers: { 'Authorization': 'Bearer ' + token } })
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
    }
}





export function getCuisineArray(cuisine: string) {
    const cuisinesObj: any = {
        "Italian": ["Pizzeria", "Italian Restaurant"],
        "American": [
            "Fast Food Restaurant",
            "Steakhouse",
            "Diner",
            "Burger Joint",
            "American Restaurant",
            "South American Restaurant",
            "Peruvian Roast Chicken Joint",
            "Caribbean Restaurant",
            "Peruvian Restaurant",
            "Latin American Restaurant",
            "Fried Chicken Joint",
            "BBQ Joint",
            "Argentinian Restaurant",
            "Sandwich Spot",
            "Brazilian Restaurant",
            "Hawaiian Restaurant",
            "New American Restaurant",
            "Australian Restaurant"
        ],
        "Arabian": [
            "Lebanese Restaurant",
            "Ethiopian Restaurant",
            "Falafel Restaurant",
            "Middle Eastern Restaurant",
            "Persian Restaurant",
            "Mediterranean Restaurant",
            "African Restaurant",
            "Egyptian Restaurant",
            "Kurdish Restaurant",
            "Afghan Restaurant"
        ],
        "Bar": [
            "Bar",
            "Wine Bar",
            "Pub",
            "Cocktail Bar",
            "Beer Bar",
            "Brewery",
            "Hotel Bar",
            "Dive Bar",
            "Night Club",
            "Lounge",
            "Beer Garden",
            "Sports Bar",
            "Karaoke Bar",
            "Sake Bar"
        ],
        "Dessert": [
            "Cafe",
            "Bakery",
            "Cafe, Coffee, and Tea House",
            "Dessert Shop",
            "Coffee Shop",
            "Ice Cream Parlor",
            "Pastry Shop",
            "Bistro"
        ],
        "Indian": [
            "Indian Restaurant",
            "Pakistani Restaurant",
            "Indie Movie Theater",
            "Street Food Gathering"
        ],
        "English": ["English Restaurant", "Fish and Chips Shop", "Tea Room"],
        "European": [
            "Modern European Restaurant",
            "Venezuelan Restaurant",
            "French Restaurant",
            "Russian Restaurant",
            "Eastern European Restaurant",
            "Greek Restaurant",
            "Turkish Restaurant",
            "Portuguese Restaurant",
            "Tapas Restaurant",
            "Taco Restaurant",
            "Southern Food Restaurant",
            "Arepa Restaurant",
            "Deli",
            "Scandinavian Restaurant",
            "Plaza",
            "German Restaurant",
            "Spanish Restaurant",
            "Polish Restaurant",
            "Belgian Restaurant"
        ],
        "Asian": [
            "Thai Restaurant",
            "Vietnamese Restaurant",
            "Seafood Restaurant",
            "Farmers Market",
            "Ramen Restaurant",
            "Cantonese Restaurant",
            "Malay Restaurant",
            "Sushi Restaurant",
            "Japanese Restaurant",
            "Udon Restaurant",
            "Chinese Restaurant",
            "Korean Restaurant",
            "Shaanxi Restaurant",
            "Szechuan Restaurant",
            "Asian Restaurant",
            "Sri Lankan Restaurant",
            "Dim Sum Restaurant",
            "Dumpling Restaurant",
            "Soup Spot"
        ],
        "Miscellaneous": [
            "Restaurant",
            "Gastropub",
            "Speakeasy",
            "Grocery Store",
            "Food and Beverage Service",
            "Food and Beverage Retail",
            "Arts and Entertainment",
            "Amusement Park",
            "Education",
            "Imported Food Store",
            "Theater",
            "Gourmet Store"
        ],
        "Vegan": ["Vegan and Vegetarian Restaurant", "Salad Restaurant"]
    }
    return cuisinesObj[cuisine]

}
















































































// Apu Showed this to teach relation error handling
export async function dummy() {
    try {
        const res = await axios.get('url');
        return res.data;
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
}

export async function testDummy(num: number) {
    try {
        const res = await isNumberEven(num);
        return res;
    } catch (error) {
        console.log('Error from inside testDummy:', error);
        throw new Error((error as Error).message);
    }
}


function isNumberEven(num: number) {
    return new Promise((resolve, reject) => {
        if (num % 2 === 0) return resolve(true);
        else reject(new Error('Number is not even'));
    })
}

// --------------------------------------------------------------
