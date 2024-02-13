
import { Types } from 'mongoose';
import { IBorough } from "../interfaces/BoroughInterface";
import { getAllBoroughs } from "../models/borough/borough.query";
import { point, polygon } from '@turf/helpers'
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

const boroughs: (IBorough & { _id: Types.ObjectId})[] = [];

export async function findBoroughFromPoint (coordinates: [number, number]) {
  const turfPoint = point(coordinates);

  if (!boroughs.length) {
    const res = await getAllBoroughs();
    boroughs.push(...res);
  }

  for (const borough of boroughs) {
    const poly = polygon(borough.featureData.geometry.coordinates[0]);
    if (booleanPointInPolygon(turfPoint, poly)) {
      return { _id: borough._id, name: borough.name };
    }
  }

  return null;
}