import * as mongoose from 'mongoose';

export const CarModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  make: { type: String, required: true },
  year: { type: Number, required: true },
  isLuxury: { type: Boolean, required: false },
});

export interface CarModel extends mongoose.Document {
  id: string;
  name: string;
  make: string;
  year: number;
  isLuxury?: boolean;
}
