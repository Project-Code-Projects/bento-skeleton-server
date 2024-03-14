import { PipelineStage } from "mongoose";
import UtilizationLog from "./restaurantUtilizationLog.model";

export async function addUtilizationLog(
  restaurantId: number,
  utilization: number,
  level: string
) {
  try {
    const newLog = await UtilizationLog.create({
      restaurantId,
      utilization,
      level,
      timestamp: new Date(),
    });
    return newLog;
  } catch (error) {
    console.error(error);
    throw new Error("Error adding utilization log.");
  }
}

export async function getAllRestaurantLatestUtilization() {
  try {
    const latestUtilizations = await UtilizationLog.aggregate([
      {
        $sort: { timestamp: -1 }, // Sort logs by timestamp in descending order
      },
      {
        $group: {
          _id: "$restaurantId",
          utilization: { $first: "$utilization" },
          timestamp: { $first: "$timestamp" },
        },
      },
    ]);

    return latestUtilizations;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting all latest utilization logs.");
  }
}

export async function findAverageHistoricalUtilizationInRadius(
  coordinates: { longitude: number; latitude: number },
  radius: number,
  target?: { dayOfWeek?: number; hour?: number }
) {
  try {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [coordinates.longitude, coordinates.latitude], // MongoDB expects coordinates in [longitude, latitude] format
              },
              $maxDistance: radius,
            },
          },
        },
      },
      {
        $group: {
          // Group by restaurantId and calculate average utilization
          _id: "$restaurantId",
          averageUtilization: { $avg: "$utilization" },
        },
      },
      {
        $project: {
          restaurantId: "$_id",
          utilization: "$averageUtilization"
        }
      }
    ];

    if (target && (target.dayOfWeek || target.hour)) {
      const firstFilter: PipelineStage = {
        $match: {
          $expr: {
            $and: [
              ...(target.hour ? [{ $eq: [{ $hour: "$timestamp" }, target.hour] }] : []),
              ...(target.dayOfWeek ? [{ $eq: [{ $dayOfWeek: "$timestamp" }, target.dayOfWeek] }] : []),
            ]
          }
        }
      }

      pipeline.unshift(firstFilter);
    }

    const data: { restaurantId: number, utilization: number }[] = await UtilizationLog.aggregate(pipeline);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting average historical utilization in radius.");
  }
}
