import mongoose from "mongoose";
const { Schema, model } = mongoose

const cuisineSchema = new Schema({
    cuisineName: {
        type: String,
        required: true
    },
    cuisineImg: {
        type: String,
        required: true
    }
})


export const CuisineModel = model('cuisine', cuisineSchema)