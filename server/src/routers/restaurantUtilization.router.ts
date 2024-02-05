import { Router } from 'express';
import { postRestaurantUtilization } from '../controllers/restaurantUtilization.contoller';
import verifyJWTMiddleware from '../middlewares/verifyJWT.middleware';
const utilizationRouter = Router();

utilizationRouter.post('/set', verifyJWTMiddleware, postRestaurantUtilization);

export default utilizationRouter;