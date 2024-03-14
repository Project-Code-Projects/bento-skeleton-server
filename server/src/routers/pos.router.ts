import { Router } from "express";
import posController from "../controllers/pos.controller";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware";
const posRouter = Router();


posRouter.get('/pos-discount-percentage', verifyJWTMiddleware, posController.getPosDiscount)

posRouter.post('/order/served/:orderId', verifyJWTMiddleware, posController.updateOrderStatusToServedInKds)

posRouter.get('/order-info/:orderId', verifyJWTMiddleware, posController.getOrderInfo)

posRouter.get('/all-reservations/:restaurantId', posController.getAllReservations)

posRouter.get('/reservation-by-date/restaurant/:restaurantId/date/:date', posController.getReservationByDate)

posRouter.post('/reservation-status-change/reservation/:reservationId/status/:status', posController.reservationStatusChange)

posRouter.post('/send-new-reservation/:restaurantId', posController.postNewReservation)

posRouter.get('/all-tables-all-restaurants', verifyJWTMiddleware, posController.allTableAllRestaurantInfo)

posRouter.get('/order-stats/:timespan', verifyJWTMiddleware, posController.orderStats)

posRouter.get('/all-restaurant-table/:tableCapacity', verifyJWTMiddleware, posController.allTableUsingTableCapacity)

posRouter.get('/all-restaurant/:restaurantId/:tableCapacity', verifyJWTMiddleware, posController.allTableUsingTableCapacityAndRestaurantId)

export default posRouter;