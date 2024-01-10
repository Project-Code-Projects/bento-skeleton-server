import { model, Schema } from "mongoose";
import { IServiceTokenStore } from "../../interfaces/IServiceTokenStore";

const serviceTokenStoreSchema = new Schema<IServiceTokenStore>({
  token: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
});

const ServiceTokenStore = model("service-token-store", serviceTokenStoreSchema);

export default ServiceTokenStore;
