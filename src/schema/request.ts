import { AllowedSchema } from "express-json-validator-middleware";

export const request: AllowedSchema = {
  type: "object",
  properties: {
    sessionInfo: {
      type: "object",
      properties: {
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
          },
        },
      },
      required: ["parameters"],
    },
  },
  required: ["sessionInfo"],
};
