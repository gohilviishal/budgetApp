import mongoose, { Schema } from "mongoose";

export interface IPayment extends Document {
  name: string;
  status: boolean;
  order: number;
}

const PaymentSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    status: { type: Boolean, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>("Payments", PaymentSchema);
