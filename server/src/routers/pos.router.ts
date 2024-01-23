import { Router } from "express";
import posController from "../controllers/pos.controller";
const posRouter = Router();

// POST req From POS to KDS updating the order status to Served
posRouter.post('/order/served/:orderId', posController.updateOrderStatusToServedInKds)

// Get req from Review to POS to get an Order Info using OrderId
posRouter.get('/order-info/:orderId', posController.getOrderInfo)

// Get req from Review to POS to get all the reservations
posRouter.get('/all-reservations/:restaurantId', posController.getAllReservations)

// Get req from Review to POS to get reservations of a day using date of that day
posRouter.get('/reservation-by-date', posController.getReservationByDate)

// Post req from Review to POS for sending new reservations. (Websocket)
posRouter.post('/send-new-reservation/:restaurantId', posController.postNewReservation)

export default posRouter;