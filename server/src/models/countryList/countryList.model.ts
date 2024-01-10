import { CountryInterface } from "./../../interfaces/CountryInterface";
import { Schema, model } from "mongoose";

const countryListSchema = new Schema<CountryInterface>({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const countryModel = model("country", countryListSchema);

export default countryModel;
