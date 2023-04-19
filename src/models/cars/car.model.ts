import * as mongoose from 'mongoose';

export const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nr_of_models: { type: Number, required: true },
  average_horsepower: { type: Number, required: true },
  average_price: { type: Number, required: false },
  current_models: { type: Number, required: false },
});

export interface Car extends mongoose.Document {
  name: string;
  nr_of_models: number;
  average_horsepower: number;
  average_price: number;
  current_models?: number;
}
