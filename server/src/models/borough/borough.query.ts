import { Types } from "mongoose";
import Borough from "./borough.model";
import { IBorough } from "../../interfaces/BoroughInterface";

export async function getAllBoroughs() {
  try {
    const boroughs = await Borough.find({});
    return boroughs;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting boroughs from DB.');
  }
}

export async function getBoroughById(id: string | Types.ObjectId) {
  try {
    const borough = await Borough.findById(id);
    return borough;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting boroughs from DB.');
  }
}

export async function createBorough(borough: IBorough) {
  try {
    const newBorough = await Borough.create(borough);
    return newBorough;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating borough in DB.');
  }
}