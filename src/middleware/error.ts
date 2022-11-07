import { HttpError } from "http-errors";
import { ErrorRequestHandler } from "express";

const isHttpError = (error: Error | HttpError): error is HttpError =>
  "statusCode" in error;

export const error: ErrorRequestHandler = (error, req, res, next) => {
  if (error) {
    req.log.error(error);

    let statusCode = 500;
    let body: any = {
      message: "An error occurred",
    };
    if (isHttpError(error)) {
      statusCode = error.statusCode;
      body = {
        message: error.message,
        ...(error.details ? { details: error.details } : {}),
      };
    }
    res.status(statusCode).json(body);
  }
  next();
};
