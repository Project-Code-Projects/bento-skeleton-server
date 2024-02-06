import { IRestaurantRep } from "../../interfaces/RestaurantRepInterface";
import { Schema, model } from "mongoose";

const restaurantRep = new Schema<IRestaurantRep>({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    restaurantId: {
        type: Number,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

});

const RestaurantRepModel = model("restaurantRep", restaurantRep);

export default RestaurantRepModel;
