import { CounterModel } from "./incrementalRestaurantId.model";

export async function getNextSequenceValue(sequenceName: string) {
    try {
        const sequenceDocument = await CounterModel.findOneAndUpdate(
            { _id: sequenceName },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        return sequenceDocument.sequence_value;
    } catch (error) {
        console.log(error);
    }
}
