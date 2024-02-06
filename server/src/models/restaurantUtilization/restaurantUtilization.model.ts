import { model, Schema } from 'mongoose';
import { IRestaurantUtilization } from '../../interfaces/RestaurantUtilizationInterface';

const restuarantUtilizationSchema = new Schema<IRestaurantUtilization>({
  restaurantId: {
    type: Number,
    required: true,
    unique: true
  },
  utilization: {
    type: Number,
    min: 0
  },
  updatedAt: {
    type: Date
  }
});

const RestaurantUtilization = model("restaurant-utilization", restuarantUtilizationSchema);

export default RestaurantUtilization;