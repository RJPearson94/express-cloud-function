const { ValidationError } = require("express-json-validator-middleware");
import { ErrorRequestHandler } from "express";

export const error: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    res.status(400).send({
      message: "Invalid request payload",
      details: error.validationErrors,
    });
  } else if (error) {
    req.log.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
  next();
};
