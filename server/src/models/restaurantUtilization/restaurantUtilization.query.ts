import { PipelineStage } from "mongoose";
import { getUtilizationLevel } from "../../utilities/utilization.utility";
import RestaurantInfoModel from "../restaurantInfo/restaurantInfo.model";
import RestaurantUtilization from "./restaurantUtilization.model";

export async function setRestaurantUtilization(
  restaurantId: number,
  utilization: number
) {
  try {
    const level = getUtilizationLevel(utilization);
    const existingUtilization = await RestaurantUtilization.findOne({
      restaurantId,
    });
    if (existingUtilization) {
      const updatedUtilization = await RestaurantUtilization.findByIdAndUpdate(
        existingUtilization._id,
        { $set: { utilization, updatedAt: new Date(), level } }
      );
      return updatedUtilization;
    } else {
      const newRestaurant = await RestaurantUtilization.create({
        restaurantId,
        utilization,
        level,
        updatedAt: new Date(),
      });
      return newRestaurant;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error setting restaurant utilization.");
  }
}

export async function findSingleRestaurantUtilization(restaurantId: number) {
  try {
    const utilization = await RestaurantUtilization.findOne({ restaurantId });
    return utilization;
  } catch (error) {
    console.error(error);
    throw new Error("Error setting restaurant utilization.");
  }
}

export async function findAllRestaurantCurrentUtilization() {
  try {
    const utilizations = await RestaurantUtilization.find();
    return utilizations;
  } catch (error) {
    console.error(error);
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
    console.error(error);
    throw new Error("Error setting restaurant utilization.");
  }
}

export async function findAllRestaurantCurrentUtilizationWithInfo(delivery?: boolean) {

  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        localField: 'restaurantId',
        foreignField: 'restaurantId',
        from: 'restaurantinfos',
        as: 'restaurantInfo'
      }
    },
    {
      $unwind: '$restaurantInfo'
    },
    {
      $project: {
        restaurantId: 1,
        utilization: 1,
        level: 1,
        restaurantName: '$restaurantInfo.restaurantName',
        restaurantLongitude: '$restaurantInfo.restaurantLongitude',
        restaurantLatitude: '$restaurantInfo.restaurantLatitude',
        address: '$restaurantInfo.address',
        country: '$restaurantInfo.country',
        rating: '$restaurantInfo.rating',
        priceRange: '$restaurantInfo.priceRange',
        delivery: '$restaurantInfo.delivery',
        deliveryTimeStart: '$restaurantInfo.deliveryTimeStart',
        deliveryTimeEnd: '$restaurantInfo.deliveryTimeEnd',
        operatingDays: '$restaurantInfo.operatingDays',
        operationOpeningTime: '$restaurantInfo.operationOpeningTime',
        operationClosingTime: '$restaurantInfo.operationOpeningTime',
      }
    }
  ];

  if (typeof delivery === "boolean") pipeline.push({ $match: { delivery } });

  try {
    const utilizations = await RestaurantUtilization.aggregate(pipeline);
    return utilizations;
  } catch (error) {
    console.error(error);
    throw new Error("Error setting restaurant utilization.");
  }
}
