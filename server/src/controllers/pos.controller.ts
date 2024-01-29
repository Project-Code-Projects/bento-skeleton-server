import { Request, Response } from "express";
import { changeReservationStatusInReview, getAllReservationOfARestaurant, getAllTableOfAllRestaurantFromPos, getOrderInfoUsingOrderId, getReservationOfARestaurantByDate, getStatsFromPos, getTableUsingRestaurantIdAndTableCapacity, getTablesUsingTableCapacity, postNewReservationOfARestaurant, sendOrderIdWithFullOrderToKdsFromPosToMarkOrderAsServed } from "../utilities/pos.utility";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";

const getOrderInfo = async (req: JwtReqInterface, res: Response) => {
    try {
        if (!req.user?.token) return res.status(401).json({ message: 'Unauthorized' })
        const orderId = req.params.orderId;
        const result = await getOrderInfoUsingOrderId(orderId, req.user?.token);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: (error as Error).message });
    }
}


const getAllReservations = async (req: Request, res: Response) => {
    try {
        const restaurantId = req.params.restaurantId;
        const result = await getAllReservationOfARestaurant(restaurantId)
        res.status(200).send(result);
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        res.status(500).send({ message: (error as Error).message });
    }

}

const getReservationByDate = async (req: Request, res: Response) => {
    try {
        const restaurantId = req.params.restaurantId
        const date = req.params.date;
        console.log('restaurantId and data', restaurantId, date);
        const result = await getReservationOfARestaurantByDate(restaurantId, date);
        res.status(200).send(result)
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        res.status(500).send({ message: (error as Error).message });
    }
};

const postNewReservation = async (req: Request, res: Response) => {
    try {
        const restaurantId = req.params.restaurantId;
        const reservationData = req.body;
        const result = await postNewReservationOfARestaurant(restaurantId, reservationData)
        res.status(201).send(result)
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        res.status(500).send({ message: (error as Error).message });
    }


}

// Req From POS to KDS to update the status of an Order To SERVED. FULLY JWT SECURED
export async function updateOrderStatusToServedInKds(req: JwtReqInterface, res: Response) {
    try {
        const user = req.user
        if (!user) {
            return res.status(401).send({ message: 'Unauthorized' })
        }
        const orderId = req.params.orderId;
        const fullOrder = req.body
        const result = await sendOrderIdWithFullOrderToKdsFromPosToMarkOrderAsServed(orderId, fullOrder, user.token)
        res.status(200).send(result)
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        res.status(500).json((error as Error).message)
    }
}

// Get Hourly / Weekday / Monthly Order Stat from POS
export async function orderStats(req: JwtReqInterface, res: Response) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' })

        const timespanInParams = req.params.timespan

        if (timespanInParams === 'hourly' || timespanInParams === 'weekday' || timespanInParams === 'monthly') {
            const result = await getStatsFromPos(timespanInParams, req.user.token)
            return res.status(200).send(result)
        }
        else {
            return res.status(406).json({ message: 'Invalid Route' })
        }
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        res.send(500).json((error as Error).message)
    }
}

export async function allTableAllRestaurantInfo(req: JwtReqInterface, res: Response) {
    try {
        if (!req.user?.token) return res.status(401).json({ message: 'Unauthorized' })
        const result = await getAllTableOfAllRestaurantFromPos(req.user?.token)
        res.status(200).send(result);
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        res.status(500).json({ message: (error as Error).message })
    }
}

export async function reservationStatusChange(req: Request, res: Response) {
    try {
        const reservationId = req.params.reservationId
        const status = req.params.status
        const result = await changeReservationStatusInReview(reservationId, status)
        res.status(201).send(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: (error as Error).message })
    }
}
export async function allTableUsingTableCapacity(req: JwtReqInterface, res: Response) {
    try {
        const tableCapacity = req.params.tableCapacity
        const result = await getTablesUsingTableCapacity(tableCapacity)
        return result
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: (error as Error).message })
    }
}

export async function allTableUsingTableCapacityAndRestaurantId(req: JwtReqInterface, res: Response) {
    try {
        const restaurantId = req.params.restaurantId
        const tableCapacity = req.params.tableCapacity
        const result = await getTableUsingRestaurantIdAndTableCapacity(restaurantId, tableCapacity)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: (error as Error).message })
    }
}


let posController = { orderStats, getOrderInfo, getAllReservations, getReservationByDate, postNewReservation, updateOrderStatusToServedInKds, reservationStatusChange, allTableAllRestaurantInfo, allTableUsingTableCapacity, allTableUsingTableCapacityAndRestaurantId }

export default posController;

