import mongoose, { Schema, Document } from "mongoose";

export interface ICountry extends Document {
  e164_cc: string;
  iso2_cc: string;
  e164_sc: number;
  geographic: boolean;
  level: number;
  name: string;
  example: string;
  display_name: string;
  full_example_with_plus_sign: string;
  display_name_no_e164_cc: string;
  e164_key: string;
}

const CountrySchema: Schema<ICountry> = new Schema(
  {
    e164_cc: { type: String },
    iso2_cc: { type: String },
    e164_sc: { type: Number },
    geographic: { type: Boolean },
    level: { type: Number },
    name: { type: String },
    example: { type: String },
    display_name: { type: String },
    full_example_with_plus_sign: { type: String },
    display_name_no_e164_cc: { type: String },
    e164_key: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ICountry>("Country", CountrySchema);
