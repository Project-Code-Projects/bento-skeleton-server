import { model, Schema } from "mongoose";
import { IRestaurantUtilizationLog } from "../../interfaces/restaurantUtilizationLogInterface";

const utilizationLogSchema = new Schema<IRestaurantUtilizationLog>({
  restaurantId: {
    type: Number,
    required: true,
  },
  utilization: {
    type: Number,
    min: 0
  },
  level: {
    type: String,
    enum: ['LU', 'MU', 'HU'],
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: new Date()
  }
});

const UtilizationLog = model('restaurant-utilization-log', utilizationLogSchema);

export default UtilizationLog;