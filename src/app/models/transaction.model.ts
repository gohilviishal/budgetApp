import mongoose, { Schema, Types } from "mongoose";

export interface ITransaction {
  amount: number;
  user_id: Types.ObjectId;
  category_id: Types.ObjectId;
  tag_id: Types.ObjectId;
  payment_id: Types.ObjectId;
}

const TransactionSchema: Schema = new Schema(
  {
    amount: { type: Number, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "Users" },
    category_id: { type: Schema.Types.ObjectId, ref: "Categories" },
    tag_id: { type: Schema.Types.ObjectId, ref: "Tags" },
    payment_id: { type: Schema.Types.ObjectId, ref: "Payments" },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
