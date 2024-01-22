import { IRestaurantInfo } from './../interfaces/RestaurantInfoInterface';
import { Request, Response } from "express";
import { v2 as cloudinary } from 'cloudinary';
import { IRestaurantRep } from "../interfaces/RestaurantRepInterface";
import { postRestaurantInfo } from '../models/restaurantInfo/restaurantInfo.query';
import { getNextSequenceValue } from '../models/incrementalRestaurantId/incrementalRestaurantId.query';
import { saveRestaurantRep } from '../models/restaurantRepInfo/restaurantRepInfo.query';
import { sendOwnerInfoToHR } from '../utilities/hr.utility';

export const restaurantRegistration = async (req: Request, res: Response) => {
    try {

        let restaurantRep: IRestaurantRep = req.body.restaurantRep
        let restaurantInfo: IRestaurantInfo = req.body.restaurantInfo

        // Cloudinary
        let imgBase64 = restaurantInfo.restaurantLogo
        const cloudinaryResult = await cloudinary.uploader.upload(imgBase64)
        restaurantInfo.restaurantLogo = cloudinaryResult.url

        // Save Restaurant Infos to DB
        const incrementalrestaurantId = await getNextSequenceValue('restaurantId')

        if (incrementalrestaurantId) {
            restaurantInfo.restaurantId = incrementalrestaurantId;
            const restaurantInfoDbResult = await postRestaurantInfo(restaurantInfo);
            if (restaurantInfoDbResult) {
                console.log('restaurantInfoDbResult', restaurantInfoDbResult);
                restaurantRep.restaurantId = restaurantInfoDbResult.restaurantId;
                const restaurantRepDbResult = await saveRestaurantRep(restaurantRep)
                if (restaurantRepDbResult) {
                    console.log('restaurantRepDbResult', restaurantRepDbResult);
                    let dataForHR = {
                        restaurantId: restaurantRepDbResult.restaurantId, // Potential Bug Here
                        name: restaurantRepDbResult.firstName + " " + restaurantRepDbResult.lastName,
                        email: restaurantRepDbResult.email,
                        password: restaurantRepDbResult.password
                    };
                    // let hrResponse = await sendOwnerInfoToHR(dataForHR) // Gotta uncomment this when HR API is Ready
                    res.status(200).json({ 'message': 'All Good' })
                }

            }

            // res.send(restaurantInfoDbResult)
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
}