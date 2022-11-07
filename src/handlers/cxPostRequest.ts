import { RequestHandler } from "express";

export const cxPostRequest: RequestHandler = (req, res) => {
  res.status(200).json({
    sessionInfo: {
      parameters: {
        name: "post",
      },
    },
  });
};
