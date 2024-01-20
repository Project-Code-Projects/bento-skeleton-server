import { Request, Response } from "express";
import { getAllReservationOfARestaurant, getOrderInfoUsingOrderId, getReservationOfARestaurantByDate, postNewReservationOfARestaurant } from "../utilities/pos.utility";

const getOrderInfo = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId;
        const result = await getOrderInfoUsingOrderId(orderId);
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
        console.log(error);
        res.status(500).send({ message: (error as Error).message });
    }

}

const getReservationByDate = async (req: Request, res: Response) => {
    try {
        const restaurantId = req.query.restaurantId as string;
        const date = req.query.date;
        const result = await getReservationOfARestaurantByDate(restaurantId, date);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
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
        console.log(error);
        res.status(500).send({ message: (error as Error).message });
    }


}

let posController = { getOrderInfo, getAllReservations, getReservationByDate, postNewReservation }

export default posController;