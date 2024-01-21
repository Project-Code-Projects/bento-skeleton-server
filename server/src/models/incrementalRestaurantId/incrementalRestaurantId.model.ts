import mongoose from "mongoose";

const { Schema, model } = mongoose;

const counterSchema = new Schema({
    _id: String,
    sequence_value: { type: Number, default: 0 }
});

export const CounterModel = model('Counter', counterSchema);
