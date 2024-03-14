import { CuisineModel } from "./cuisines.model";

export async function getAllCuisines() {
    try {
        const allCuisines = await CuisineModel.find({})
        return allCuisines;
    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message)
    }
}