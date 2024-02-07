import { Schema, model } from "mongoose";
import { IBorough } from "../../interfaces/BoroughInterface";

const boroughSchema = new Schema<IBorough>({
  name: { type: String, required: true },
  featureData: {
    type: {
      type: { type: String, default: 'Feature' },
      properties: {
        id: { type: Number },
        name: { type: String},
        code: { type: String},
        area_hectares: { type: Number },
        inner_statistical: Boolean,
      },
      geometry: {
        type: { type: String},
        coordinates: [[[[Number, Number]]]]
      }
    }
  }
});

const Borough = model('borough', boroughSchema);

export default Borough;