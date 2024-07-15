import {
  ExistException,
  InvalidException,
  NotFoundException,
} from "#helpers/ErrorHandler";
import User from "app/models/user.model";
import {
  authValidator,
  loginValidator,
  profileValidator,
} from "app/validators/auth";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "app/utils/token";

export class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password } = await authValidator.validate(req.body);
      const user = await User.findOne({ email });
      if (user) {
        return next(new ExistException("Email"));
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      await User.create({
        name,
        email,
        password: hash,
      });
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = await loginValidator.validate(req.body);
      const user = await User.findOne({ email });
      if (!user) {
        return next(new NotFoundException("User"));
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return next(new InvalidException("Password"));
      }
      const token = generateToken(user.email);
      res.status(201).json({ message: "User login successfully", token });
    } catch (error) {
      next(error);
    }
  }
  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.user;
      const { gender, DOB, fullName, phoneNumber } =
        await profileValidator.validate(req.body);
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { gender, DOB, fullName, phoneNumber },
        { new: true }
      );
      if (!updatedUser) {
        return next(new NotFoundException("User"));
      }
      res
        .status(200)
        .json({
          message: "User profile updated successfully",
          user: updatedUser,
        });
    } catch (error) {
      next(error);
    }
  }
}
