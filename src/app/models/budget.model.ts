import mongoose, { Schema, Types } from "mongoose";

export interface IBudget {
  budget: number;
  user_id: Types.ObjectId;
  category_id: Types.ObjectId;
}

const BudgetSchema: Schema = new Schema(
  {
    budget: { type: Number, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "Users" },
    category_id: { type: Schema.Types.ObjectId, ref: "Categories" },
  },
  { timestamps: true }
);

export default mongoose.model<IBudget>("Budgets", BudgetSchema);
