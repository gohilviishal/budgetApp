import { ExistException, NotFoundException } from "#helpers/ErrorHandler";
import Budget from "app/models/budget.model";
import Category from "app/models/categories.model";
import { budgetUpdateValidator, budgetValidator } from "app/validators/budget";

import { NextFunction, Request, Response } from "express";

export class BudgetController {
  async createBudget(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { category_id, budget } = await budgetValidator.validate(req.body);
      const categoryExists = await Category.findById(category_id);
      if (!categoryExists) {
        return next(new NotFoundException("Category"));
      }
      const oldBudget = await Budget.findOne({
        category_id,
        user_id: req.user._id,
      });
      if (oldBudget) {
        return next(new ExistException("Budget"));
      }
      const newBudget = await Budget.create({
        user_id: req.user._id,
        category_id,
        budget,
      });
      res.status(201).json({ data: newBudget });
    } catch (error) {
      next(error);
    }
  }
  async getAllBudget(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const budgets = await Budget.find({});
      if (!budgets) {
        return next(new NotFoundException("Budgets"));
      }
      res.status(200).json({ data: budgets });
    } catch (error) {
      next(error);
    }
  }
  async getSingleBudget(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const budget = await Budget.findById(id);
      if (!budget) {
        return next(new NotFoundException("Budget"));
      }
      res.status(200).json({ data: budget });
    } catch (error) {
      next(error);
    }
  }
  async updateBudget(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const budgetData = await budgetUpdateValidator.validate(req.body);

      const budget = await Budget.findById(id);
      if (!budget) {
        return next(new NotFoundException("Budget"));
      }
      const updatedBudget = await Budget.findByIdAndUpdate(id, budgetData, {
        new: true,
      });
      res.status(200).json({ data: updatedBudget });
    } catch (error) {
      next(error);
    }
  }
  async deleteBudget(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const budget = await Budget.findById(id);
      if (!budget) {
        return next(new NotFoundException("Budget"));
      }
      await Budget.findByIdAndDelete(id);
      res.status(200).json({ message: "Delete Budget Successfully" });
    } catch (error) {
      next(error);
    }
  }
}
