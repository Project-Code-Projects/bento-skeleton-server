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