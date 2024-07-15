import mongoose, { Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  type: string;
  status: boolean;
  order: number;
}

export enum Type {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: Object.values(Type), required: true },
    status: { type: Boolean, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("Categories", CategorySchema);
