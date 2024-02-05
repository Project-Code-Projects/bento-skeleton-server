import RestaurantUtilization from "./restaurantUtilization.model";

export async function setRestaurantUtilization (restaurantId: number, utilizationRate: number) {
  try {
    const utilization = await RestaurantUtilization.findOne({ restaurantId });
    if (utilization) {
      const updatedUtilization = await RestaurantUtilization.findByIdAndUpdate(utilization._id, { $set: { utilizationRate, updatedAt: new Date()}});
      return updatedUtilization;
    } else {
      const newRestaurant = await RestaurantUtilization.create({ restaurantId, utilizationRate, updatedAt: new Date()});
      return newRestaurant;
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error setting restaurant utilization.');
  }
}