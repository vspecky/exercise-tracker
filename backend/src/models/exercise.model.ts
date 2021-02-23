import { Schema, model, Document } from 'mongoose';

interface Exercise extends Document {
    username: string;
    description: string;
    duration: number;
    date: number;
};

const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true,
    collection: "Exercises"
});

export default model<Exercise>("Exercises", exerciseSchema);