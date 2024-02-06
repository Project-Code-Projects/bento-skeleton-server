import RestaurantUtilization from "./restaurantUtilization.model";

export async function setRestaurantUtilization (restaurantId: number, utilization: number) {
  try {
    const existingUtilization = await RestaurantUtilization.findOne({ restaurantId });
    if (existingUtilization) {
      const updatedUtilization = await RestaurantUtilization.findByIdAndUpdate(existingUtilization._id, { $set: { utilization, updatedAt: new Date()}});
      return updatedUtilization;
    } else {
      const newRestaurant = await RestaurantUtilization.create({ restaurantId, utilization, updatedAt: new Date()});
      return newRestaurant;
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error setting restaurant utilization.');
  }
}