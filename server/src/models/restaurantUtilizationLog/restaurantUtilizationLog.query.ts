import UtilizationLog from "./restaurantUtilizationLog.model";

export async function addUtilizationLog (restaurantId: number, utilization: number) {
  try {
    const newLog = await UtilizationLog.create({ restaurantId, utilization, timestamp: new Date() });
    return newLog;
  } catch (error) {
    console.log(error);
    throw new Error('Error adding utilization log.');
  }
}

export async function getAllRestaurantCurrentUtilization () {
  try {
    const latestUtilizations = await UtilizationLog.aggregate([
      {
        $sort: { timestamp: -1 } // Sort logs by timestamp in descending order
      },
      {
        $group: {
          _id: "$restaurantId",
          utilization: { $first: "$utilization" },
          timestamp: { $first: "$timestamp" }
        }
      }
    ]);

    return latestUtilizations;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting all latest utilization logs.');
  }
}