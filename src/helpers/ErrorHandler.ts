import { Response } from "express";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";
import { ValidationError } from "yup";

export class ErrorHandler extends Error {
  index: any;
  public status: number;
  public message: string;
  errorResponse: any;
  code: any;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}

export class ExistException {
  status = 400;
  message: string;
  constructor(entity: string = "Record") {
    this.message = `${entity} alreay exists`;
  }
}

export class NotFoundException {
  status = 404;
  message: string;

  constructor(entity: string = "Record") {
    this.message = `${entity} not found`;
  }
}

export class InvalidException {
  status = 401;
  message: string;

  constructor(entity: string = "Credentials") {
    this.message = `${entity} invalid`;
  }
}

export class UnauthorizedException {
  status = 403;
  message: string;

  constructor(entity: string = "Permission denied.") {
    this.message = `${entity}`;
  }
}

export const handleError = (err: ErrorHandler, res: Response) => {
  const { status, message } = err;
  if (err instanceof ValidationError) {
    return res.status(422).json({ error: err.message });
  }
  if (err instanceof MongoServerError) {
    return res.status(400).json({ error: err.errorResponse.errmsg });
  }
  res.status(status).json({
    error: message,
  });
};
