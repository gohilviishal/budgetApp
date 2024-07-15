import { ExistException, NotFoundException } from "#helpers/ErrorHandler";
import Category from "app/models/categories.model";
import { categoriesValidator } from "app/validators/categories";
import { NextFunction, Request, Response } from "express";

export class CategoriesController {
  async createCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, type, status, order } = await categoriesValidator.validate(
        req.body
      );
      const category = await Category.findOne({ name });
      if (category) {
        return next(new ExistException("Category"));
      }
      const newCategory = await Category.create({
        name,
        type,
        status,
        order,
      });
      res.status(201).json({ data: newCategory });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await Category.find({});
      if (!categories) {
        return next(new NotFoundException("Categories"));
      }
      res.status(200).json({ data: categories });
    } catch (error) {
      next(error);
    }
  }
  async getSingleCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return next(new NotFoundException("Category"));
      }
      res.status(200).json({ data: category });
    } catch (error) {
      next(error);
    }
  }
  async updateCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const categoryData = await categoriesValidator.validate(req.body);

      const category = await Category.findById(id);
      if (!category) {
        return next(new NotFoundException("Category"));
      }
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        categoryData,
        {
          new: true,
        }
      );
      res.status(200).json({ data: updatedCategory });
    } catch (error) {
      next(error);
    }
  }
  async deleteCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return next(new NotFoundException("Category"));
      }
      await Category.findByIdAndDelete(id);
      res.status(200).json({ message: "Delete Category Successfully" });
    } catch (error) {
      next(error);
    }
  }
}
