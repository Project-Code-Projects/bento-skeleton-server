import { Types } from "mongoose";
import ServiceTokenStore from "./serviceTokenStore.model";

export async function createServiceTokenStore(token: string) {
  try {
    const newStore = await ServiceTokenStore.create({ token, created: new Date() });
    return newStore;
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as Error).message);
  }
}

export async function findServiceTokenStore(id: string | Types.ObjectId) {
  try {
    const store = await ServiceTokenStore.findById(id);

    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

    if (!store || store.created < fiveMinutesAgo) return null;
    return store;
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as Error).message);
  }
}
