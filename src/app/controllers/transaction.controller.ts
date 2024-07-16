import { NotFoundException } from "#helpers/ErrorHandler";
import Category from "app/models/categories.model";
import Payment from "app/models/payment.model";
import Tag from "app/models/tag.model";
import Transaction from "app/models/transaction.model";
import {
  categoriesViseTransactionValidator,
  startTransactionValidator,
  trasactionValidator,
} from "app/validators/transaction";

import { NextFunction, Request, Response } from "express";

interface Query {
  updatedAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}

export class TransactionController {
  async createTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { category_id, tag_id, payment_id, amount } =
        await trasactionValidator.validate(req.body);
      const categoryExists = await Category.findById(category_id);
      if (!categoryExists) {
        return next(new NotFoundException("Category"));
      }
      const paymentExists = await Payment.findById(payment_id);
      if (!paymentExists) {
        return next(new NotFoundException("Payment"));
      }
      const tagExists = await Tag.findById(tag_id);
      if (!tagExists) {
        return next(new NotFoundException("Tag"));
      }

      const newTransaction = await Transaction.create({
        user_id: req.user._id,
        category_id,
        amount,
        payment_id,
        tag_id,
      });
      res.status(201).json({ data: newTransaction });
    } catch (error) {
      next(error);
    }
  }
  async getAllTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { start, end } = await startTransactionValidator.validate(
        req.query
      );
      const query: Query = {};
      if (start) {
        query.updatedAt = { $gte: new Date(start * 1000) };
      }
      if (end) {
        if (!query.updatedAt) {
          query.updatedAt = {};
        }
        query.updatedAt.$lte = new Date(end * 1000);
      }
      const transactions = await Transaction.find(query);
      if (!transactions) {
        return next(new NotFoundException("Transaction"));
      }
      res.status(200).json({ data: transactions });
    } catch (error) {
      next(error);
    }
  }
  async getSingleTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findById(id);
      if (!transaction) {
        return next(new NotFoundException("Transaction"));
      }
      res.status(200).json({ data: transaction });
    } catch (error) {
      next(error);
    }
  }
  async updateTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const transactionData = await trasactionValidator.validate(req.body);

      const transaction = await Transaction.findById(id);
      if (!transaction) {
        return next(new NotFoundException("Transaction"));
      }
      const categoryExists = await Category.findById(
        transactionData.category_id
      );
      if (!categoryExists) {
        return next(new NotFoundException("Category"));
      }
      const paymentExists = await Payment.findById(transactionData.payment_id);
      if (!paymentExists) {
        return next(new NotFoundException("Payment"));
      }
      const tagExists = await Tag.findById(transactionData.tag_id);
      if (!tagExists) {
        return next(new NotFoundException("Tag"));
      }
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        transactionData,
        {
          new: true,
        }
      );
      res.status(200).json({ data: updatedTransaction });
    } catch (error) {
      next(error);
    }
  }
  async deleteTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findById(id);
      if (!transaction) {
        return next(new NotFoundException("Transaction"));
      }
      await Transaction.findByIdAndDelete(id);
      res.status(200).json({ message: "Delete Transaction Successfully" });
    } catch (error) {
      next(error);
    }
  }
  async getTransactionsCategoriesVise(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { start, end } = await categoriesViseTransactionValidator.validate(
        req.body
      );

      const transactions = await Transaction.aggregate([
        {
          $match: {
            updatedAt: {
              $gte: new Date(start * 1000),
              $lte: new Date(end * 1000),
            },
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $group: {
            _id: "$category._id",
            category: { $first: "$category" },
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: 0,
            category: 1,
            totalAmount: 1,
          },
        },
      ]);

      res.status(200).json({ data: transactions });
    } catch (error) {
      next(error);
    }
  }
}
