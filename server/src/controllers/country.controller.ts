import { Request, Response } from "express";
import { getAllCountry } from "../models/countryList/countryList.query";

export const getAllCountryController = async (req: Request, res: Response) => {
  try {
    const allCountryList = await getAllCountry();
    res.send(allCountryList);
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    res.status(500).send({ message: (error as Error).message });
  }
};