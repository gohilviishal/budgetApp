import mongoose, { Schema } from "mongoose";

export interface IOtp {
  email: string;
  otp: string;
}

const OtpSchema: Schema = new Schema(
  {
    email: { type: String, require: true },
    otp: { type: String, require: true },
  },
  { timestamps: true }
);

OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

export default mongoose.model<IOtp>("Otps", OtpSchema);
