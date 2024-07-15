import { ExistException, NotFoundException } from "#helpers/ErrorHandler";
import Tag from "app/models/tag.model";
import { categoriesValidator } from "app/validators/categories";
import { NextFunction, Request, Response } from "express";

export class TagController {
  async createTag(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, status, order } = await categoriesValidator.validate(
        req.body
      );
      const tag = await Tag.findOne({ name });
      if (tag) {
        return next(new ExistException("Tag"));
      }
      const newTag = await Tag.create({
        name,
        status,
        order,
      });
      res.status(201).json({ data: newTag });
    } catch (error) {
      next(error);
    }
  }
  async getAllTag(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tags = await Tag.find({});
      if (!tags) {
        return next(new NotFoundException("Tags"));
      }
      res.status(200).json({ data: tags });
    } catch (error) {
      next(error);
    }
  }
  async getTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const tag = await Tag.findById(id);
      if (!tag) {
        return next(new NotFoundException("Tag"));
      }
      res.status(200).json({ data: tag });
    } catch (error) {
      next(error);
    }
  }
  async updateTag(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const tagData = await categoriesValidator.validate(req.body);

    const tag = await Tag.findById(id);
    if (!tag) {
      return next(new NotFoundException("Tag"));
    }
    const updatedTag = await Tag.findByIdAndUpdate(id, tagData, {
      new: true,
    });
    res.status(200).json({ data: updatedTag });
  }
  async deleteTag(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
        const { id } = req.params;
        const tag = await Tag.findById(id);
        if (!tag) {
          return next(new NotFoundException("Tag"));
        }
        await Tag.findByIdAndDelete(id);
        res.status(200).json({ message: "Delete Tag Successfully" });
    } catch (error) {
        next(error)
    }
  }
}
