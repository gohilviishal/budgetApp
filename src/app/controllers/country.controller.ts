import { NotFoundException } from "#helpers/ErrorHandler";
import Country from "app/models/country.model";
import { NextFunction, Request, Response } from "express";
import { promises as fs } from "fs";
import path from "path";

export class CountryController {
  async addCountry(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "data",
        "countries.json"
      );
      const data = await fs.readFile(filePath, "utf-8");
      const countries = JSON.parse(data);
      const options = { ordered: true };
      await Country.insertMany(countries, options);
      res.status(200).json({ data: countries });
    } catch (error) {
      next(error);
    }
  }
  async getAllCountry(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const countries = await Country.find({}).sort();
      if (!countries) {
        return next(new NotFoundException("Countries"));
      }
      res.status(200).json({ data: countries });
    } catch (error) {
      next(error);
    }
  }
}
