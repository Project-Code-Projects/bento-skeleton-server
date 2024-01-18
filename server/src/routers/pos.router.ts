import { Router } from "express";
import posController from "../controllers/pos.controller";
const posRouter = Router();

// Get req from Review to POS to get an Order Info using OrderId
posRouter.get('order-info/:orderId', posController.getOrderInfo)

// Get req from Review to POS to get all the reservations
posRouter.get('all-reservations/:restaurantId', posController.getAllReservations)

// Get req from Review to POS to get reservations of a day using date of that day
posRouter.get('/reservation-by-date', posController.getReservationByDate)

export default posRouter;