import { RequestHandler } from "express";

export const getRequest: RequestHandler = (req, res) => {
  res.status(200).json({});
};
