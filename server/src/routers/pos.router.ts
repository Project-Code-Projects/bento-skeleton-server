import { Router } from "express";
import posController from "../controllers/pos.controller";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
const posRouter = Router();

// POST req From POS to KDS updating the order status to Served
posRouter.post('/order/served/:orderId', verifyJWTMiddleware, posController.updateOrderStatusToServedInKds)

// Get req from Review to POS to get an Order Info using OrderId
posRouter.get('/order-info/:orderId', posController.getOrderInfo)

// Get req from Review to POS to get all the reservations
posRouter.get('/all-reservations/:restaurantId', posController.getAllReservations)

// Get req from Review to POS to get reservations of a day using date of that day
posRouter.get('/reservation-by-date', posController.getReservationByDate)

// Post req from Review to POS for sending new reservations. (Websocket)
posRouter.post('/send-new-reservation/:restaurantId', posController.postNewReservation)

// Order stats
posRouter.get('/order-stats/:timespan', verifyJWTMiddleware, posController.orderStats)


// Get req from review to get all table infos of all restaurant from POS
posRouter.get('/all-tables-all-restaurants', verifyJWTMiddleware, posController.allTableAllRestaurantInfo)


export default posRouter;