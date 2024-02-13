import RestaurantInfoModel from "../restaurantInfo/restaurantInfo.model";
import RestaurantUtilization from "./restaurantUtilization.model";

export async function setRestaurantUtilization(
  restaurantId: number,
  utilization: number
) {
  try {
    const existingUtilization = await RestaurantUtilization.findOne({
      restaurantId,
    });
    if (existingUtilization) {
      const updatedUtilization = await RestaurantUtilization.findByIdAndUpdate(
        existingUtilization._id,
        { $set: { utilization, updatedAt: new Date() } }
      );
      return updatedUtilization;
    } else {
      const newRestaurant = await RestaurantUtilization.create({
        restaurantId,
        utilization,
        updatedAt: new Date(),
      });
      return newRestaurant;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error setting restaurant utilization.");
  }
}

export async function findSingleRestaurantUtilization(restaurantId: number) {
  try {
    const utilization = await RestaurantUtilization.findOne({ restaurantId });
    return utilization;
  } catch (error) {
    console.log(error);
    throw new Error("Error setting restaurant utilization.");
  }
}

export async function findAllRestaurantCurrentUtilization() {
  try {
    const utilizations = await RestaurantUtilization.find();
    return utilizations;
  } catch (error) {
    console.log(error);
    throw new Error("Error setting restaurant utilization.");
  }
}

export async function findAllRestaurantUtilizationsInRadius(
  { longitude, latitude }: { longitude: number; latitude: number },
  radius: number
) {
  try {
    const utilizations = await RestaurantInfoModel.aggregate([
      {
        $match: {
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [longitude, latitude], // MongoDB expects coordinates in [longitude, latitude] format
              },
              $maxDistance: radius,
            },
          },
        },
      },
      {
        $lookup: {
          from: 'restaurant-utilizations',
          localField: "restaurantId",
          foreignField: "restaurantId",
          as: "utilization"
        }
      },
      {
        $unwind: '$utilization'
      },
      {
        $project: {
          restaurantId: "$utilization.restaurantId",
          utilization: "$utilization.utilization",
          updatedAt: "$utilization.updatedAt"
        }
      }
    ]);
    return utilizations;
  } catch (error) {
    console.log(error);
    throw new Error("Error setting restaurant utilization.");
  }
}
