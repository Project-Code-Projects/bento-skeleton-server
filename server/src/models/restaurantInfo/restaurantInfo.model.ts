import { Schema, model } from "mongoose";
import { IRestaurantInfoForDB } from "../../interfaces/RestaurantInfoInterface";

const restaurantInfo = new Schema<IRestaurantInfoForDB>({

    allAmbianceImages: {
        type: [String],
        required: true,
    },
    restaurantCoverPhoto: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    restaurantDetails: {
        type: String,
        required: true,
    },
    restaurantLatitude: {
        type: Number,
        required: true,
    },
    restaurantLongitude: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    priceRange: {
        type: String,
        default: "$$$"
    },
    restaurantId: {
        type: Number,
        unique: true
    },
    restaurantName: {
        type: String,
        required: true,
    },

    country: {
        type: Object,
        required: true,
    },
    boroughId: {
        type: Schema.ObjectId,
        ref: 'borough'
    },


    halal: {
        type: Boolean,
        required: true,
    },
    billPerClient: {
        type: Number,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    restaurantPhone: {
        type: String,
        required: true,
    },
    veganFriendly: {
        type: Boolean,
        required: true,
    },
    sellsAlcohol: {
        type: Boolean,
        required: true,
    },
    monthlyOrders: {
        type: String,
        required: true,
    },
    restaurantLogo: {
        type: String,
        required: true,
    },
    typeOfRestaurant: {
        type: String,
        required: true,
    },
    kidsZone: {
        type: Boolean,
        required: true,
    },


    delivery: {
        type: Boolean,
        required: true,
    },
    deliveryTimeStart: {
        type: Date,
        required: function () {
            return this.delivery === true
        },
    },
    deliveryTimeEnd: {
        type: Date,
        required: function () {
            return this.delivery === true
        },
        default: null
    },
    minimumDeliveryAmount: {
        type: Number,
        required: function () {
            return this.delivery === true
        },
    },
    maximumDeliveryRange: {
        type: Number,
        required: function () {
            return this.delivery === true
        }
    },

    pickup: {
        type: Boolean,
        required: true,
    },
    pickupTimeStart: {
        type: Date,
        required: function () {
            return this.pickup === true
        }
    },
    pickupTimeEnd: {
        type: Date,
        required: function () {
            return this.pickup === true
        }
    },


    operationOpeningTime: {
        type: Date,
        required: true,
    },
    operationClosingTime: {
        type: Date,
        required: true,
    },

    breakfastStart: {
        type: Date,
    },
    breakfastEnd: {
        type: Date,
    },

    lunchStart: {
        type: Date,
    },
    lunchEnd: {
        type: Date,
    },

    dinnerStart: {
        type: Date,
    },
    dinnerEnd: {
        type: Date,
    },

    dineInTimeStart: {
        type: Date,
    },
    dineInTimeEnd: {
        type: Date,
    },


    operatingDays: {
        type: [String],
        required: true,
    },
    cuisines: {
        type: [String],
        required: true,
    },
    orderServingMethod: {
        type: String,
        required: true,
    },
    doesOperateOnHolidays: {
        type: Boolean,
        required: true,
    },
    maximumWaiterNumber: {
        type: Number,
        required: true,
    },
    maximumChefNumber: {
        type: Number,
        required: true,
    },
    maximumDinningCapacity: {
        type: Number,
        required: true,
    },
    dinningAreaSqFeet: {
        type: Number,
        required: true,
    },
    kitchenAreaSqFeet: {
        type: Number,
        required: true,
    },


    bankName: {
        type: String,
        required: true,
    },
    bankAccountHolder: {
        type: String,
        required: true,
    },
    bankAccountNumber: {
        type: Number,
        required: true,
    },
    bankAccountRoutingNumber: {
        type: Number,
        required: true,
    },

});

restaurantInfo.virtual('location').get(function () {
    return {
        type: "Point",
        coordinates: [this.restaurantLongitude, this.restaurantLatitude]
    };
});

restaurantInfo.index({ location: '2dsphere' });

const RestaurantInfoModel = model("restaurantInfo", restaurantInfo);

export default RestaurantInfoModel;

