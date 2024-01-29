import { Router } from "express";
import posController from "../controllers/pos.controller";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
const posRouter = Router();

// POST req From POS to KDS updating the order status to Served
posRouter.post('/order/served/:orderId', verifyJWTMiddleware, posController.updateOrderStatusToServedInKds)


// Get req from Review to POS to get an Order Info using OrderId
posRouter.get('/order-info/:orderId', verifyJWTMiddleware, posController.getOrderInfo)



// Get req from  POS to Review to get all the reservations of a restaurant by restaurantId DONE
posRouter.get('/all-reservations/:restaurantId', posController.getAllReservations)

// Get req from POS to Review to get reservations of a day using date of that day and restaurant Id DONE
posRouter.get('/reservation-by-date/restaurant/:restaurantId/date/:date', posController.getReservationByDate)


//  POST req from POS to Review to change status of a reservation using reservation id DONE
posRouter.post('/reservation-status-change/reservation/:reservationId/status/:status', posController.reservationStatusChange)

// Post req from Review to POS for sending new reservations. (Websocket)
posRouter.post('/send-new-reservation/:restaurantId', posController.postNewReservation)


// Get req from review to get all table infos of all restaurant from POS
posRouter.get('/all-tables-all-restaurants', verifyJWTMiddleware, posController.allTableAllRestaurantInfo)



// Order stats
posRouter.get('/order-stats/:timespan', verifyJWTMiddleware, posController.orderStats)





// Get Req from Review to POS to get Tables using table capacity
posRouter.get('/all-restaurant-table/:tableCapacity', verifyJWTMiddleware, posController.allTableUsingTableCapacity)

// Get req from Review to POS to get all tables by Restaurant and Table Capacity
posRouter.get('/all-restaurant/:restaurantId/:tableCapacity', verifyJWTMiddleware, posController.allTableUsingTableCapacityAndRestaurantId)

export default posRouter;