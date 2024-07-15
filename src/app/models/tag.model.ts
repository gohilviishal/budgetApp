import mongoose, { Document, Schema } from "mongoose";

export interface ITag extends Document {
  name: string;
  status: boolean;
  order: number;
}

const TagSchema: Schema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    status: { type: Boolean, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ITag>("Tags", TagSchema);
