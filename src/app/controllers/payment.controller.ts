import { ExistException, NotFoundException } from "#helpers/ErrorHandler";
import Payment from "app/models/payment.model";
import { paymentsValidator } from "app/validators/payments";
import { NextFunction, Request, Response } from "express";

export class PaymentsController {
  async createPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, status, order } = await paymentsValidator.validate(
        req.body
      );
      const payment = await Payment.findOne({ name });
      if (payment) {
        return next(new ExistException("Payment"));
      }
      const newPayment = await Payment.create({
        name,
        status,
        order,
      });
      res.status(201).json({ data: newPayment });
    } catch (error) {
      next(error);
    }
  }
  async getAllPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const payments = await Payment.find({});
      if (!payments) {
        return next(new NotFoundException("Payments"));
      }
      res.status(200).json({ data: payments });
    } catch (error) {
      next(error);
    }
  }
  async getSinglePayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const payment = await Payment.findById(id);
      if (!payment) {
        return next(new NotFoundException("Payment"));
      }
      res.status(200).json({ data: payment });
    } catch (error) {
      next(error);
    }
  }
  async updatePayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const paymentData = await paymentsValidator.validate(req.body);

    const payment = await Payment.findById(id);
    if (!payment) {
      return next(new NotFoundException("Payment"));
    }
    const updatedPayment = await Payment.findByIdAndUpdate(id, paymentData, {
      new: true,
    });
    res.status(200).json({ data: updatedPayment });
  }
  async deletePayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const payment = await Payment.findById(id);
    if (!payment) {
      return next(new NotFoundException("Payment"));
    }
    await Payment.findByIdAndDelete(id);
    res.status(200).json({ message: "Delete Payment Successfully" });
  }
}
