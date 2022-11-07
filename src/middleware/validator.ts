import { RequestHandler } from "express";
import Ajv, { Schema, ValidateFunction } from "ajv";
import { BadRequest } from "http-errors";

let validate: ValidateFunction;

const validateFunction = (schema: Schema) => {
  const ajv = new Ajv({});
  return ajv.compile(schema);
};

export type ValidatorOptions = {
  schema: Schema;
};

export const validator = (options: ValidatorOptions): RequestHandler => {
  validate = validate || validateFunction(options.schema);

  return (req, _res, next) => {
    const valid = validate(req.body);
    if (!valid) {
      const badRequest = new BadRequest("Request failed validation");
      badRequest.details = validate.errors;
      next(badRequest);
    } else {
      next();
    }
  };
};
