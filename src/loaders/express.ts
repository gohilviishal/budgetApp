import cors from "cors";
import bodyParser from "body-parser";
import { Application, NextFunction, Request, Response } from "express";
import { ErrorHandler, handleError } from "#helpers/ErrorHandler";
import config from "#config";
import apiRoute from "#router";

export default (app: Application): void => {
  // Health Check endpoints
  app.use(
    cors({
      origin: [ "http://localhost:5173"],
    })
  );

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(`/${config.endpointPrefix}`, apiRoute);
  app.use(
    (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
      handleError(err, res);
    }
  );
};
