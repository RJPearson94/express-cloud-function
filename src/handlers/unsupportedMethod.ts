import { RequestHandler } from "express";

export const unsupportedMethod: RequestHandler = (req, res) => {
  res.status(405).send({
    message: "Method Not Allowed",
  });
};
