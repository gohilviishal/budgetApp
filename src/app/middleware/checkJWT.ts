import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedException } from "#helpers/ErrorHandler";
import config from "#config";
import User from "app/models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    const err = new UnauthorizedException("No token provided");
    return next(err);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret!) as JwtPayload;
    const user = await User.findOne({ email: decoded.email });
    (req as any).user = user;
    next();
  } catch (error) {
    const err = new UnauthorizedException("Invalid token");
    return next(err);
  }
};
