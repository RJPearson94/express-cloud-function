import { Schema } from "ajv";

export const request: Schema = {
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
