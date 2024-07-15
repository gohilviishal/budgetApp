import mongoose, { Schema, Document } from "mongoose";

export const Gender = {
  "MALE":"MALE",
  "FEMALE":"FEMALE",
  "OTHER":"OTHER"
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  gender?: string;
  DOB?: Date;
  fullName?: string;
  phoneNumber?: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: Object.values(Gender)},
    DOB: { type: Date },
    fullName: { type: String },
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("Users", UserSchema);
