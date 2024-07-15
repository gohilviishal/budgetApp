import config from "#config";
import jwt from "jsonwebtoken";

export function generateToken(email: string): string {
  const token = jwt.sign({ email }, config.jwtSecret, { expiresIn: "7d" });
  return token;
}
