import express from "express";
import { Validator } from "express-json-validator-middleware";
import pinoLogger from "pino-http";

import { cxPostRequest, getRequest, unsupportedMethod } from "./handlers";
import { error as errorMiddleware } from "./middleware";
import { request } from "./schema";
import { instrumentTracing } from "./utils";

instrumentTracing();

const app = express();
const { validate } = new Validator({});

app.use(pinoLogger());
app.use(errorMiddleware);

app.post("/*", validate({ body: request }), cxPostRequest);
app.get("/*", getRequest);
app.all("/*", unsupportedMethod);

exports.handler = app;
