import { RequestHandler } from "express";

export const unsupportedMethod: RequestHandler = (req, res) => {
  res.status(405).json({
    message: "Method Not Allowed",
  });
};
