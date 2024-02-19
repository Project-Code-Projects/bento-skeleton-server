import { IRestaurantInfoFromFrontend } from './../interfaces/RestaurantInfoInterface';
import { Request, Response } from "express";
import { IRestaurantRep } from "../interfaces/RestaurantRepInterface";
import { postRestaurantInfo } from '../models/restaurantInfo/restaurantInfo.query';
import { getNextSequenceValue } from '../models/incrementalRestaurantId/incrementalRestaurantId.query';
import { saveRestaurantRep } from '../models/restaurantRepInfo/restaurantRepInfo.query';
import { sendOwnerInfoToHR } from '../utilities/hr.utility';
import { JwtReqInterface } from '../interfaces/JwtReqInterface';
import { setRestaurantUtilization } from '../models/restaurantUtilization/restaurantUtilization.query';
import { addUtilizationLog } from '../models/restaurantUtilizationLog/restaurantUtilizationLog.query';
import { findBoroughFromPoint } from '../utilities/borough.utility';

export const restaurantRegistration = async (req: Request, res: Response) => {
    try {

        let restaurantRep: IRestaurantRep = req.body.restaurantRep
        let restaurantInfo: IRestaurantInfoFromFrontend = req.body.restaurantInfo

        const incrementalrestaurantId = await getNextSequenceValue('restaurantId');
        const borough = await findBoroughFromPoint([restaurantInfo.restaurantLongitude, restaurantInfo.restaurantLatitude]);

        if (incrementalrestaurantId) {
            restaurantInfo.restaurantId = incrementalrestaurantId;
            if (borough) restaurantInfo.boroughId = borough._id;
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

                    const utilization = await setRestaurantUtilization(restaurantInfoDbResult.restaurantId, 0);
                    if (utilization)
                        await addUtilizationLog(restaurantInfoDbResult.restaurantId, 0, utilization.level);

                    let hrResponse = await sendOwnerInfoToHR(dataForHR) // Gotta uncomment this when HR API is Ready


                    res.status(200).json({ 'message': 'All Good' })
                }

            }

            // res.send(restaurantInfoDbResult)
        }


    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
}