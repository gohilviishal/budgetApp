import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 8000,
  endpointPrefix: process.env.ENDPOINT_PREFIX || "api",
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  otpSecret: process.env.OTP_SECRET,
};
