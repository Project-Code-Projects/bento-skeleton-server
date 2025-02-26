import { getCuisineArray } from "./marketplace.utility"

// Dictionary
const functionDictionary: IQueryObj = {
    searchTerm: getSearchTermQuery,
    mode: getModeQuery,
    priceRange: getPriceRangeQuery,
    cuisine: getCuisineQuery,
}

interface IQueryObj {
    [key: string]: any
}

// Main function of the file
export function restaurantFiltersFactory(queryObject: IQueryObj) {
    let filter = {}
    for (let query in queryObject) {
        if (functionDictionary[query]) {
            const resultQueryFunction = functionDictionary[query]
            const resultQuery = resultQueryFunction(queryObject[query])
            Object.assign(filter, resultQuery)
        }
    }
    return filter
}


function getSearchTermQuery(searchTerm: string) {
    const regexPattern = new RegExp(searchTerm, 'i')
    return { restaurantName: { $regex: regexPattern } }
}


function getModeQuery(mode: string) {
    return {
        [mode]: true
    }
}

function getPriceRangeQuery(range: string) {
    return { priceRange: range }
}


function getCuisineQuery(cuisine: string) {
    const cuisineList = getCuisineArray(cuisine);
    return { cuisines: { $in: cuisineList } }
}


