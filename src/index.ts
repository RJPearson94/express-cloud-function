import express from "express";
import pinoLogger from "pino-http";
import { getPinoOptions } from "@relaycorp/pino-cloud";

import { cxPostRequest, getRequest, unsupportedMethod } from "./handlers";
import { error as errorMiddleware } from "./middleware";
import { request as requestSchema } from "./schema";
import { validator } from "./middleware/validator";

const app = express();

app.disable("x-powered-by");
app.disable("etag");

app.use(
  pinoLogger({
    ...getPinoOptions("gcp", {
      name: "express-cloud-function",
    }),
    level: process.env.LOG_LEVEL || "error",
  })
);
app.use(
  express.json({
    limit: "1024mb",
  })
);

app.post("/*", validator({ schema: requestSchema }), cxPostRequest);
app.get("/*", getRequest);
app.all("/*", unsupportedMethod);

app.use(errorMiddleware);

export const handler = app;
