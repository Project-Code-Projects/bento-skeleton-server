const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema({
    _id: String,
    sequence_value: { type: Number, default: 0 }
});

export const CounterModel = mongoose.model('Counter', counterSchema);
