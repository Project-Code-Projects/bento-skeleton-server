import { CountryInterface } from "../../interfaces/CountryInterface";
import countryModel from "./countryList.model";

export async function getAllCountry() {
  try {
    const countries: CountryInterface[] = await countryModel.find({});
    return countries;
  } catch (error) {
    console.log(error);
  }
}
